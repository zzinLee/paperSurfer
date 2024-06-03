import { type ChangeEvent, type FormEvent, useState } from "react";
import { FaRegFolderOpen } from "react-icons/fa6";

import useCollectionStore from "../../stores/collection";

interface NewCollectionInputInterface {
  toggle: () => void;
}

function NewCollectionInput({ toggle }: NewCollectionInputInterface) {
  const { setCollection } = useCollectionStore();
  const [showAlert, setShowAlert] = useState(false);
  const [collectionName, setCollectionName] = useState("");

  const submitCollection = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    if (!collectionName.length || collectionName.length > 20) {
      return;
    }

    const collectionKey = Date.now().toString();

    setCollection(collectionKey, collectionName);
    toggle();
  };

  const typeInput = (ev: ChangeEvent<HTMLInputElement>) => {
    if (showAlert) {
      setShowAlert(false);
    }

    if (ev.target.value.length > 20 || !ev.target.value.length) {
      setShowAlert(true);
    }

    const userInput = ev.target.value;

    setCollectionName(userInput.trim());
  };

  return (
    <div className="relative w-196 my-10 mx-8 shadow-md px-4 h-fit">
      <div
        className="flex flex-row justify-center items-center gap-16 rounded-xl p-8 hover:bg-slate-100 mb-8"
        onClick={toggle}
      >
        <FaRegFolderOpen size="20" />
        <div className="font-extrabold text-18 w-84">New</div>
      </div>
      <form onSubmit={submitCollection}>
        <input
          type="text"
          className="rounded-sm p-4 text-14 outline-slate-500 w-[100%] mb-4"
          onChange={typeInput}
          autoFocus
          placeholder="문서 이름을 입력하세요"
        />
        <div className="font-nanumNeo">
          {showAlert && <p className="absolute bottom-6 right-8 text-12 text-right text-indigo-700">1자 이상 20자 이내</p>}
        </div>
        <button
          type="submit"
          className="text-white bg-slate-400 text-14 w-64 rounded-md m-4 hover:bg-indigo-100">
          submit
        </button>
      </form>
    </div>
  );
}

export default NewCollectionInput;
