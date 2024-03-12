import { useNavigate } from "react-router-dom";

import { useCollectionStore, useRootCollectionStore } from "../../stores/collection";
import { usePaperListStore } from "../../stores/paper";

function Collection({ collectionKey, collectionName, isRoot }) {
  const navigator = useNavigate();
  const { collectionList, deleteCollectionList } = useCollectionStore();
  const { collection, setCollection } = useRootCollectionStore();
  const { deletePaperList } = usePaperListStore();
  const backgroundColor = isRoot ? "bg-violet-500" : "bg-transWhite";
  const fontColor = isRoot ? "text-white" : "text-black";

  function deleteCollection(ev) {
    ev.stopPropagation();

    const clickedCollectionId = ev.target.id.replace(/\D/g, "");
    const deleteCollectionKey = Number(clickedCollectionId);
    const deleteCollectionIndex = collectionList.findIndex((collection) => collection.key === deleteCollectionKey);

    if (deleteCollectionIndex !== -1) {
      deleteCollectionList(deleteCollectionIndex);
      setCollection("", 0);
      deletePaperList(collectionKey);
    }
  }

  function clickCollection(ev) {
    if (collection.key === 0 && collection.collectionName === "") {
      setCollection(collectionName, collectionKey);
      navigator(`/${collectionKey}/search`);

      return;
    }

    const clickedCollectionId = ev.target.id.replace(/\D/g, "");
    const clickedCollectionKey = Number(clickedCollectionId);

    if (collection.key === clickedCollectionKey) {
      setCollection("", 0);
      navigator("/");
    } else {
      setCollection(collectionName, collectionKey);
      navigator(`/${collectionKey}/search`);
    }
  }

  return (
    <li
      className={`inline-flex hover:bg-violet-400 hover:text-white p-8 shadow-md rounded-md mx-10 my-2 ${backgroundColor} ${fontColor}`}
      onClick={clickCollection}
    >
      <div className="flex-1 px-4 break-words min-w-120 text-balance" id={`list-${collectionKey}`}>
        {collectionName}
      </div>
      <button
        onClick={deleteCollection}
        id={`delete-${collectionKey}`}
        className="px-5 font-bold rounded-sm text-22 hover:text-violet-950"
      >
        ✘
      </button>
    </li>
  );
}

export default Collection;
