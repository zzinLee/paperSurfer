import { Routes, Route } from "react-router-dom";

import Header from "../components/Header";
import SearchPage from "../pages/SearchPage";
import ViewPage from "../pages/ViewPage";
import Home from "../pages/Home";

function App() {
  return (
    <div className="relative flex flex-col h-screen">
      <Header />
      <Routes>
        <Route path="/" exact element={<Home />}>
          <Route path="/:collectionId/search" element={<SearchPage />} />
          <Route path="/:collectionId/view" element={<ViewPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
