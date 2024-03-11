import { useState } from "react";

import PaperSearchBar from "../../components/PaperSearchBar";
import Loading from "../../components/shared/Loading";
import PaperSearchList from "../../components/PaperSearchList";

function SearchPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchList, setSearchList] = useState([]);
  const isSearchListExist = searchList.length !== 0;

  return (
    <section className="flex flex-col items-center justify-center grow">
      <PaperSearchBar isLoading={isLoading} setIsLoading={setIsLoading} getSearchList={setSearchList} />
      {isLoading && <Loading />}
      {isSearchListExist && <PaperSearchList searchList={searchList} />}
    </section>
  );
}

export default SearchPage;
