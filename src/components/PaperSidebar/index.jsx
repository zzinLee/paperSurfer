import { BsBook } from "react-icons/bs";
import { useParams } from "react-router-dom";

import { useCollectionStore } from "../../stores/collection";
import { usePaperListStore } from "../../stores/paper";
import Paper from "../Paper";

const CLASS_PAPER_SIDEBAR = "flex flex-col items-center h-full shadow-md bg-backgroundList min-w-220 font-nanumNeo";
const CLASS_NO_PAPER_LIST = "p-8 text-white text-14 font-nanumNeo";
const CLASS_COLLECTION_NAME =
  "p-8 m-10 text-white break-words rounded-md shadow-md min-w-130 bg-violet-500 font-nanumNeo";

function PaperSidebar() {
  const { collectionId } = useParams();
  const { collectionList } = useCollectionStore();
  const { paperList } = usePaperListStore();
  const currentCollection = collectionList.find((paper) => Number(collectionId) === paper.key);
  const currentPaperList = paperList[collectionId];
  const paperListElements =
    currentPaperList &&
    currentPaperList.map((paper) => (
      <li key={paper.doi}>
        <Paper paper={paper} />
      </li>
    ));
  const isPaperListExist = paperListElements?.length;

  return (
    <section className={CLASS_PAPER_SIDEBAR}>
      <div className="w-full text-center">
        <div className={CLASS_COLLECTION_NAME}>
          <BsBook className="inline mr-4" />
          {currentCollection?.collectionName || "컬렉션 제목 내용 없음"}
        </div>
        <ul>
          {isPaperListExist ? paperListElements : <li className={CLASS_NO_PAPER_LIST}>등록된 논문이 없습니다.</li>}
        </ul>
      </div>
    </section>
  );
}

export default PaperSidebar;
