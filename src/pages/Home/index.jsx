import { Outlet } from "react-router-dom";

import CollectionSidebar from "../../components/CollectionSidebar";

function Home() {
  return (
    <div className="relative z-0 flex flex-row h-full bg-bgColor">
      <CollectionSidebar />
      <Outlet />
    </div>
  );
}

export default Home;
