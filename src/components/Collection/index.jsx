import { useNavigate, useParams } from "react-router-dom";

import { useCollectionStore } from "../../stores/collection";
import { usePaperListStore } from "../../stores/paper";

function Collection({ collectionKey, collectionName }) {
  const navigator = useNavigate();
  const { collectionId } = useParams();
  const { collectionList, deleteCollectionList } = useCollectionStore();
  const { deletePaperList } = usePaperListStore();
  const isRoot = collectionKey === Number(collectionId);
  const backgroundColor = isRoot ? "bg-violet-500" : "bg-transWhite";
  const fontColor = isRoot ? "text-white" : "text-black";

  function deleteCollection(ev) {
    ev.stopPropagation();

    const clickedCollectionId = ev.target.id.replace(/\D/g, "");
    const deleteCollectionKey = Number(clickedCollectionId);
    const deleteCollectionIndex = collectionList.findIndex((collection) => collection.key === deleteCollectionKey);

    if (deleteCollectionIndex !== -1) {
      deleteCollectionList(deleteCollectionIndex);
      deletePaperList(collectionKey);

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
      className={`inline-flex hover:bg-violet-400 hover:text-white p-8 shadow-md rounded-md mx-10 my-2 ${backgroundColor} ${fontColor}`}
      onClick={clickCollection}
    >
      <div className="flex-1 px-4 break-words min-w-120 text-balance font-pretendard" id={`list-${collectionKey}`}>
        {collectionName}
      </div>
      <button
        onClick={deleteCollection}
        id={`delete-${collectionKey}`}
        className="px-5 font-bold rounded-sm text-22"
      >
        ✘
      </button>
    </li>
  );
}

export default Collection;
