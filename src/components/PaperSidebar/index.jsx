import { useRootCollectionStore } from "../../stores/collection";

function PaperSidebar() {
  const { collection } = useRootCollectionStore();

  return (
    <section className="flex flex-col items-center h-full shadow-md bg-backgroundList min-w-200">
      <div className="w-full p-5 mb-5 text-white bg-sora">
        <h1 className="px-5 break-words min-w-130 text-balance">{collection.collectionName}</h1>
      </div>
    </section>
  );
}

export default PaperSidebar;
