import PaperCard from "../PaperCard";

function PaperSearchList({ searchList }) {
  const paperCardList = searchList.map(
    (card) => <li key={card.doi}><PaperCard paper={card} /></li>
  );

  return (
    <ul className="p-10 pt-20 overflow-scroll">{paperCardList}</ul>
  );
}

export default PaperSearchList;
