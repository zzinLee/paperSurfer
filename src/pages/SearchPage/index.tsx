import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { HiOutlinePaintBrush } from "react-icons/hi2";

import PaperSearchBar from "../../components/PaperSearchBar";
import PaperSearchList from "../../components/PaperSearchList";
import PaperSidebar from "../../components/PaperSidebar";

import type { PaperConfig } from "../../types/interface";

function SearchPage() {
  const navigator = useNavigate();
  const { collectionId } = useParams();
  const [searchList, setSearchList] = useState<PaperConfig[]>([]);
  const isSearchListExist = searchList.length !== 0;

  return (
    <>
      <PaperSidebar />
      <section className="flex flex-col items-center grow">
        <PaperSearchBar getSearchList={setSearchList} />
        {isSearchListExist && <PaperSearchList searchList={searchList} />}
      </section>
      <button className="absolute p-8 text-white rounded-full shadow-xl bg-violet-700 top-30 right-30 text-32">
        <HiOutlinePaintBrush
          className="size-28"
          onClick={() => navigator(`/${collectionId}/view`)}
        />
      </button>
    </>
  );
}

export default SearchPage;
