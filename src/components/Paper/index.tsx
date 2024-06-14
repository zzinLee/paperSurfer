import { useState, type MouseEvent } from "react";
import { FcEmptyTrash } from "react-icons/fc";

import Modal from "../shared/Modal";
import PaperCard from "../PaperCard";

import useCollectionId from "../../hooks/useCollectionId";
import usePaperStore from "../../stores/paper";
import useChartStore from "../../stores/chart";

import type { ChartStoreState, PaperStoreState, PaperConfig } from "../../types/interface";

interface PaperProps {
  paper: PaperConfig;
}

function Paper({ paper }: PaperProps) {
  const [isPaperCardOpen, setIsPaperCardOpen] = useState(false);
  const collectionId = useCollectionId();
  const { deletePaperFromCollection } = usePaperStore() as PaperStoreState;
  const { deletePaperFromChart, deletePaperFromStarCollection } = useChartStore() as ChartStoreState;

  const deletePaper = (ev: MouseEvent<SVGElement>) => {
    ev.stopPropagation();

    deletePaperFromCollection(collectionId, paper.doi);
    deletePaperFromChart(collectionId, paper.doi);
    deletePaperFromStarCollection(collectionId, paper.doi);
  };

  const clickPaper = (ev: MouseEvent<HTMLDivElement>) => {
    ev.preventDefault();

    setIsPaperCardOpen(!isPaperCardOpen);
  };

  return (
    <div
      className="relative p-8 m-4 text-left bg-white rounded-sm shadow-md w-200 hover:bg-slate-50"
      onClick={clickPaper}
      data-testid="paper"
    >
      {isPaperCardOpen && (
        <Modal setModal={setIsPaperCardOpen}>
          <PaperCard paper={paper} />
        </Modal>
      )}
      <div className="font-extrabold truncate text-14">{paper?.title || "제목 정보 없음"}</div>
      <div className="truncate text-10 text-stone-400">{paper?.author || "저자 정보 없음"}</div>
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
