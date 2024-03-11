import { CiCirclePlus } from "react-icons/ci";

function NewCollectionButton({ toggle }) {
  return (
    <button
      onClick={toggle}
      className="flex flex-row items-center p-10 m-10 bg-white shadow-md h-fit rounded-xl w-208"
    >
      <CiCirclePlus className="text-customPurple size-30" />
      <p className="m-4 ml-10 text-18 font-nanumNeo">새로운 컬렉션</p>
    </button>
  );
}

export default NewCollectionButton;
