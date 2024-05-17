import PaperCard from "../PaperCard";
import { PaperInterface } from "../../utils/interface";

interface PaperSearchListProps {
  searchList: Array<PaperInterface>
}

function PaperSearchList({ searchList }: PaperSearchListProps) {
  const paperCardList = searchList.map((card) => (
    <li key={card.doi}>
      <PaperCard paper={card} />
    </li>
  ));

  return <ul className="p-10 pt-20 overflow-scroll">{paperCardList}</ul>;
}

export default PaperSearchList;
