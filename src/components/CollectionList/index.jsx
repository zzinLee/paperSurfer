import { useCollectionStore, useRootCollectionStore } from "../../stores/collection";

import Collection from "../Collection";

function CollectionList() {
  const { collectionList } = useCollectionStore();
  const { collection } = useRootCollectionStore();
  const isCollectionListExist = collectionList.length > 0;
  const rootCollectionKey = collection.key;
  const collectionElemList = collectionList.map((eachCollection) =>
    <Collection
      key={eachCollection.key}
      collectionName={eachCollection.collectionName}
      collectionKey={eachCollection.key}
      isRoot={rootCollectionKey === eachCollection.key}
    />
  );

  return (
    <>
      {isCollectionListExist && (
        <div className="self-start p-5 m-5 text-black">
          <h1 className="font-nanumNeo">컬렉션 리스트</h1>
        </div>
      )}
      <ul className="flex flex-col w-full gap-5 font-nanumNeo">{collectionElemList}</ul>
    </>
  );
}

export default CollectionList;
