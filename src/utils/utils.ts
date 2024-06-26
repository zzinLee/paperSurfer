import _ from "lodash";
import type { SearchResponseConfig, PaperConfig } from "../types/interface";
import type { NavigateFunction } from "react-router-dom";

const decodedString = (str: string) => {
  return _.unescape(str).replace(/<\/?[^>]+(>|$)/g, "");
};

const formattingResponse = (response: SearchResponseConfig): PaperConfig => {
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
    author: decodedString(authorList?.join(", ")) || "저자 정보 없음",
    children: response?.reference?.map((value) => value.DOI).filter((val) => val),
    abstract: response?.abstract,
  };
};

const goHomePage = (navigator: NavigateFunction) => {
  navigator("/");
};

const goErrorPage = (navigator: NavigateFunction) => {
  navigator("/error");
};

const goSearchPage = (navigator: NavigateFunction, collectionId: string) => {
  navigator(`/${collectionId}/search`);
};

const goViewPage = (navigator: NavigateFunction, collectionId: string) => {
  navigator(`/${collectionId}/view`);
};

export {
  decodedString,
  formattingResponse,
  goHomePage,
  goErrorPage,
  goViewPage,
  goSearchPage,
};
