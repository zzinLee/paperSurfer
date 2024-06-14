import Paper from "../Paper";
import useCollectionStore from "../../stores/collection";
import usePaperStore from "../../stores/paper";
import useCollectionId from "../../hooks/useCollectionId";

import type { PaperCollectionConfig } from "../../types/interface";

function PaperSidebar() {
  const collectionId = useCollectionId();
  const { collection } = useCollectionStore();
  const { paperCollection } = usePaperStore() as { paperCollection: PaperCollectionConfig };
  const currentCollectionName = collection[collectionId];
  const currentPaperCollection = paperCollection[collectionId];
  const paperListElements =
    currentPaperCollection &&
    currentPaperCollection.map((paper) => (
      <li key={paper.doi}>
        <Paper paper={paper} />
      </li>
    ));
  const isPaperListExist = paperListElements?.length > 0;

  return (
    <aside className="flex flex-col items-center h-full overflow-auto shadow-sm max-w-220 min-w-220 font-nanumNeo bg-stone-50 text-15">
      <div className="w-full text-center break-words">
        <div className="p-10 border border-r-0 border-l-0 border-t-0 border-b-2 border-stone-200">
          {currentCollectionName || "제목 내용 없음"}
        </div>
        <ul>
          {isPaperListExist ? (
            paperListElements
          ) : (
            <li className="p-8 text-black-100 text-14 text-slate-700">등록된 논문이 없습니다.</li>
          )}
        </ul>
      </div>
    </aside>
  );
}

export default PaperSidebar;
