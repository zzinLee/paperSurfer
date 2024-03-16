import { useState, useEffect } from "react";
import axios from "axios";

import API from "../../utils/configAPI";
import { formattingResponse, decodedString } from "../../utils/utils";

const CLASS_CARD_DIV = "flex flex-col p-4 mb-8 bg-white border rounded-lg shadow border-slate-700 max-w-[900px]";
const CLASS_BADGE =
  "text-sm font-semibold me-2 mr-4 px-2.5 py-0.5 rounded inline-flex items-center justify-center min-w-72";
const CLASS_CARD_PROP = "flex flex-row gap-3 px-10 py-5";
const CLASS_BADGE_PROP = "text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded me-4";
const CLASS_CARD_BUTTON =
  "px-8 text-center text-white rounded-lg shadow-md text-14 w-fit hover:cursor-pointer";
const CLASS_ABSTRACT_BADGE =
  "text-xl inline-flex items-center py-0.5 rounded me-4 font-nanumNeo px-0.5 font-bold";
const CLASS_LOADING_CIRCLE =
  "border-4 border-transparent rounded-full h-80 w-80 animate-spin border-sora border-t-customPurple";


function PaperNodeCard({ nodeData, nodeElem, setModalOpen }) {
  const [paper, setPaper] = useState(null);
  const [isLinkClick, setIsLinkClick] = useState(false);
  const doi = nodeData.doi;
  const isPaperExist = Boolean(paper);
  const abstract = decodedString(paper?.abstract).replaceAll("Abstract", "").slice(0, 290);
  const formattedAbstract = abstract ? abstract + "..." : "초록 정보 없음";

  useEffect(() => {
    getDoiPaper(doi, setPaper);
  }, [doi]);

  useEffect(() => {
    if (isLinkClick) {
      window.open(paper.url, "_blank", "noopener, noreferrer");
    }
  }, [isLinkClick, paper]);


  function clickStar(ev) {
    ev.stopPropagation();
    //TODO: 리스트에 추가
  }

  function clickDelete(ev) {
    ev.stopPropagation();
    //TODO: 노드 삭제 기능 추가
  }

  return (
    <>
      {!isPaperExist ? (
        <div className={CLASS_LOADING_CIRCLE}></div>
      ) : (
        <div className={CLASS_CARD_DIV}>
          <button
            className="self-end m-4 text-white rounded-full bg-customGreen w-28 hover:bg-green-600"
            onClick={() => {
              nodeElem.setAttribute("fill", "#00C75C");

              setModalOpen(false);
            }}
          >
            ✔︎
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
            <span className={`${CLASS_BADGE_PROP} bg-slate-100 text-slate-400 border border-slate-400`}>
              {paper?.citations}번의 인용
            </span>
            <span className={`${CLASS_BADGE_PROP} bg-slate-100 text-slate-400 border border-slate-400`}>
              {paper?.references}개의 참고문헌
            </span>
          </div>
          <div className="flex flex-col px-10 py-12">
            <h2 className={CLASS_ABSTRACT_BADGE}>초록</h2>
            <div className="p-12 m-2 border rounded-md font-pretendard">{formattedAbstract}</div>
          </div>
          <div className="flex flex-row justify-between gap-3 p-10">
            <a
              onClick={(ev) => {
                ev.preventDefault();

                setIsLinkClick(!isLinkClick);
              }}
              className={`${CLASS_CARD_BUTTON} bg-cyan-500 hover:bg-cyan-700`}
            >
              논문 보러 가기 ↗
            </a>
            <div>
                <button
                  className="self-end mr-4 text-white rounded-full bg-customYellow w-28 hover:bg-yellow-500"
                  onClick={clickStar}
                >
                  ★
                </button>
                <button
                  className="self-end text-white rounded-full bg-customRed w-28 hover:bg-red-700"
                  onClick={clickDelete}
                >
                  ✘
                </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

async function getDoiPaper(doi, setPaper) {
  const res = await axios.get(`${API.CROSSREF_WORKS_URL}/${doi}`);
  const response = res?.data?.message;
  const paper = formattingResponse(response);

  setPaper(paper);
}

export default PaperNodeCard;