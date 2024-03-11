import { useCollectionStore, useRootCollectionStore } from "../../stores/collection";

function Collection({ collectionKey, collectionName, isRoot }) {
  const { collectionList, deleteCollectionList } = useCollectionStore();
  const { collection, setCollection } = useRootCollectionStore();
  const backgroundColor = isRoot ? "bg-sora" : "bg-transWhite";
  const fontColor = isRoot ? "text-white" : "text-black";

  function deleteCollection(ev) {
    ev.stopPropagation();

    const clickedCollectionId = ev.target.id.replace(/\D/g, "");
    const deleteCollectionKey = Number(clickedCollectionId);
    const deleteCollectionIndex = collectionList.findIndex((collection) => collection.key === deleteCollectionKey);

    if (deleteCollectionIndex !== -1) {
      deleteCollectionList(deleteCollectionIndex);
      setCollection("", 0);
    }
  }

  function clickCollection(ev) {
    if (collection.key === 0 && collection.collectionName === "") {
      setCollection(collectionName, collectionKey);

      return;
    }

    const clickedCollectionId = ev.target.id.replace(/\D/g, "");
    const clickedCollectionKey = Number(clickedCollectionId);

    if (collection.key === clickedCollectionKey) {
      setCollection("", 0);
    } else {
      setCollection(collectionName, collectionKey);
    }
  }

  return (
    <li
      className={`flex flex-row justify-between items-center p-4 ${backgroundColor} ${fontColor}`}
      onClick={clickCollection}
    >
      <div className="flex-1 px-4 break-words min-w-120 text-balance" id={`list-${collectionKey}`}>
        {collectionName}
      </div>
      <button
        onClick={deleteCollection}
        id={`delete-${collectionKey}`}
        className="font-bold rounded-sm h-28 w-28 text-24 font-nanumNeo hover:text-customYellow"
      >
        ✘
      </button>
    </li>
  );
}

export default Collection;
