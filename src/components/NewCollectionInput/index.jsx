import { useState } from "react";
import { CiCircleRemove } from "react-icons/ci";

import { useCollectionStore } from "../../stores/collection";

function NewCollectionInput({ clickButton }) {
  const { setCollectionList } = useCollectionStore();
  const [collectionName, setCollectionName] = useState("");

  function submitCollection (ev) {
    ev.preventDefault();
    clickButton();

    if (!collectionName.length) {
      return;
    }

    const newCollection = {
      collectionName,
      key: Date.now(),
    };

    setCollectionList(newCollection);
  }

  function typeInput(ev) {
    setCollectionName(ev.target.value);
  }

  return (
    <div className="w-11/12 p-10 m-10 bg-white shadow-m min-w-100 rounded-xl h-fit">
      <div className="flex flex-row gap-10">
        <button onClick={clickButton}>
          <CiCircleRemove className="text-purple size-30" />
        </button>
        <p className="m-4 font-sans">새로운 컬렉션</p>
      </div>
      <form
        className="flex flex-col gap-10 p-5"
        onSubmit={submitCollection}
      >
        <input
          type="text"
          className="p-5 rounded-sm bg-backgroundCollection"
          onChange={typeInput}
          autoFocus
          placeholder="컬렉션 이름을 입력하세요..."
        />
        <button type="submit" className="self-end p-5 text-white rounded-md w-60 bg-purple">
          확인
        </button>
      </form>
    </div>
  );
}

export default NewCollectionInput;
