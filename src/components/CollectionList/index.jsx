import { useCollectionStore } from "../../stores/collection";

function CollectionList() {
  const { collectionList, deleteCollectionList } = useCollectionStore();
  const isCollectionListExist = Boolean(collectionList.length);
  const collectionElemList = collectionList.map((collection) => {
    return (
      <li key={collection.key} className="flex flex-row justify-between p-5 bg-transWhite">
        {collection.collectionName}
        <button onClick={deleteThisCollection} id={collection.key} className="px-10 py-1 text-sm text-white rounded-md bg-purple">
          X
        </button>
      </li>
    );
  });

  function deleteThisCollection(ev) {
    const deleteCollectionKey = Number(ev.target.id);
    const deleteCollectionIndex = collectionList.findIndex((collection) => collection.key === deleteCollectionKey);

    if (deleteCollectionIndex !== -1) {
      deleteCollectionList(deleteCollectionIndex);
    }
  }

  return (
    <>
      {isCollectionListExist && (
        <div className="w-full p-5 mb-5 text-white bg-black">
          <h1 className="ml-10">컬렉션 정보</h1>
        </div>
      )}
      <ul className="flex flex-col w-full gap-5">{collectionElemList}</ul>
    </>
  );
}

export default CollectionList;
