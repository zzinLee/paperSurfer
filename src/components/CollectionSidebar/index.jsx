import NewCollectionToggle from "../NewCollectionToggle";
import CollectionList from "../CollectionList";

function CollectionSidebar() {
  return (
    <section className="flex flex-col items-center w-2/12 h-full shadow-md bg-backgroundCollection min-w-185">
      <NewCollectionToggle />
      <CollectionList />
    </section>
  );
}

export default CollectionSidebar;
