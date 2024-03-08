import { useRootCollectionStore } from "../../stores/collection";

function PaperSidebar() {
  const { collection } = useRootCollectionStore();

  return (
    <section className="flex flex-col items-center w-2/12 h-full shadow-md bg-backgroundList min-w-185">
      <div className="w-full p-5 mb-5 text-white bg-black">
        <h1 className="ml-10">{collection.collectionName}</h1>
      </div>
    </section>
  );
}

export default PaperSidebar;
