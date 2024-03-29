import useCollectionStore from "../../stores/collection";

import Collection from "../Collection";

function CollectionList() {
  const { collection } = useCollectionStore();
  const collectionList = Object.entries(collection);
  const isCollectionListExist = collectionList.length > 0;
  const collectionElemList = collectionList.map(([key, name]) =>
    <Collection
      key={key}
      collectionName={name}
      collectionKey={key}
    />
  );

  return (
    <>
      {isCollectionListExist && (
        <div className="self-start p-6 m-6 overflow-auto text-black font-nanumNeo">
          <h1>문서 목록</h1>
        </div>
      )}
      <ul className="flex flex-col w-full gap-5 font-nanumNeo">{collectionElemList}</ul>
    </>
  );
}

export default CollectionList;
