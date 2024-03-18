import { useParams } from "react-router-dom";
import { FcEmptyTrash } from "react-icons/fc";

import { usePaperListStore } from "../../stores/paper";
import { useChartStore } from "../../stores/chart";

function Paper({ paper }) {
  const { collectionId } = useParams();
  const { deletePaperFromStore } = usePaperListStore();
  const { deletePaperChartData, deletePaperFromStar } = useChartStore();
  const publishedAt = paper.createdAt;

  function deletePaper(ev) {
    ev.stopPropagation();

    deletePaperFromStore(collectionId, paper.doi);
    deletePaperChartData(collectionId, paper.doi);
    deletePaperFromStar(collectionId, paper.doi);
  }

  return (
    <div className="relative p-8 m-10 text-left bg-white rounded-sm shadow-md w-200">
      <div className="font-extrabold truncate text-14">{paper?.title || "제목 정보 없음"}</div>
      <div className="truncate text-10 text-stone-400">{paper?.authors || "저자 정보 없음"}</div>
      <div className="inline-flex justify-between w-full">
        <p className="text-10">{publishedAt || "출판일 정보 없음"}</p>
        <button className="p-2 text-20">
          <FcEmptyTrash onClick={deletePaper} className="size-28"/>
        </button>
      </div>
    </div>
  );
}

export default Paper;
