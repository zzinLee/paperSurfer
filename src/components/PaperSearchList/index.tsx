import PaperCard from "../PaperCard";
import type { PaperConfig } from "../../types/interface";

interface PaperSearchListProps {
  searchList: PaperConfig[];
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
