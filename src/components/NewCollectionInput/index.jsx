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
    <div className="w-11/12 p-10 m-10 bg-white shadow-m min-w-100 rounded-xl h-fit">
      <div className="flex flex-row gap-10">
        <button onClick={toggle}>
          <CiCircleRemove className="text-customPurple size-30" />
        </button>
        <p className="m-4 font-nanumNeo">새로운 컬렉션</p>
      </div>
      <form className="flex flex-col gap-10 p-5" onSubmit={submitCollection}>
        <input
          type="text"
          className="p-5 rounded-sm bg-backgroundCollection"
          onChange={typeInput}
          autoFocus
          placeholder="컬렉션 이름을 입력하세요..."
        />
        {showAlert && <div className="text-alert text-15 font-nanumNeo">1자 이상 28자 이내로 작성</div>}
        <button type="submit" className="self-end p-5 text-sm text-white rounded-md w-fit bg-customPurple font-nanumNeo">
          확인
        </button>
      </form>
    </div>
  );
}

export default NewCollectionInput;
