import { FaFolderPlus } from "react-icons/fa6";

interface NewCollectionButtonInterface {
  toggle: () => void;
}

function NewCollectionButton({ toggle }: NewCollectionButtonInterface) {
  return (
    <button
      onClick={toggle}
      className="flex flex-row justify-center items-center gap-16 p-8 my-10 mx-8 rounded-xl w-196 hover:bg-slate-100"
    >
      <FaFolderPlus size="20" />
      <p className="font-extrabold text-18 w-84">Document</p>
    </button>
  );
}

export default NewCollectionButton;
