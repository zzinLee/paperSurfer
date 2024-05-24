import useCollectionStore from "../../stores/collection";

import Collection from "../Collection";

function CollectionList() {
  const { collection } = useCollectionStore();
  const collectionList = Object.entries(collection);
  const collectionElemList = collectionList.map(([key, name]) =>
    <Collection
      key={key}
      collectionName={name}
      collectionKey={key}
    />
  );

  return (
    <ul className="flex flex-col w-full gap-5 font-nanumNeo">{collectionElemList}</ul>
  );
}

export default CollectionList;
