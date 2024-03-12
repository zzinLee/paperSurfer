import { BsBook } from "react-icons/bs";
import { useParams } from "react-router-dom";

import { useCollectionStore } from "../../stores/collection";
import { usePaperListStore } from "../../stores/paper";

const CLASS_PAPER_LIST = "m-8 p-8 truncate text-14 font-nanumNeo rounded-md shadow-md bg-white hover:bg-gray-200";
const CLASS_PAPER_SIDEBAR = "flex flex-col items-center h-full shadow-md bg-backgroundList w-220 font-nanumNeo";
const CLASS_NO_PAPER_LIST = "p-8 text-white text-14 font-nanumNeo";
const CLASS_COLLECTION_NAME = "p-8 m-10 text-white break-words rounded-md shadow-md min-w-130 bg-violet-500";

function PaperSidebar() {
  const { collectionId } = useParams();
  const { collectionList } = useCollectionStore();
  const papers = usePaperListStore();
  const currentCollection = collectionList.find((paper) => Number(collectionId) === paper.key);
  const paperList = papers[collectionId];
  const paperListElements =
    paperList &&
    paperList.map((paper) => (
      <li
        className={CLASS_PAPER_LIST}
        key={paper.doi}
      >
        {paper.title}
      </li>
    ));

  return (
    <section className={CLASS_PAPER_SIDEBAR}>
      <div className="w-full text-center">
        <div className={CLASS_COLLECTION_NAME}>
          <BsBook className="inline mr-4" />
          {currentCollection?.collectionName || "컬렉션 제목 내용 없음"}
        </div>
        <ul>
          {paperList ? paperListElements : <li className={CLASS_NO_PAPER_LIST}>등록된 논문이 없습니다.</li>}
        </ul>
      </div>
    </section>
  );
}

export default PaperSidebar;
