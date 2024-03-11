import { useState } from "react";
import { CiCircleRemove } from "react-icons/ci";

import { useCollectionStore } from "../../stores/collection";

function NewCollectionInput({ toggle }) {
  const { setCollectionList } = useCollectionStore();
  const [showAlert, setShowAlert] = useState(false);
  const [collectionName, setCollectionName] = useState("");

  function submitCollection (ev) {
    ev.preventDefault();

    if (!collectionName.length || collectionName.length > 28) {
      return;
    }

    const newCollection = {
      collectionName,
      key: Date.now(),
    };

    setCollectionList(newCollection);
    toggle();
  }

  function typeInput(ev) {
    if (showAlert) {
      setShowAlert(false);
    }

    if (ev.target.value.length > 28 || !ev.target.value.length) {
      setShowAlert(true);
    }

    const userInput = ev.target.value;

    setCollectionName(userInput.trim());
  }

  return (
    <div className="p-10 m-10 bg-white shadow-md w-208 rounded-xl h-fit">
      <div className="inline-flex">
        <button onClick={toggle}>
          <CiCircleRemove className="text-customPurple size-30" />
        </button>
        <p className="m-4 ml-10 text-18 font-nanumNeo">새로운 컬렉션</p>
      </div>
      <form className="flex flex-col gap-10 p-5" onSubmit={submitCollection}>
        <input
          type="text"
          className="p-5 rounded-sm bg-backgroundCollection text-14"
          onChange={typeInput}
          autoFocus
          placeholder="컬렉션 이름을 입력하세요"
        />
        <div className="w-204">
          {showAlert ? (
            <div className="inline text-alert text-12 font-nanumNeo">1자 이상 28자 이내로 작성</div>
          ) : (
            <div className="invisible inline text-12 font-nanumNeo">1자 이상 28자 이내로 작성</div>
          )}
          <button
            type="submit"
            className="inline px-3 ml-6 text-white rounded-md text-14 bg-customPurple font-nanumNeo"
          >
            확인
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewCollectionInput;
