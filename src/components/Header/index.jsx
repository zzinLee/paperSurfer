import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <img src="/assets/papersurferHome.png" className="absolute w-200 top-1 left-2"></img>
      <nav className="relative z-10 ">
        <ul className="flex flex-row-reverse w-screen shadow-md min-h-72 font-nanumNeo">
          <li className="py-10 my-10 border-l-2 px-42 ">연구원님 안녕하세요!</li>
          <Link to="/file">
            <li className="py-10 my-10 border-l-2 px-28">PDF Viewer</li>
          </Link>
          <Link to="/">
            <li className="py-10 my-10 px-28">홈으로</li>
          </Link>
        </ul>
      </nav>
    </>
  );
}

export default Header;
