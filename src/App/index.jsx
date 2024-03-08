import Header from "../components/Header";
import CollectionSidebar from "../components/CollectionSidebar";
import PaperSidebar from "../components/PaperSidebar";

import { useRootCollectionStore } from "../stores/collection";

function App() {
  const { collection } = useRootCollectionStore();
  const isRootSelected = collection.key !== 0 && collection.collectionName !== "";

  return (
    <div className="relative flex flex-col h-screen">
      <Header />
      <div className="relative z-0 flex flex-row h-full bg-slate-100">
        <CollectionSidebar />
        {isRootSelected && <PaperSidebar />}
      </div>
    </div>
  );
}

export default App;
