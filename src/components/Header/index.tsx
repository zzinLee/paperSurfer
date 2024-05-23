import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <img src="/assets/papersurferHome.png" className="absolute w-200 top-1 left-2"></img>
      <nav className="relative z-10 font-pretendard">
        <ul className="flex flex-row-reverse w-screen shadow-md min-h-72 text-22">
          <Link to="/file">
            <li className="py-10 my-10 border-l-2 px-28">PDF Viewer</li>
          </Link>
          <Link to="/">
            <li className="py-10 my-10 px-28">HOME</li>
          </Link>
          <li className="px-32 py-10 my-10 font-semibold border-r-2 text-16">Enjoy your paperSurfing!</li>
        </ul>
      </nav>
    </>
  );
}

export default Header;
