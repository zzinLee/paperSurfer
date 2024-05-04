import { useState } from "react";
import NewCollectionToggle from "../NewCollectionToggle";
import CollectionList from "../CollectionList";

import useCollectionStore from "../../stores/collection";

import { IoClose } from "react-icons/io5";
import { IoReorderThreeOutline } from "react-icons/io5";

function CollectionSidebar() {
  const [isFolded, setIsFold] = useState(false);
  const { collection } = useCollectionStore();
  const isCollectionListExist = collection && Object.keys(collection).length > 0;
  const width = isFolded ? "w-fit" : "w-222";

  return (
    <aside className={`flex flex-col items-center bg-white ${width}`}>
      <button className="self-end p-4 m-4 bg-white" onClick={() => setIsFold(!isFolded)}>
        {isFolded ? <IoReorderThreeOutline size={28} /> : <IoClose size={28} />}
      </button>
      {!isFolded && (
        <div>
          <NewCollectionToggle />
          {isCollectionListExist && <CollectionList />}
        </div>
      )}
    </aside>
  );
}

export default CollectionSidebar;
