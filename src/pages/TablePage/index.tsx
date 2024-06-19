import { useNavigate } from "react-router-dom";
import { RiArrowGoBackLine } from "react-icons/ri";

import TableRow from "../../components/TableRow";
import ErrorPage from "../ErrorPage";

import useCollectionId from "../../hooks/useCollectionId";
import usePaperStore from "../../stores/paper";
import useCollectionStore from "../../stores/collection";

function TablePage() {
  const navigator = useNavigate();
  const { collection } = useCollectionStore();
  const { paperCollection } = usePaperStore();
  const collectionId = useCollectionId();
  const paperList = paperCollection[collectionId];
  const isTableDataExist = paperList?.length > 0;

  if (!isTableDataExist) {
    const message = "출력할 수 있는 정보가 없습니다.";

    return <ErrorPage message={message} />;
  }

  const tableRowElemList = paperList.map((paper) => <TableRow key={paper.doi} paper={paper} />);

  return (
    <div className="relative content-center m-auto h-full">
      <button
        className="flex flex-row gap-4 absolute px-8 py-2 items-center text-white rounded-full shadow-xl hover:bg-indigo-700 text-18 top-30 right-30 bg-slate-700"
        onClick={() => navigator(-1)}
      >
        <RiArrowGoBackLine size="18" />
        뒤로가기
      </button>
      <div className="relative mx-10 overflow-x-auto font-nanumNeo">
        <h1 className="py-10 text-center text-white bg-black">{collection[collectionId]}</h1>
        <table className="w-full text-sm text-left text-gray-500 rtl:text-right">
          <thead className="p-10 text-gray-700 uppercase text-md bg-gray-50">
            <tr className="p-8">
              <th scope="col" className="w-1/4 p-8 font-extrabold text-gray-900">
                제목
              </th>
              <th scope="col" className="w-2/12 px-2 py-8">
                저자
              </th>
              <th scope="col" className="w-1/12 px-2 py-8">
                출판일
              </th>
              <th scope="col" className="w-2/12 px-2 py-8">
                저널명
              </th>
              <th scope="col" className="w-1/12 px-8 py-8">
                인용횟수
              </th>
              <th scope="col" className="w-1/12 py-8 pr-8">
                DOI
              </th>
            </tr>
          </thead>
          <tbody>{tableRowElemList}</tbody>
        </table>
      </div>
    </div>
  );
}

export default TablePage;
