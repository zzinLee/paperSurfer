import axios from "axios";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { LuRefreshCw } from "react-icons/lu";

import PaperSidebar from "../../components/PaperSidebar";
import PaperChart from "../../components/PaperChart";
import LoadingCircle from "../../components/shared/LoadingCircle";

import API from "../../utils/configAPI";
import { STATUS, NONE, COLLECTION_RADIUS } from "../../utils/constants";
import { formattingResponse } from "../../utils/utils";
import { usePaperStore } from "../../stores/paper";
import { useCollectionStore } from "../../stores/collection";
import { useChartStore } from "../../stores/chart";

async function fetchChildrenNodes(root, initChart, collectionKey) {
  const childrenList =
    root.children &&
    root.children.map((node) => ({
      doi: node.doi,
      title: node.title,
      children: node.children,
      citations: node.citations,
      status: STATUS.STAR,
    }));

  const reqUrlList = childrenList.map((node) => {
    const descendants = node.children;

    return descendants?.length
      ? `${API.CROSSREF_WORKS_URL}?filter=doi:${descendants.join(",doi:")}&select=DOI,title,is-referenced-by-count`
      : null;
  });
  const childrenPromiseList = reqUrlList.map((node) => node && axios.get(node));
  const allResponse = await Promise.all(childrenPromiseList);
  const childrenDataList = allResponse.map((res) => {
    const items = res?.data?.message?.items;
    const formattedItems = items?.map((item) => ({
      title: item?.title?.[0] || "제목 정보 없음",
      doi: item.DOI,
      citations: item["is-referenced-by-count"],
      status: STATUS.DEFAULT,
      children: [],
    }));

    return formattedItems;
  });

  const newRoot = {
    ...root,
    children: childrenList.map((subTree, index) => ({
      ...subTree,
      children: childrenDataList[index]
    }))
  };

  initChart(collectionKey, newRoot);
}

function formattingRoot(paperList, collectionName) {
  return {
    title: collectionName,
    doi: NONE,
    status: STATUS.COLLECTION,
    citations: COLLECTION_RADIUS,
    children:
      paperList?.map((paper) => ({
        doi: paper.doi,
        url: paper.url,
        title: paper.title,
        citations: paper.citations,
        createdAt: paper.createdAt,
        authors: paper.authors,
        children: paper.refs
      })) || []
  };
}

function ViewPage() {
  const navigator = useNavigate();
  const { collectionId } = useParams();
  const { rootCollection, initChart, starCollection } = useChartStore();
  const { collection } = useCollectionStore();
  const { paperCollection, initPaperCollection } = usePaperStore();
  const isCurrentPaperListExist = Object.values(paperCollection).length > 0;
  const currentCollectionName = collection[collectionId];
  const isDataExist = rootCollection[collectionId] && Object.keys(rootCollection[collectionId]).length > 0;
  const isSameData =
    paperCollection[collectionId] && paperCollection[collectionId].length === rootCollection[collectionId]?.children?.length;

  function clickRefresh() {
    initPaperCollection(collectionId, starCollection[collectionId]);
  }

  useEffect(() => {
    const currentPaperList = paperCollection[collectionId];

    async function getRefs(currentPaperList) {
      const getRefPromiseList = currentPaperList.map((paper) => {
        return axios.get(`${API.CROSSREF_WORKS_URL}/${API.PAPER_URL}/${paper.doi}`);
      });

      const allResponse = await Promise.all(getRefPromiseList);
      const allRefsList = allResponse.map((res) => {
        if (res?.data?.status !== "ok") {
          return;
        }

        const response = res?.data?.message;

        return formattingResponse(response);
      });

      const rootNode = formattingRoot(allRefsList, currentCollectionName);

      fetchChildrenNodes(rootNode, initChart, collectionId);
    }

    if (!isCurrentPaperListExist) {
      navigator("/");
    }

    if (currentPaperList && (!isDataExist || !isSameData)) {
      getRefs(currentPaperList);
    }
  }, [paperCollection]);

  return (
    <>
      <PaperSidebar />
      <div className="flex flex-row items-center justify-center w-full">
        {isDataExist && isSameData ? <PaperChart data={rootCollection[collectionId]} /> : <LoadingCircle />}
      </div>
      <button className="absolute p-8 text-white rounded-full shadow-xl bg-violet-700 text-32 top-30 right-30">
        <AiOutlineSearch className="size-28" onClick={() => navigator(`/${collectionId}/search`)} />
      </button>
      <button className="absolute p-8 text-white rounded-full shadow-xl bg-violet-700 text-32 top-150 right-30">
        <LuRefreshCw className="size-28" onClick={clickRefresh} />
      </button>
    </>
  );
}

export default ViewPage;
