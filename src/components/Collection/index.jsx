import { useNavigate, useParams } from "react-router-dom";
import { FaDeleteLeft } from "react-icons/fa6";

import { useCollectionStore } from "../../stores/collection";
import { usePaperListStore } from "../../stores/paper";
import { useChartStore } from "../../stores/chart";

function Collection({ collectionKey, collectionName }) {
  const navigator = useNavigate();
  const { collectionId } = useParams();
  const { collectionList, deleteCollectionList } = useCollectionStore();
  const { deleteCollectionChartData } = useChartStore();
  const { deleteAllPaperList } = usePaperListStore();
  const isRoot = collectionKey === Number(collectionId);
  const backgroundColor = isRoot ? "bg-violet-700" : "bg-transWhite";
  const fontColor = isRoot ? "text-white" : "text-black";

  function deleteCollection(ev) {
    ev.stopPropagation();

    const clickedCollectionId = ev.target.id.replace(/\D/g, "");
    const deleteCollectionKey = Number(clickedCollectionId);
    const deleteCollectionIndex = collectionList.findIndex((collection) => collection.key === deleteCollectionKey);

    if (deleteCollectionIndex !== -1) {
      deleteCollectionList(deleteCollectionIndex);
      deleteAllPaperList(collectionKey);
      deleteCollectionChartData(collectionKey);

      navigator("/");
    }
  }

  function clickCollection(ev) {
    if (!collectionId) {
      navigator(`/${collectionKey}/search`);

      return;
    }

    const clickedCollectionId = ev.target.id.replace(/\D/g, "");

    if (collectionId === clickedCollectionId) {
      navigator("/");
    } else {
      navigator(`/${collectionKey}/search`);
    }
  }

  return (
    <li
      className={`inline-flex hover:bg-violet-400 hover:text-white p-8 shadow-md rounded-sm mx-10 my-2 ${backgroundColor} ${fontColor}`}
      onClick={clickCollection}
    >
      <div className="flex-1 px-4 break-words min-w-120 text-balance font-pretendard" id={`list-${collectionKey}`}>
        {collectionName}
      </div>
      <button className="px-5 font-bold rounded-sm text-22">
        <FaDeleteLeft
          className="size-24"
          onClick={deleteCollection}
          id={`delete-${collectionKey}`}
        />
      </button>
    </li>
  );
}

export default Collection;
