import { Routes, Route } from "react-router-dom";

import Header from "../components/Header";
import SearchPage from "../pages/SearchPage";
import Home from "../pages/Home";

function App() {
  return (
    <div className="relative flex flex-col h-screen">
      <Header />
      <Routes>
        <Route path="/" exact element={<Home />}>
          <Route path="/search" element={<SearchPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
