import { useParams } from "react-router-dom";

import Paper from "../Paper";

import { useCollectionStore } from "../../stores/collection";
import { usePaperStore } from "../../stores/paper";

function PaperSidebar() {
  const { collectionId } = useParams();
  const { collection } = useCollectionStore();
  const { paperCollection } = usePaperStore();
  const currentCollectionName = collection[collectionId];
  const currentPaperCollection = paperCollection[collectionId];
  const paperListElements =
    currentPaperCollection &&
    currentPaperCollection.map((paper) => (
      <li key={paper.doi}>
        <Paper paper={paper} />
      </li>
    ));
  const isPaperListExist = paperListElements?.length;

  return (
    <aside className="flex flex-col items-center h-full overflow-auto min-w-220 font-nanumNeo bg-violet-50">
      <div className="w-full text-center break-words">
        <div className="p-8 m-10 text-white rounded-sm min-w-130 bg-violet-700">
          {currentCollectionName || "제목 내용 없음"}
        </div>
        <ul>
          {isPaperListExist ? paperListElements : <li className="p-8 text-14">등록된 논문이 없습니다.</li>}
        </ul>
      </div>
    </aside>
  );
}

export default PaperSidebar;
