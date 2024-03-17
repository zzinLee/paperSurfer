import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import LoadingCircle from "../shared/LoadingCircle";

import { useChartStore } from "../../stores/chart";
import API from "../../utils/configAPI";
import { STATUS } from "../../utils/constants";
import { formattingResponse, decodedString } from "../../utils/utils";

const CLASS_CARD_DIV = "flex flex-col p-4 mb-8 bg-white border rounded-lg shadow border-slate-700 max-w-[900px]";
const CLASS_BADGE =
  "text-sm font-semibold me-2 mr-4 px-2.5 py-0.5 rounded inline-flex items-center justify-center min-w-72";
const CLASS_CARD_PROP = "flex flex-row gap-3 px-10 py-5";
const CLASS_BADGE_PROP = "text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded me-4";
const CLASS_CARD_BUTTON =
  "px-8 py-2 text-center text-white rounded-lg shadow-md w-fit hover:cursor-pointer font-nanumNeo pt-4";
const CLASS_ABSTRACT_BADGE =
  "text-xl inline-flex items-center py-0.5 rounded me-4 font-nanumNeo px-0.5 font-bold";

function PaperNodeCard({ nodeData, setModalOpen, setIsLoadingChild }) {
  const { collectionId } = useParams();
  const { findAndChangeNodeStatus, addChildrenToChart } = useChartStore();

  const [paper, setPaper] = useState(null);
  const [isLinkClick, setIsLinkClick] = useState(false);

  const isPaperExist = Boolean(paper);
  const abstract = decodedString(paper?.abstract).replaceAll("Abstract", "").slice(0, 290);
  const formattedAbstract = abstract ? abstract + "..." : "초록 정보 없음";
  const isStar = nodeData.status === STATUS.STAR;

  async function getDoiPaper(doi, setPaper) {
    const res = await axios.get(`${API.CROSSREF_WORKS_URL}/${doi}`);
    const response = res?.data?.message;
    const paper = formattingResponse(response);

    setPaper(paper);
  }

  async function getChildrenNode(collectionId, parentNode) {
    setIsLoadingChild(true);

    const res = await axios.get(`${API.CROSSREF_WORKS_URL}?filter=doi:${parentNode.doi}&select=reference`);
    const response = res.data.message;
    const paperRefList = response?.items?.[0]?.reference;

    if (!paperRefList) {
      //TODO: reference 내역이 없다는 것을 사용자에게 알립니다.
      setIsLoadingChild(false);

      return;
    }

    const requestDoiString = paperRefList
      .map((ref) => ref.DOI)
      .filter((ref) => ref)
      .join(",doi:");

    const childrenRes = await axios.get(
      `${API.CROSSREF_WORKS_URL}?filter=doi:${requestDoiString}&select=DOI,title,is-referenced-by-count`
    );
    const childrenResponse = childrenRes.data.message;
    const childrenList = childrenResponse?.items;
    const formattedChildrenList = childrenList.map((child) => ({
      title: child?.title?.[0] || "제목 정보 없음",
      citations: child?.["is-referenced-by-count"],
      status: STATUS.DEFAULT,
      doi: child?.DOI
    }));

    setIsLoadingChild(false);
    addChildrenToChart(collectionId, parentNode, formattedChildrenList);
  }


  useEffect(() => {
    getDoiPaper(nodeData.doi, setPaper);
  }, [nodeData.doi]);

  useEffect(() => {
    if (isLinkClick) {
      window.open(paper.url, "_blank", "noopener, noreferrer");
    }
  }, [isLinkClick, paper]);


  function clickStar() {
    //TO DO: paperList에 업데이트 필요
    const isChildrenExist = nodeData?.children && nodeData.children.length > 0;

    if (!isChildrenExist) {
      getChildrenNode(collectionId, nodeData, addChildrenToChart);
    }

    findAndChangeNodeStatus(collectionId, nodeData, STATUS.STAR);
    setModalOpen(false);
  }

  function clickClose() {
    setModalOpen(false);
  }

  function clickRead() {
    //TO DO: star(리스트에 저장된 paper)인 것 읽음 상태 분기 처리 필요
    if (nodeData.status === STATUS.STAR) {
      setModalOpen(false);

      return;
    }

    findAndChangeNodeStatus(collectionId, nodeData, STATUS.READ);

    setModalOpen(false);
  }

  function clickPaperLink(ev) {
    ev.preventDefault();

    setIsLinkClick(true);
  }

  return (
    <>
      {!isPaperExist ?
        (<LoadingCircle />) :(
        <div className={CLASS_CARD_DIV}>
          <button
            className="self-end mx-8 my-4 text-white rounded-full bg-customRed w-28 hover:bg-red-700"
            onClick={clickClose}
          >
            ✘
          </button>
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
            <div className={`${CLASS_CARD_PROP}`}>
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
            <h2 className={CLASS_ABSTRACT_BADGE}>초록</h2>
            <div className="p-12 m-2 border rounded-md font-pretendard">{formattedAbstract}</div>
          </div>
          <div className="flex flex-row justify-between px-10 py-4 mb-12">
            <a
              onClick={clickPaperLink}
              className={`${CLASS_CARD_BUTTON} bg-cyan-500 hover:bg-cyan-700`}
            >
              논문 보러 가기 ↗
            </a>
            <div>
              {!isStar &&
                <button
                  className="self-end mr-4 text-white rounded-full bg-customYellow w-28 hover:bg-yellow-500"
                  onClick={clickStar}
                >
                  ★
                </button>
              }
              <button
                className="self-end m-4 text-white rounded-full bg-customGreen w-28 hover:bg-green-600"
                onClick={clickRead}
              >
                ✔︎
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PaperNodeCard;
