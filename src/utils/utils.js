import axios from "axios";
import _ from "lodash";

import API from "../utils/configAPI";

function decodedString(string) {
  return _.unescape(string).replace(/<\/?[^>]+(>|$)/g, "");
}

function formattingResponse(response) {
  const rawAuthorList = response.author;
  const authorList =
    rawAuthorList &&
    rawAuthorList
      .filter((author) => author.family && author.given)
      .map((author) => `${author.family} ${author.given}`);
  const publishedAt = response.created?.["date-parts"]?.join(".");

  return {
    doi: response.DOI,
    url: response.URL,
    title: decodedString(response.title?.[0]) || "제목 정보 없음",
    references: response["reference-count"],
    createdAt: publishedAt || "날짜 정보 없음",
    citations: response["is-referenced-by-count"],
    containerTitle: decodedString(response["container-title"]?.[0]) || "저널 정보 없음",
    authors: decodedString(authorList?.join(", ")) || "저자 정보 없음",
    refs: response?.reference?.map((value) => value.DOI).filter((val) => val)
  };
}

function formattingChartData(paperList, collectionName) {
  return {
    title: collectionName,
    children: paperList?.map(
      (paper) => ({
        doi: paper.doi,
        url: paper.url,
        title: paper.title,
        citations: paper.citations,
        createdAt: paper.createdAt,
        authors: paper.authors,
        children: paper.refs,
      })
    ) || [],
  };
}

async function fetchChildrenNodes(root, nodeList, setChartData) {
  const childrenList = nodeList.map((node) => ({
    doi: node.doi,
    title: node.title,
    children: node.children
  }));

  const reqUrlEmbeddedChildrenList = childrenList.map((node) => ({
    ...node,
    reqURL: `${API.CROSSREF_WORKS_URL}?filter=doi:${node.children.join(",doi:")}&select=DOI,title,is-referenced-by-count`
  }));

  const childrenPromiseList =
    reqUrlEmbeddedChildrenList.map((node) => axios.get(node.reqURL));
  const allResponse = await Promise.all(childrenPromiseList);
  const childrenDataList = allResponse.map((res) => {
    const items = res?.data?.message?.items;
    const formattedItems = items.map((item) => ({
      title: item?.title?.[0] || "제목 정보 없음",
      doi: item.DOI,
      citations: item["is-referenced-by-count"],
      children: [],
    }));

    return formattedItems;
  });

  setChartData ({
    ...root,
    children: childrenList.map((sub, index) => ({
      ...sub,
      children: childrenDataList[index],
    })),
  });
}

export {
  decodedString,
  formattingResponse,
  formattingChartData,
  fetchChildrenNodes,
};
