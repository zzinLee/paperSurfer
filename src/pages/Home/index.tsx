import { Outlet } from "react-router-dom";

import CollectionSidebar from "../../components/CollectionSidebar";

function Home() {
  return (
    <div className="flex flex-row w-full h-full">
      <CollectionSidebar />
      <Outlet />
    </div>
  );
}

export default Home;
