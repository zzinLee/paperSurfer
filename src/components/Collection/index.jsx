import { useNavigate, useParams } from "react-router-dom";
import { FaDeleteLeft } from "react-icons/fa6";

import { useCollectionStore } from "../../stores/collection";
import { usePaperListStore } from "../../stores/paper";
import { useChartStore } from "../../stores/chart";

function Collection({ collectionKey, collectionName }) {
  const navigator = useNavigate();
  const { collectionId } = useParams();
  const { deleteCollectionFromStore } = useCollectionStore();
  const { deleteCollectionFromChartList, deleteStarList } = useChartStore();
  const { deleteAllPaperList } = usePaperListStore();
  const isRoot = collectionKey === collectionId;
  const backgroundColor = isRoot ? "bg-violet-700" : "bg-transWhite";
  const fontColor = isRoot ? "text-white" : "text-black";

  function deleteCollection(ev) {
    ev.stopPropagation();

    deleteCollectionFromStore(collectionKey);
    deleteAllPaperList(collectionKey);
    deleteCollectionFromChartList(collectionKey);
    deleteStarList(collectionKey);

    navigator("/");
  }

  function clickCollection() {
    if (!collectionId) {
      navigator(`/${collectionKey}/search`);

      return;
    }

    if (collectionId === collectionKey) {
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
      <div className="flex-1 px-4 break-words min-w-120 text-balance font-pretendard">
        {collectionName}
      </div>
      <button className="font-bold rounded-sm text-22">
        <FaDeleteLeft
          className="size-24"
          onClick={deleteCollection}
        />
      </button>
    </li>
  );
}

export default Collection;
