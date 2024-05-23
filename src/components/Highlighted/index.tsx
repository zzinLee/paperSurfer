import type { MouseEvent, Dispatch, SetStateAction } from "react";
import type { DragElemConfig } from "../../types/interface";

interface HighlightedProps {
  elem: DragElemConfig;
  resetElemList: Dispatch<SetStateAction<DragElemConfig[]>>;
  elemList: Array<DragElemConfig>;
}

function Highlighted({ elem, resetElemList, elemList }: HighlightedProps) {
  const deleteHighlightedElem = (ev: MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();

    const deletedElementList = elemList.filter(({ id }) => id !== elem.id);

    resetElemList(deletedElementList);
  };

  return (
    <li className="flex items-center justify-between text-12 text-stone-700">
      <div className="w-full px-4 mr-2 text-pretty bg-stone-50">{elem.targetString}</div>
      <button
        className="px-4 text-white rounded-md bg-stone-700 min-w-35 text-pretty"
        onClick={deleteHighlightedElem}
      >
        삭제
      </button>
    </li>
  );
}

export default Highlighted;
