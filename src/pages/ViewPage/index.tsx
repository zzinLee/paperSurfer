import axios from "axios";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { LuRefreshCw } from "react-icons/lu";
import { GoTable } from "react-icons/go";

import PaperSidebar from "../../components/PaperSidebar";
import PaperChart from "../../components/PaperChart";
import LoadingCircle from "../../components/shared/LoadingCircle";
import Modal from "../../components/shared/Modal";

import API from "../../utils/configAPI";
import { STATUS, NONE, COLLECTION_RADIUS } from "../../utils/constants";
import { formattingResponse, goHomePage } from "../../utils/utils";
import usePaperStore from "../../stores/paper";
import useCollectionStore from "../../stores/collection";
import useChartStore from "../../stores/chart";
import useCollectionId from "../../hooks/useCollectionId";

import type {
  PaperConfig,
  RootConfig,
  formattingRootFunction,
  InitChartFunction,
  InitRootConfig,
  SearchResponseConfig,
} from "../../types/interface";
import type { AxiosResponse } from "axios";

const fetchChildrenNodes = async (root: RootConfig | InitRootConfig, initChart: InitChartFunction, collectionKey: string) => {
  if (!root.children || root.children.length <= 0) return;

  const childrenList =
    root.children &&
    root.children.map((node) => ({
      doi: node.doi,
      title: node.title,
      children: node.children,
      citations: node.citations,
      author: node.author,
      status: STATUS.STAR,
    }));

  const reqUrlList = childrenList.map((node) => {
    const descendants = node.children;

    return descendants?.length
      ? `${API.CROSSREF_WORKS_URL}?filter=doi:${descendants.join(",doi:")}`
      : null;
  });
  const childrenPromiseList = reqUrlList.map((node) => node && axios.get(node));
  const allResponse = await Promise.all(childrenPromiseList);
  const childrenDataList: RootConfig[][] = allResponse.map((res) => {
    const items = res && res.data.message.items;

    const formattedItems: RootConfig[] = items.map((item: SearchResponseConfig) => ({
      title: item?.title?.[0] || "제목 정보 없음",
      doi: item.DOI,
      citations: item["is-referenced-by-count"],
      author: item.author.filter((person) => person.family && person.given).map((person) => `${person.family} ${person.given}`),
      status: STATUS.DEFAULT,
      children: [],
    }));

    return formattedItems;
  });

  const newRoot: RootConfig = {
    ...root,
    children: childrenList.map((subTree, index) => ({
        ...subTree,
        children: childrenDataList[index]
      }))
  };

  initChart(collectionKey, newRoot);
};

const formattingRoot: formattingRootFunction = (paperList, collectionName) => {
  return {
    title: collectionName,
    doi: NONE,
    status: STATUS.COLLECTION,
    citations: COLLECTION_RADIUS,
    author: "user",
    children: paperList
  };
};

function ViewPage() {
  const navigator = useNavigate();
  const collectionId = useCollectionId();
  const { collection } = useCollectionStore();
  const { paperCollection, initPaperCollection } = usePaperStore();
  const { rootCollection, initChart, starCollection } = useChartStore();

  const isCurrentPaperListExist = Object.values(paperCollection).length > 0;
  const currentCollectionName = collection[collectionId];
  const isDataExist = rootCollection[collectionId] && Object.keys(rootCollection[collectionId]).length > 0;
  const isSameData =
    paperCollection[collectionId] && paperCollection[collectionId].length === rootCollection[collectionId]?.children?.length;

  const clickRefresh = () => {
    initPaperCollection(collectionId, starCollection[collectionId]);
  };

  if (!isCurrentPaperListExist) {
    goHomePage(navigator);
  }

  useEffect(() => {
    const currentPaperList = paperCollection[collectionId];

    const getReferences = async (currentPaperList: PaperConfig[]) => {
      const getReferencesPromiseList = currentPaperList.map((paper) => {
        return axios.get(`${API.CROSSREF_WORKS_URL}/${API.PAPER_URL}/${paper.doi}`);
      });
      const makeReferenceList = (responePromiseArray: AxiosResponse[]) => {
        const allRefList: PaperConfig[] = [];

        responePromiseArray.forEach((res) => {
          if (res?.data?.status === "ok") {
            const response = res?.data?.message;

            allRefList.push(formattingResponse(response));
          }
        });

        return allRefList;
      };


      const allResponse = await Promise.all(getReferencesPromiseList);
      const allReferencesList = makeReferenceList(allResponse);
      const rootNode = formattingRoot(allReferencesList, currentCollectionName);

      fetchChildrenNodes(rootNode, initChart, collectionId);
    };

    if (isCurrentPaperListExist && (!isDataExist || !isSameData)) {
      getReferences(currentPaperList);
    }
  }, [paperCollection]);



  return (
    <>
      <PaperSidebar />
      <div className="relative flex flex-row items-center justify-center w-full">
        {isDataExist && isSameData ? (
          <PaperChart data={rootCollection[collectionId]} />
        ) : (
          <Modal>
            <LoadingCircle />
          </Modal>
        )}
        <Link to={`/${collectionId}/search`}>
          <button className="flex flex-row absolute px-8 py-2 items-center justify-center text-white rounded-full shadow-xl hover:bg-indigo-700 top-150 right-30 bg-slate-700 text-[0.8rem] w-180 sm:w-fit">
            <AiOutlineSearch size="28" />
            <p className="ml-4 sm:invisible sm:w-0 sm:h-0 sm:m-0">다시 검색하러 가기</p>
          </button>
        </Link>
        <Link to={`/${collectionId}/table`}>
          <button className="flex flex-row absolute px-8 py-2 items-center justify-center text-white rounded-full shadow-xl top-200 right-30 hover:bg-indigo-700 bg-slate-700 text-[0.8rem] w-180 sm:w-fit">
            <GoTable size="28" />
            <p className="ml-4 sm:invisible sm:w-0 sm:h-0 sm:m-0">테이블로 보기</p>
          </button>
        </Link>
        <button
          className="flex flex-row px-8 py-2 items-center absolute justify-center text-white rounded-full shadow-xl hover:bg-indigo-700 top-250 right-30 bg-slate-700 text-[0.8rem] w-180 sm:w-fit"
          onClick={clickRefresh}
        >
          <LuRefreshCw size="28" />
          <p className="ml-4 sm:invisible sm:w-0 sm:h-0 sm:m-0">그래프 새로고침</p>
        </button>
      </div>
    </>
  );
}

export default ViewPage;
