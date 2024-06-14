import { useState, type MouseEventHandler } from "react";
import NewCollectionToggle from "../NewCollectionToggle";
import CollectionList from "../CollectionList";

import useCollectionStore from "../../stores/collection";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function CollectionSidebar() {
  const { collection } = useCollectionStore();
  const isCollectionListExist = collection && Object.keys(collection).length > 0;
  const [isFolded, setIsFolded] = useState<boolean>(false);
  const foldedWidthAnimation = isFolded ? "ease-in w-30" : "ease-out w-210";
  const handleClick: MouseEventHandler<SVGElement | HTMLButtonElement> = (ev) => {
    ev.stopPropagation();

    setIsFolded(!isFolded);
  };

  return (
      <aside className={`relative flex flex-col shadow-sm max-w-210 transition-all duration-100 ${foldedWidthAnimation} sm:text-[1rem] mb:text-[5rem]`}>
        {isFolded ? (
          <IoIosArrowForward className="m-5 mt-12 hover:text-indigo-700" size="18" onClick={handleClick} />
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
  );
}

export default CollectionSidebar;
