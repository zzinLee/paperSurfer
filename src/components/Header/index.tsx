import { Link } from "react-router-dom";
import { IoHomeSharp } from "react-icons/io5";
import { FaFilePdf } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";


function Header() {
  return (
    <nav className="flex flex-row justify-between border-b-gray-200 border">
      <img src="/assets/papersurferHome.png" className="h-68"></img>
      <ul className="flex items-center mr-52 gap-12">
        <Link to="/file">
          <li className="inline-flex items-center gap-4 py-8 px-12 rounded-full hover:bg-slate-100 text-center font-semibold cursor-default">
            <FaFilePdf size="18" />
            PDF Viewer
          </li>
        </Link>
        <Link to="/">
          <li className="inline-flex items-center gap-4 py-8 px-12 rounded-full hover:bg-slate-100 text-center font-semibold cursor-default">
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
