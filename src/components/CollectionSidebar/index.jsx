import NewCollectionToggle from "../NewCollectionToggle";
import CollectionList from "../CollectionList";

function CollectionSidebar() {
  return (
    <aside className="flex flex-col items-center bg-white w-222">
      <NewCollectionToggle />
      <CollectionList />
    </aside>
  );
}

export default CollectionSidebar;
