import axios from "axios";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";

import PaperSidebar from "../../components/PaperSidebar";
import PaperChart from "../../components/PaperChart";

import API from "../../utils/configAPI";
import { STATUS } from "../../utils/constants";
import { formattingResponse } from "../../utils/utils";
import { usePaperListStore } from "../../stores/paper";
import { useCollectionStore } from "../../stores/collection";
import { useChartStore } from "../../stores/chart";

const CLASS_FLOATING_BUTTON = "bg-violet-500 absolute p-8 rounded-full shadow-xl top-30 right-30 text-32 text-white";
const CLASS_LOADING_CIRCLE =
  "border-4 border-transparent rounded-full h-80 w-80 animate-spin border-sora border-t-customPurple";

async function fetchChildrenNodes(root, initChart, collectionKey) {
  const childrenList =
    root.children &&
    root.children.map((node) => ({
      doi: node.doi,
      title: node.title,
      children: node.children,
      status: STATUS.STAR,
    }));

  const reqUrlList = childrenList.map((node) => {
    const descendants = node.children;
    return descendants.length
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
    status: STATUS.STAR,
    children: childrenList.map((subTree, index) => ({
      ...subTree,
      children: childrenDataList[index]
    }))
  };

  initChart(newRoot, collectionKey);
}

function formattingChartData(paperList, collectionName) {
  return {
    title: collectionName,
    doi: "none",
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
  const { chartList, initChart } = useChartStore();
  const { collectionList } = useCollectionStore();
  const { paperList } = usePaperListStore();
  const isCurrentPaperListExist = Object.values(paperList).length > 0;
  const currentCollection = collectionList.find((value) => value.key === Number(collectionId));
  const currentCollectionName = currentCollection.collectionName;
  const isDataExist = chartList[collectionId] && Object.keys(chartList[collectionId]).length > 0;
  const isSameData = paperList[collectionId] &&
    paperList[collectionId].length === chartList[collectionId]?.children?.length;

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
        {(isDataExist && isSameData) ? <PaperChart data={chartList[collectionId]} /> : <div className={CLASS_LOADING_CIRCLE}></div>}
      </div>
      <button className={CLASS_FLOATING_BUTTON}>
        <AiOutlineSearch onClick={() => navigator(`/${collectionId}/search`)} />
      </button>
    </>
  );
}

export default ViewPage;
