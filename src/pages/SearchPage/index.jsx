import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GoPencil } from "react-icons/go";

import PaperSearchBar from "../../components/PaperSearchBar";
import PaperSearchList from "../../components/PaperSearchList";
import PaperSidebar from "../../components/PaperSidebar";

const CLASS_FLOATING_BUTTON = "bg-violet-500 absolute p-8 rounded-full shadow-xl top-30 right-30 text-32 text-white";

function SearchPage() {
  const navigator = useNavigate();
  const { collectionId } = useParams();
  const [searchList, setSearchList] = useState([]);
  const isSearchListExist = searchList.length !== 0;

  return (
    <>
      <PaperSidebar />
      <section className="flex flex-col items-center justify-center grow">
        <PaperSearchBar getSearchList={setSearchList} />
        {isSearchListExist && <PaperSearchList searchList={searchList} />}
      </section>
      <button className={CLASS_FLOATING_BUTTON}>
        <GoPencil onClick={() => navigator(`/${collectionId}/view`)} />
      </button>
    </>
  );
}

export default SearchPage;
