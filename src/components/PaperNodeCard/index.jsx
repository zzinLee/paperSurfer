import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import LoadingCircle from "../shared/LoadingCircle";

import useChartStore from "../../stores/chart";
import API from "../../utils/configAPI";
import { STATUS, MAILTO } from "../../utils/constants";
import { formattingResponse, decodedString } from "../../utils/utils";

const CLASS_CARD_PROP = "flex flex-row gap-3 px-10 py-5";
const CLASS_CARD_BUTTON = "px-8 py-2 text-white rounded-lg shadow-md hover:cursor-pointer text-16";
const CLASS_BADGE_PROP = "text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded me-4";
const CLASS_BADGE =
  "text-sm font-semibold me-2 mr-4 px-2.5 py-0.5 rounded inline-flex items-center justify-center min-w-72";

function PaperNodeCard({ nodeData, setModalOpen, setIsLoadingChild }) {
  const { collectionId } = useParams();
  const { changeNodeStatus, addChildrenToNode, addStarPaper } = useChartStore();

  const [paper, setPaper] = useState(null);
  const [isLinkClick, setIsLinkClick] = useState(false);

  const isPaperExist = Boolean(paper);
  const abstract = decodedString(paper?.abstract).replaceAll("Abstract", "").slice(0, 290);
  const formattedAbstract = abstract ? abstract + "..." : "초록 정보 없음";
  const isStar = nodeData.status === STATUS.STAR;

  const fetchPaperInformation = async (doi, setPaper) => {
    const res = await axios.get(`${API.CROSSREF_WORKS_URL}/${doi}`);
    const response = res?.data?.message;
    const paper = formattingResponse(response);

    setPaper(paper);
  };

  const getChildrenNode = async (collectionId, parentNode) => {
    setIsLoadingChild(true);

    const res = await axios.get(
      `${API.CROSSREF_WORKS_URL}?filter=doi:${parentNode.doi}&select=reference&mailto=${MAILTO}`
    );
    const response = res?.data?.message;
    const paperRefList = response?.items?.[0]?.reference;
    const isRefExist = paperRefList && paperRefList.length > 0;

    if (!isRefExist) {
      setIsLoadingChild(false);

      return;
    }

    const requestDoiString = paperRefList
      .map((ref) => ref.DOI)
      .filter((ref) => ref)
      .slice(0, 20)
      .join(",doi:");

    const childrenRes = await axios.get(
      `${API.CROSSREF_WORKS_URL}?filter=doi:${requestDoiString}&select=DOI,title,is-referenced-by-count,created,author&mailto=${MAILTO}`
    );
    const childrenResponse = childrenRes?.data?.message;
    const childrenList = childrenResponse?.items;
    const isChildrenExist = childrenList && childrenList.length > 0;

    if (!isChildrenExist) {
      setIsLoadingChild(false);

      return;
    }

    const formattedChildrenList = childrenList?.map((child) => {
      const rawAuthorList = child.author;
      const authorList =
        rawAuthorList &&
        rawAuthorList
          .filter((author) => author.family && author.given)
          .map((author) => `${author.family} ${author.given}`);

      return {
        title: decodedString(child?.title?.[0]) || "제목 정보 없음",
        citations: child?.["is-referenced-by-count"],
        status: STATUS.DEFAULT,
        doi: child?.DOI,
        createdAt: child?.created?.["date-parts"]?.[0]?.join(".") || "출판일 정보 없음",
        author: authorList?.join(", ") || "저자 정보 없음",
      };
    });

    setIsLoadingChild(false);
    addChildrenToNode(collectionId, parentNode, formattedChildrenList);
  };

  useEffect(() => {
    fetchPaperInformation(nodeData.doi, setPaper);
  }, [nodeData.doi]);

  useEffect(() => {
    if (isLinkClick) {
      window.open(paper.url, "_blank", "noopener, noreferrer");

      setIsLinkClick(false);
    }
  }, [isLinkClick, paper]);


  const clickStar = () => {
    const isChildrenExist = nodeData?.children && nodeData.children.length > 0;
    const isReferenceExist = paper.references > 0;

    if (!isChildrenExist && isReferenceExist) {
      getChildrenNode(collectionId, nodeData, addChildrenToNode);
    }

    changeNodeStatus(collectionId, nodeData, STATUS.STAR);
    addStarPaper(collectionId, paper);
    setModalOpen(false);
  };

  const clickClose = ()  => {
    setModalOpen(false);
  };

  const clickRead = () =>  {
    if (nodeData.status === STATUS.STAR) {
      setModalOpen(false);

      return;
    }

    changeNodeStatus(collectionId, nodeData, STATUS.READ);

    setModalOpen(false);
  };

  const clickPaperLink = (ev) => {
    ev.preventDefault();

    setIsLinkClick(true);
  };

  return (
    <>
      {!isPaperExist ? (
        <LoadingCircle />
      ) : (
        <div className="flex flex-col bg-white border rounded-lg shadow border-slate-700 max-w-[900px]">
          <div className="flex gap-12 px-12 py-8 bg-slate-200 rounded-t-md">
            <button className="text-white rounded-full bg-customRed w-28 hover:bg-red-700" onClick={clickClose}>
              ✘
            </button>
            <button className="text-white rounded-full bg-customGreen w-28 hover:bg-green-600" onClick={clickRead}>
              ✔︎
            </button>
            {!isStar && (
              <button
                className="text-white rounded-full bg-customYellow w-28 hover:bg-yellow-500"
                onClick={clickStar}
              >
              ★
              </button>
            )}
          </div>
          <div className="px-12 py-8">
            <h1 className="px-12 py-4 m-2 font-semibold tracking-tight">
              <p className="p-4">{decodedString(paper?.title) || "제목 정보 없음"}</p>
            </h1>
            <div className={CLASS_CARD_PROP}>
              <p className={`${CLASS_BADGE} bg-slate-100 text-slate-600`}>저널명</p>
              <p className="text-sm text-slate-600">{decodedString(paper?.containerTitle) || "저널 정보 없음"}</p>
            </div>
            <div className={CLASS_CARD_PROP}>
              <p className={`${CLASS_BADGE} bg-blue-100 text-blue-800`}>출판일자</p>
              <p className="text-sm text-slate-600 min-w-80">{paper?.createdAt || "출판일 정보 없음"}</p>
            </div>
            <div className="inline-flex">
              <div className={CLASS_CARD_PROP}>
                <p className={`${CLASS_BADGE} bg-indigo-100 text-indigo-800`}>저자</p>
                <p className="text-sm text-slate-600 max-w-680">{decodedString(paper?.authors) || "저자 정보 없음"}</p>
              </div>
            </div>
            <div className={CLASS_CARD_PROP}>
              <p className={`${CLASS_BADGE_PROP} bg-slate-100 text-slate-400 border border-slate-400`}>
                {paper?.citations}번의 인용
              </p>
              <p className={`${CLASS_BADGE_PROP} bg-slate-100 text-slate-400 border border-slate-400`}>
                {paper?.references}개의 참고문헌
              </p>
            </div>
            <div className="flex flex-col px-10 py-12">
              <h2 className="font-nanumNeo p-0.5 font-bold">초록</h2>
              <div className="p-12 m-2 border rounded-md font-pretendard">{formattedAbstract}</div>
            </div>
            <div className="flex flex-row justify-between px-10 py-4 mb-12 font-nanumNeo">
              <a onClick={clickPaperLink} className={`${CLASS_CARD_BUTTON} bg-cyan-500 hover:bg-cyan-700`}>
                논문 보러 가기 ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PaperNodeCard;
