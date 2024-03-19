import axios from "axios";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { LuRefreshCw } from "react-icons/lu";

import PaperSidebar from "../../components/PaperSidebar";
import PaperChart from "../../components/PaperChart";
import LoadingCircle from "../../components/shared/LoadingCircle";

import API from "../../utils/configAPI";
import { STATUS, NONE } from "../../utils/constants";
import { formattingResponse } from "../../utils/utils";
import { usePaperListStore } from "../../stores/paper";
import { useCollectionStore } from "../../stores/collection";
import { useChartStore } from "../../stores/chart";

const CLASS_FLOATING_BUTTON = "bg-violet-700 p-8 rounded-full shadow-xl text-32 text-white";

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

function formattingChartData(paperList, collectionName) {
  return {
    title: collectionName,
    doi: NONE,
    status: STATUS.DEFAULT,
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
  const { chartList, initChart, starList } = useChartStore();
  const { collection } = useCollectionStore();
  const { paperList, initPaperList } = usePaperListStore();
  const isCurrentPaperListExist = Object.values(paperList).length > 0;
  const currentCollectionName = collection[collectionId];
  const isDataExist = chartList[collectionId] && Object.keys(chartList[collectionId]).length > 0;
  const isSameData = paperList[collectionId] &&
    paperList[collectionId].length === chartList[collectionId]?.children?.length;

  function clickRefresh() {
    initPaperList(collectionId, starList[collectionId]);
  }

  useEffect(() => {
    const currentPaperList = paperList[collectionId];

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

      const rootNode = formattingChartData(allRefsList, currentCollectionName);

      fetchChildrenNodes(rootNode, initChart, collectionId);
    }

    if (!isCurrentPaperListExist) {
      navigator("/");
    }

    if (currentPaperList && (!isDataExist || !isSameData)) {
      getRefs(currentPaperList);
    }
  }, [paperList]);

  return (
    <>
      <PaperSidebar />
      <div className="flex flex-row items-center justify-center w-full">
        {isDataExist && isSameData ? <PaperChart data={chartList[collectionId]} /> : <LoadingCircle />}
      </div>
      <button className={`${CLASS_FLOATING_BUTTON} absolute top-30 right-30`}>
        <AiOutlineSearch className="size-28" onClick={() => navigator(`/${collectionId}/search`)} />
      </button>
      <button className="absolute p-8 text-white rounded-full shadow-xl bg-violet-700 text-32 top-90 right-30">
        <LuRefreshCw className="size-28" onClick={clickRefresh} />
      </button>
    </>
  );
}

export default ViewPage;
