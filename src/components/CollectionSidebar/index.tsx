import { useState, type MouseEventHandler } from "react";
import NewCollectionToggle from "../NewCollectionToggle";
import CollectionList from "../CollectionList";

import useCollectionStore from "../../stores/collection";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function CollectionSidebar() {
  const { collection } = useCollectionStore();
  const isCollectionListExist = collection && Object.keys(collection).length > 0;
  const [isFolded, setIsFold] = useState<boolean>(false);
  const handleClick: MouseEventHandler<SVGElement | HTMLButtonElement> = (ev) => {
    ev.stopPropagation();

    setIsFold(!isFolded);
  };
  const foldedWidthAnimation = isFolded ? "ease-in w-40" : "ease-out w-210";

  return (
    <>
      <aside className={`relative flex flex-col shadow-sm max-w-210 transition-all duration-100 ${foldedWidthAnimation}`}>
        {isFolded ? (
          <IoIosArrowForward className="m-8 mt-12 hover:text-indigo-700" size="24" onClick={handleClick} />
        ) : (
          <div className="w-210">
            <NewCollectionToggle />
            {isCollectionListExist && <CollectionList />}
          </div>
        )}
        {!isFolded && (
          <button
            onClick={handleClick}
            className="absolute z-10 left-210 top-0 w-24 h-52 shadow-sm bg-stone-50 hover:bg-indigo-50 hover:text-indigo-700 rounded-r-lg"
          >
            <IoIosArrowBack className="m-auto" />
            <span className="blind">토글닫기</span>
          </button>
        )}
      </aside>
    </>
  );
}

export default CollectionSidebar;
