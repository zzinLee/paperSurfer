import { FaFolderPlus } from "react-icons/fa6";

function NewCollectionButton({ toggle }) {
  return (
    <button
      onClick={toggle}
      className="flex flex-row gap-16 p-10 m-10 shadow-md rounded-xl w-208 font-nanumNeo bg-stone-100"
    >
      <FaFolderPlus className="size-24" />
      <p className="">새로운 문서</p>
    </button>
  );
}

export default NewCollectionButton;
