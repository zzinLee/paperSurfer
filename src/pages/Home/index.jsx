import CollectionSidebar from "../../components/CollectionSidebar";
import PaperSidebar from "../../components/PaperSidebar";

import { useRootCollectionStore } from "../../stores/collection";

function Home() {
  const { collection } = useRootCollectionStore();
  const isRootSelected = collection.key !== 0 && collection.collectionName !== "";

  return (
    <div className="relative z-0 flex flex-row h-full bg-slate-100">
      <CollectionSidebar />
      {isRootSelected && <PaperSidebar />}
    </div>
  );
}

export default Home;
