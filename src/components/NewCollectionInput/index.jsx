import { useState } from "react";
import { FaRegFolderOpen } from "react-icons/fa6";

import useCollectionStore from "../../stores/collection";

function NewCollectionInput({ toggle }) {
  const { setCollection } = useCollectionStore();
  const [showAlert, setShowAlert] = useState(false);
  const [collectionName, setCollectionName] = useState("");

  const submitCollection = (ev) => {
    ev.preventDefault();

    if (!collectionName.length || collectionName.length > 28) {
      return;
    }

    const collectionKey = Date.now();

    setCollection(collectionKey, collectionName);
    toggle();
  };

  const typeInput = (ev) => {
    if (showAlert) {
      setShowAlert(false);
    }

    if (ev.target.value.length > 28 || !ev.target.value.length) {
      setShowAlert(true);
    }

    const userInput = ev.target.value;

    setCollectionName(userInput.trim());
  };

  return (
    <div className="p-10 m-10 shadow-md w-208 rounded-xl h-fit bg-stone-100">
      <div className="inline-flex gap-16 text-black">
        <button onClick={toggle}>
          <FaRegFolderOpen className="size-24" />
        </button>
        <p className="font-extrabold text-20 font-pretendard">New</p>
      </div>
      <form className="flex flex-col gap-10" onSubmit={submitCollection}>
        <input
          type="text"
          className="p-5 rounded-sm text-14 focus: outline-violet-400"
          onChange={typeInput}
          autoFocus
          placeholder="문서 이름을 입력하세요"
        />
        <div
          className="flex flex-row justify-between w-full font-nanumNeo text-14"
        >
          {showAlert ? (
            <p className="inline text-violet-700">1자 이상 28자 이내</p>
          ) : (
            <p className="invisible inline">1자 이상 28자 이내</p>
          )}
          <button
            type="submit"
            className="px-6 py-2 text-white rounded-md bg-zinc-900 hover:bg-violet-700"
          >
            submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewCollectionInput;
