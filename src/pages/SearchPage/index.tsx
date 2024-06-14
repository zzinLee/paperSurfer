import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PiGraphLight } from "react-icons/pi";

import PaperSearchBar from "../../components/PaperSearchBar";
import PaperSearchList from "../../components/PaperSearchList";
import PaperSidebar from "../../components/PaperSidebar";

import usePaperStore from "../../stores/paper";
import useCollectionId from "../../hooks/useCollectionId";

import type { PaperStoreState, PaperConfig } from "../../types/interface";

function SearchPage() {
  const navigator = useNavigate();
  const collectionId = useCollectionId();
  const [searchList, setSearchList] = useState<PaperConfig[]>([]);
  const { paperCollection } = usePaperStore() as PaperStoreState;
  const isSearchListExist = searchList.length !== 0;
  const isCurrentPaperListExist = paperCollection[collectionId] && paperCollection[collectionId].length > 0;

  return (
    <>
      <PaperSidebar />
      <section className="relative flex flex-col items-center grow">
        <PaperSearchBar getSearchList={setSearchList} />
        {isSearchListExist && <PaperSearchList searchList={searchList} />}
        {isCurrentPaperListExist && (
          <button
            className="flex flex-row gap-4 absolute px-8 py-2 items-center text-white rounded-full shadow-xl bg-slate-700 top-30 right-30 text-18 hover:bg-indigo-700"
            onClick={() => navigator(`/${collectionId}/view`)}
          >
            <PiGraphLight size="28" />
            그래프 뷰 보러가기
          </button>
        )}
      </section>
    </>
  );
}

export default SearchPage;
