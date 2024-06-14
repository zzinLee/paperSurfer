import { Outlet } from "react-router-dom";

import CollectionSidebar from "../../components/CollectionSidebar";

function Home() {
  return (
    <div className="flex flex-row h-full max-w-screen-xl">
      <CollectionSidebar />
      <Outlet />
    </div>
  );
}

export default Home;
