import { useState } from "react";
import { Link } from "react-router-dom";
import { IoHomeSharp } from "react-icons/io5";
import { FaFilePdf } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

type ToggleState = "PDFViewer" | "Home";

function Header() {
  const [pageState, setPageState] = useState<ToggleState>("Home");
  const handleViewerClick = () => {
    setPageState("PDFViewer");
  };
  const handleHomeClick = () => {
    setPageState("Home");
  };

  const [pdfButtonBgColor, homeButtonBgColor] = pageState === "PDFViewer" ? ["bg-black", ""] : ["", "bg-black"];
  const [pdfButtonTextColor, homeButtonTextColor] = pageState === "PDFViewer" ? ["text-white", ""] : ["", "text-white"];

  return (
    <nav className="flex flex-row justify-between border-b-gray-200 border">
      <Link to="/">
        <img src="/assets/papersurferHome.png" className="h-68" />
      </Link>
      <ul className="flex items-center mr-52 gap-12">
        <Link to="/file">
          <li
            className={`inline-flex items-center gap-4 py-8 px-12 rounded-md text-center cursor-default ${pdfButtonBgColor} ${pdfButtonTextColor}`}
            onClick={handleViewerClick}
          >
            <FaFilePdf size="18" />
            PDF VIEWER
          </li>
        </Link>
        <Link to="/">
          <li
            className={`inline-flex items-center gap-4 py-8 px-12 rounded-md text-center cursor-default ${homeButtonBgColor} ${homeButtonTextColor}`}
            onClick={handleHomeClick}
          >
            <IoHomeSharp size="18" />
            HOME
          </li>
        </Link>
        <a href="https://github.com/zzinLee/paperSurfer">
          <li className="hover:bg-slate-100 rounded-full p-10 cursor-default">
            <FaGithub size="18" color="grey" />
          </li>
        </a>
      </ul>
    </nav>
  );
}

export default Header;
