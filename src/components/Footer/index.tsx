function Footer() {
  return (
    <footer className="bg-slate-50">
      <div className="w-full max-w-screen-xl mx-auto md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a href="https://papersurfer.zzinlee.dev" className="flex items-center mb-4 sm:mb-0 space-x-3">
            <img src="/assets/papersurferLogo.png" className="w-60" alt="PaperSurfer 로고" />
            <span className="self-center text-xl whitespace-nowrap">PaperSurfer</span>
          </a>
          </div>
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center">
          Copyright © 2024{" "}
          <a href="https://papersurfer.zzinlee.dev" className="hover:underline">
            PaperSurfer
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
