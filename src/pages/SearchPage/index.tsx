import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PiGraphLight } from "react-icons/pi";

import PaperSearchBar from "../../components/PaperSearchBar";
import PaperSearchList from "../../components/PaperSearchList";
import PaperSidebar from "../../components/PaperSidebar";

import { goViewPage } from "../../utils/utils";
import usePaperStore from "../../stores/paper";
import useCollectionId from "../../hooks/useCollectionId";

import type { PaperConfig } from "../../types/interface";

function SearchPage() {
  const navigator = useNavigate();
  const collectionId = useCollectionId();
  const [searchList, setSearchList] = useState<PaperConfig[]>([]);
  const { paperCollection } = usePaperStore();
  const isSearchListExist = searchList.length !== 0;
  const isCurrentPaperListExist = paperCollection[collectionId] && paperCollection[collectionId].length > 0;

  return (
    <>
      <PaperSidebar />
      <section className="relative flex flex-col items-center grow">
        <PaperSearchBar setSearchList={setSearchList} />
        {isSearchListExist && <PaperSearchList searchList={searchList} />}
        {isCurrentPaperListExist && (
          <button
            className="flex flex-row absolute px-8 py-2 items-center text-white rounded-full shadow-xl bg-slate-700 top-150 right-30 text-[0.8rem] hover:bg-indigo-700"
            onClick={() => goViewPage(navigator, collectionId)}
          >
            <PiGraphLight size="28" />
            <p
              className="ml-4 sm:invisible sm:w-0 sm:h-0 sm:ml-0"
            >
              그래프 뷰 보러가기
            </p>
          </button>
        )}
      </section>
    </>
  );
}

export default SearchPage;
