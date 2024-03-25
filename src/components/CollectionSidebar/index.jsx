import NewCollectionToggle from "../NewCollectionToggle";
import CollectionList from "../CollectionList";

import useCollectionStore from "../../stores/collection";

function CollectionSidebar() {
  const { collection } = useCollectionStore();
  const isCollectionListExist = collection && Object.keys(collection).length > 0;

  return (
    <aside className="flex flex-col items-center bg-white w-222">
      <NewCollectionToggle />
      {isCollectionListExist && <CollectionList />}
    </aside>
  );
}

export default CollectionSidebar;
