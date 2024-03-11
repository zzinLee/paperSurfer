import { Navigate, Outlet } from "react-router-dom";

import CollectionSidebar from "../../components/CollectionSidebar";
import PaperSidebar from "../../components/PaperSidebar";

import { useRootCollectionStore } from "../../stores/collection";
import { usePaperListStore } from "../../stores/paper";

function Home() {
  const { collection } = useRootCollectionStore();
  const paperStore = usePaperListStore();
  const isRootCollectionSelected = collection.key !== 0 && collection.collectionName !== "";
  const isCurrentCollectionPaperExist = paperStore[collection.key]?.length;

  return (
    <div className="relative z-0 flex flex-row h-full bg-bgColor">
      <CollectionSidebar />
      {isRootCollectionSelected && <PaperSidebar />}
      {isRootCollectionSelected &&  !isCurrentCollectionPaperExist && <Navigate to={`/${collection.key}/search`} />}
      {!isRootCollectionSelected && !isCurrentCollectionPaperExist && <Navigate to="/" />}
      <Outlet />
    </div>
  );
}

export default Home;
