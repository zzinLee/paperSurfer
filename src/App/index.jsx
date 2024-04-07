import { Routes, Route } from "react-router-dom";

import Header from "../components/Header";
import SearchPage from "../pages/SearchPage";
import ViewPage from "../pages/ViewPage";
import Home from "../pages/Home";
import TablePage from "../pages/TablePage";
import ErrorPage from "../pages/ErrorPage";
import FileViewPage from "../pages/FileViewPage";

function App() {
  return (
    <>
      <div className="relative hidden w-screen h-screen mobile-alert">
        <div className="relative p-10 text-center">
          <p>현재 서비스는 모바일 환경에서는 지원하지 않습니다.</p>
          <p>웹에서 접속해주세요.</p>
          <p>곧 모바일에서도 뵈어요! 🙌</p>
        </div>
      </div>
      <div className="relative flex flex-col h-screen desktop-content">
        <Header />
        <Routes>
          <Route path="/" exact element={<Home />}>
            <Route path="/:collectionId/search" element={<SearchPage />} />
            <Route path="/:collectionId/view" element={<ViewPage />} />
            <Route path="/:collectionId/table" element={<TablePage />} />
            <Route path="/error" element={<ErrorPage />} />
          </Route>
        </Routes>
        <Routes>
          <Route path="/file" element={<FileViewPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
