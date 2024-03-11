import NewCollectionToggle from "../NewCollectionToggle";
import CollectionList from "../CollectionList";

function CollectionSidebar() {
  return (
    <section className="flex flex-col items-center h-full shadow-md bg-backgroundCollection w-220">
      <NewCollectionToggle />
      <CollectionList />
    </section>
  );
}

export default CollectionSidebar;
