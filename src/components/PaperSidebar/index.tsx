import { useState } from "react";

import Paper from "../Paper";
import useCollectionStore from "../../stores/collection";
import usePaperStore from "../../stores/paper";
import useCollectionId from "../../hooks/useCollectionId";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function PaperSidebar() {
  const collectionId = useCollectionId();
  const { collection } = useCollectionStore();
  const { paperCollection } = usePaperStore();
  const currentCollectionName = collection[collectionId];
  const currentPaperCollection = paperCollection[collectionId];
  const paperListElements =
    currentPaperCollection &&
    currentPaperCollection.map((paper) => (
      <li key={paper.doi}>
        <Paper paper={paper} />
      </li>
    ));
  const isPaperListExist = paperListElements?.length > 0;
  const [isFolded, setIsFolded] = useState(false);
  const foldedStyle = isFolded ? "ease-in w-30 bg-white" : "ease-out w-210 bg-slate-50";
  const handleClick = () => {
    setIsFolded(!isFolded);
  };

  return (
    <aside
      className={`relative flex flex-col h-full max-w-210 transition-all duration-100 ${foldedStyle} sm:text-[1rem] mb:text-[5rem]`}
    >
      {isFolded ? (
        <button
          onClick={handleClick}
          className="relative mt-62 w-24 h-52 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 rounded-r-lg shadow-sm"
        >
          <IoIosArrowForward className="hover:text-indigo-700" />
          <span className="blind">토글열기</span>
        </button>
      ) : (
        <div className="w-full text-center break-words">
          <div className="p-10 border border-r-0 border-l-0 border-t-0 border-b-2 border-stone-200">
            {currentCollectionName || "제목 내용 없음"}
          </div>
          <ul>
            {isPaperListExist ? (
              paperListElements
            ) : (
              <li className="p-8 text-black-100 text-14 text-slate-700">등록된 논문이 없습니다.</li>
            )}
          </ul>
        </div>
      )}
      {!isFolded && (
        <button
          onClick={handleClick}
          className="absolute z-10 -right-24 top-58 w-24 h-52 shadow-sm bg-stone-50 hover:bg-indigo-50 hover:text-indigo-700 rounded-r-lg"
        >
          <IoIosArrowBack className="m-auto" />
          <span className="blind">토글닫기</span>
        </button>
      )}
    </aside>
  );
}

export default PaperSidebar;
