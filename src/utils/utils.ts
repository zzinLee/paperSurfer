import _ from "lodash";
import { SearchResponseInterface, PaperInterface } from "./interface";

function decodedString(str: string) {
  return _.unescape(str).replace(/<\/?[^>]+(>|$)/g, "");
}

function formattingResponse(response: SearchResponseInterface): PaperInterface {
  const rawAuthorList = response.author;
  const authorList =
    rawAuthorList &&
    rawAuthorList
      .filter((author) => author.family && author.given)
      .map((author) => `${author.family} ${author.given}`);
  const publishedAt = response.created?.["date-parts"][0].join(". ");

  return {
    doi: response.DOI,
    url: response.URL,
    title: decodedString(response.title?.[0]) || "제목 정보 없음",
    references: response["reference-count"],
    createdAt: publishedAt || "날짜 정보 없음",
    citations: response["is-referenced-by-count"],
    containerTitle: decodedString(response["container-title"]?.[0]) || "저널 정보 없음",
    authors: decodedString(authorList?.join(", ")) || "저자 정보 없음",
    refs: response?.reference?.map((value) => value.DOI).filter((val) => val),
    abstract: response?.abstract,
  };
}

export {
  decodedString,
  formattingResponse,
};
