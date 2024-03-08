function Header() {
  return (
    <nav className="relative z-10 flex items-center justify-between shadow-md">
      <div>
        <img
          src="/assets/papersurferHome.png"
          className="w-200"
        ></img>
      </div>
      <div className="text-xl text-center px-30">안녕하세요 연구원님!</div>
    </nav>
  );
}

export default Header;
