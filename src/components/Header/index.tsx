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

  const [pdfButtonBgColor, homeButtonBgColor] = pageState === "PDFViewer" ? ["bg-slate-400", ""] : ["", "bg-slate-400"];
  const [pdfButtonTextColor, homeButtonTextColor] = pageState === "PDFViewer" ? ["text-white", ""] : ["", "text-white"];

  return (
    <nav className="flex flex-row justify-between items-center border-b-gray-200 border sm:p-4">
      <Link to="/">
        <img src="/assets/papersurferHome.png" className="ease-in-out h-[3.5rem] sm:h-[2.8rem] duration-100" />
      </Link>
      <ul className="flex items-center mr-[3rem] gap-[0.6rem] sm:text-[0.8rem] mb:mr-[0.5rem]">
        <Link to="/file">
          <li
            className={`flex justify-center items-center gap-4 py-6 px-8 rounded-md cursor-default ${pdfButtonBgColor} ${pdfButtonTextColor} sm:py-4`}
            onClick={handleViewerClick}
          >
            <FaFilePdf size="18" />
            <span className="mb:hidden">PDF VIEWER</span>
          </li>
        </Link>
        <Link to="/">
          <li
            className={`flex justify-center items-center gap-4 py-6 px-8 rounded-lg text-center cursor-default ${homeButtonBgColor} ${homeButtonTextColor} sm:py-4`}
            onClick={handleHomeClick}
          >
            <IoHomeSharp size="18" />
            <span className="mb:hidden">HOME</span>
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
