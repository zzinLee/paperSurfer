import { useCollectionStore, useRootCollectionStore } from "../../stores/collection";

import Collection from "../Collection";

function CollectionList() {
  const { collectionList } = useCollectionStore();
  const { collection } = useRootCollectionStore();
  const isCollectionListExist = collectionList.length > 0;
  const rootCollectionKey = collection.key;
  const collectionElemList = collectionList.map((collection) =>
    <Collection
      key={collection.key}
      collectionName={collection.collectionName}
      collectionKey={collection.key}
      isRoot={rootCollectionKey === collection.key}
    />
  );

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
