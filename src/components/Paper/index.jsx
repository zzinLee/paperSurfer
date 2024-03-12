import { useParams } from "react-router-dom";

import { usePaperListStore } from "../../stores/paper";
import { decodedString } from "../../utils/utils";

function Paper({ paper }) {
  const { deleteEachPaper } = usePaperListStore();
  const { collectionId } = useParams();
  const publishedAt = paper.createdAt && paper.createdAt.join("").replaceAll(",", ".");

  function deletePaper(ev) {
    ev.stopPropagation();

    deleteEachPaper(collectionId, paper.doi);
  }

  return (
    <div className="relative p-8 m-10 text-left bg-white rounded-md text-14 w-204 hover:bg-gray-200">
      <div className="font-extrabold truncate">{decodedString(paper?.title[0]) || "제목 정보 없음"}</div>
      <div className="text-sm truncate text-10">{decodedString(paper?.authors) || "저자 정보 없음"}</div>
      <div className="inline-flex justify-between w-full">
        <p className="text-10">{publishedAt || "출판일 정보 없음"}</p>
        <button className="p-2 text-20" onClick={deletePaper}>
          ✘
        </button>
      </div>
    </div>
  );
}

export default Paper;
