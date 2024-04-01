import { useState } from "react";
import { useParams } from "react-router-dom";
import { FcEmptyTrash } from "react-icons/fc";

import Modal from "../shared/Modal";
import PaperCard from "../PaperCard";

import usePaperStore from "../../stores/paper";
import useChartStore from "../../stores/chart";

function Paper({ paper }) {
  const [isPaperCardOpen, setIsPaperCardOpen] = useState(false);
  const { collectionId } = useParams();
  const { deletePaperFromCollection } = usePaperStore();
  const { deletePaperFromChart, deletePaperFromStarCollection } = useChartStore();

  const deletePaper = (ev) => {
    ev.stopPropagation();

    deletePaperFromCollection(collectionId, paper.doi);
    deletePaperFromChart(collectionId, paper.doi);
    deletePaperFromStarCollection(collectionId, paper.doi);
  };

  const clickPaper = (ev) => {
    ev.preventDefault();

    setIsPaperCardOpen(!isPaperCardOpen);
  };

  return (
    <div
      className="relative p-8 m-10 text-left bg-white rounded-sm shadow-md w-200 hover:bg-slate-50"
      onClick={clickPaper}
      data-testid="paper"
    >
      {isPaperCardOpen && (
        <Modal setModal={setIsPaperCardOpen}>
          <PaperCard paper={paper} />
        </Modal>
      )}
      <div className="font-extrabold truncate text-14">{paper?.title || "제목 정보 없음"}</div>
      <div className="truncate text-10 text-stone-400">{paper?.authors || "저자 정보 없음"}</div>
      <div className="inline-flex justify-between w-full">
        <p className="text-10">{paper?.createdAt || "출판일 정보 없음"}</p>
        <button className="p-2 text-20">
          <FcEmptyTrash onClick={deletePaper} className="size-28" />
        </button>
      </div>
    </div>
  );
}

export default Paper;
