import type { PaperConfig } from "../../types/interface.ts";

interface TableRowProps {
  paper: PaperConfig;
}

function TableRow({ paper }: TableRowProps) {
  return (
    <tr className="bg-white border-b">
      <th scope="row" className="w-1/4 p-8 font-extrabold text-gray-900">
        {paper.title}
      </th>
      <td className="w-2/12 px-2 py-8">{paper.authors}</td>
      <td className="w-1/12 px-2 py-8">{paper.createdAt}</td>
      <td className="w-2/12 px-2 py-8">{paper.containerTitle}</td>
      <td className="px-2 py-8">{paper.citations}</td>
      <td className="w-1/12 py-8 pr-8">{paper.doi}</td>
    </tr>
  );
}

export default TableRow;
