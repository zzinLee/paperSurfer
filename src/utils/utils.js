import _ from "lodash";

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

  return {
    doi: response.DOI,
    url: response.URL,
    title: decodedString(response?.title[0]) || "제목 정보 없음",
    references: response["reference-count"],
    citations: response["is-referenced-by-count"],
    createdAt: response?.created["date-parts"],
    containerTitle: decodedString(response["container-title"][0]),
    authors: decodedString(authorList?.join(", ")) || "저자 정보 없음",
    refs: response?.reference?.map((value) => value.DOI).filter((val) => val)
  };
}

function formattingChartData(paperList, collectionName) {
  return {
    name: collectionName,
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

export { decodedString, formattingResponse, formattingChartData };
