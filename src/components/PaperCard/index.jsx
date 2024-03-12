import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { decodedString } from "../../utils/utils";
import { usePaperListStore } from "../../stores/paper";

const CLASS_BADGE = "text-sm font-semibold me-2 mr-4 px-2.5 py-0.5 rounded inline-flex items-center justify-center min-w-72";
const CLASS_CARD_PROP = "flex flex-row items-center gap-3 px-10 py-5";
const CLASS_BADGE_PROP = "text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded me-4";
const CLASS_CARD_BUTTON = "px-8 py-4 m-8 text-center text-white rounded-lg shadow-md text-14 w-fit hover:cursor-pointer";

function PaperCard({ paper }) {
  const { collectionId } = useParams();
  const { addPaperList, paperList } = usePaperListStore();
  const [isClick, setIsClick] = useState(false);
  const currentPaperList = paperList[collectionId];
  const publishedAt = paper.createdAt && paper.createdAt.join("").replaceAll(",", ".");
  const isAlreadyExist = currentPaperList && currentPaperList.some((storedPaper) => storedPaper.doi === paper.doi);

  function savePaperStore() {
    addPaperList(paper, collectionId);
  }

  useEffect(() => {
    function openPopUp() {
      window.open(paper.url, "_blank", "noopener, noreferrer");
    }

    if (isClick) {
      openPopUp();
      setIsClick(false);
    }

  }, [isClick, paper.url]);


  return (
    <div className="flex flex-col p-4 mb-8 bg-white border rounded-lg shadow border-slate-700 max-w-[900px]">
      <h1 className="px-12 py-4 m-2 font-semibold tracking-tight">
        <p className="p-4">{decodedString(paper?.title[0]) || "제목 정보 없음"}</p>
      </h1>
      <div className={CLASS_CARD_PROP}>
        <p className={`${CLASS_BADGE} bg-slate-100 text-slate-600`}>저널명</p>
        <p className="text-sm text-slate-600">{decodedString(paper?.containerTitle) || "저널 정보 없음"}</p>
      </div>
      <div className="inline-flex">
        <div className={CLASS_CARD_PROP}>
          <p className={`${CLASS_BADGE} bg-indigo-100 text-indigo-800`}>저자</p>
          <p className="text-sm text-slate-600 max-w-680">
            {decodedString(paper?.authors) || "저자 정보 없음"}
          </p>
        </div>
        <div className={CLASS_CARD_PROP}>
          <p className={`${CLASS_BADGE} bg-blue-100 text-blue-800`}>출판일자</p>
          <p className="text-sm text-slate-600">{publishedAt || "출판일 정보 없음"}</p>
        </div>
      </div>
      <div className="inline-flex m-8">
        <span className={`${CLASS_BADGE_PROP} bg-slate-100 text-slate-400 border border-slate-400`}>
          {paper?.citations}번의 인용
        </span>
        <span className={`${CLASS_BADGE_PROP} bg-slate-100 text-slate-400 border border-slate-400`}>
          {paper?.references}개의 참고문헌
        </span>
      </div>
      <div className="inline-flex justify-between mt-4 font-nanumNeo">
        {isAlreadyExist ? (
          <div className="px-8 py-4 m-8 border rounded-lg text-slate-400 text-14">이미 추가된 컬렉션 입니다</div>
        ) : (
          <button className={`${CLASS_CARD_BUTTON} bg-purple-500 hover:bg-purple-800`} onClick={savePaperStore}>
            이 컬렉션에 추가
          </button>
        )}
        <a onClick={(ev) => {
          ev.preventDefault();

          setIsClick(true);
        }} className={`${CLASS_CARD_BUTTON} bg-cyan-500 hover:bg-cyan-700`}>
          논문 보러 가기 ↗
        </a>
      </div>
    </div>
  );
}

export default PaperCard;
