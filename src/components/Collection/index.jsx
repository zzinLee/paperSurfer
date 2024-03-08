import { useCollectionStore, useRootCollectionStore } from "../../stores/collection";

function Collection({ collectionKey, collectionName, isRoot }) {
  const { collectionList, deleteCollectionList } = useCollectionStore();
  const { collection, setCollection } = useRootCollectionStore();
  const backgroundColor = isRoot ? "bg-sora" : "bg-transWhite";
  const fontColor = isRoot ? "text-white" : "text-black";

  function deleteCollection(ev) {
    ev.stopPropagation();

    const deleteCollectionKey = Number(ev.target.id);
    const deleteCollectionIndex = collectionList.findIndex((collection) => collection.key === deleteCollectionKey);

    if (deleteCollectionIndex !== -1) {
      deleteCollectionList(deleteCollectionIndex);
      setCollection("", 0);
    }
  }

  function clickCollection() {
    if (collection.key === 0 && collection.collectionName === "") {
      setCollection(collectionName, collectionKey);
    } else {
      setCollection("", 0);
    }
}

  return (
    <li
      className={`flex flex-row justify-between p-5 ${backgroundColor} ${fontColor}`}
      onClick={clickCollection}
    >
      {collectionName}
      <button
        onClick={deleteCollection}
        id={collectionKey}
        className="px-10 py-1 text-sm text-white rounded-md bg-purple"
      >
        X
      </button>
    </li>
  );
}

export default Collection;
