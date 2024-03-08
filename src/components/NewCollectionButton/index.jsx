import { CiCirclePlus } from "react-icons/ci";

function NewCollectionButton({ clickButton }) {
  return (
    <button
      onClick={clickButton}
      className="flex flex-row items-center w-10/12 p-10 m-10 bg-white shadow-md h-55 min-w-100 rounded-xl justify-evenly"
    >
      <CiCirclePlus className="text-purple size-30" />
      <p className="m-4 font-sans">새로운 컬렉션</p>
    </button>
  );
}

export default NewCollectionButton;
