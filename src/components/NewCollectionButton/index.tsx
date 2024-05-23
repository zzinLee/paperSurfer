import { FaFolderPlus } from "react-icons/fa6";

interface NewCollectionButtonInterface {
  toggle: () => void;
}

function NewCollectionButton({ toggle }: NewCollectionButtonInterface) {
  return (
    <button
      onClick={toggle}
      className="flex flex-row gap-16 p-10 m-10 rounded-xl w-208 font-pretendard hover:bg-violet-400 hover:text-white"
    >
      <FaFolderPlus className="size-24" />
      <p className="font-extrabold text-20">Document</p>
    </button>
  );
}

export default NewCollectionButton;
