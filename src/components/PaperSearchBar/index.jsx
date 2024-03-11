import { useRef } from "react";
import axios from "axios";

import API from "../../utils/configAPI";

function PaperSearchBar({ isLoading, setIsLoading, getSearchList }) {
  const searchInput = useRef(null);

  async function submitSearchForm(ev) {
    ev.preventDefault();

    if (isLoading) return;

    setIsLoading(true);

    try {
      const userInput = searchInput.current.value;
      const response = await axios.get(
        `${API.CROSSREF_WORKS_URL}?filter=type:journal-article&sample=20&query=${encodeURIComponent(userInput)}`
      );

      if (response?.data?.status === "ok") {
        setIsLoading(false);
      }

      const responseItems = response?.data?.message?.items;
      const searchList = responseItems.map((eachPaper) => {
        const rawAuthorList = eachPaper.author;
        const authorList =
          rawAuthorList &&
          rawAuthorList
            .filter((author) => author.family && author.given)
            .map((author) => `${author.family} ${author.given}`);

        return {
          doi: eachPaper.DOI,
          url: eachPaper.URL,
          title: eachPaper.title,
          references: eachPaper["reference-count"],
          citations: eachPaper["is-referenced-by-count"],
          createdAt: eachPaper?.created["date-parts"],
          containerTitle: eachPaper["container-title"],
          authors: authorList?.join(", ")
        };
      });

      getSearchList(searchList);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <form onSubmit={submitSearchForm} className="w-1/2 p-10">
      <label htmlFor="search">
        <h1 className="m-4 text-xl font-extrabold font-nanumNeo">논문 검색</h1>
      </label>
      <div className="flex flex-row gap-5">
        <input
          ref={searchInput}
          type="search"
          id="search"
          className="w-full p-4 pl-10 text-lg rounded-lg shadow-sm h-1/12"
          placeholder="DOI, 제목, 또는 키워드를 검색하세요..."
          required
        />
        <button
          type="submit"
          className="px-4 py-2 text-base text-white rounded-lg shadow-sm bg-sora font-pretendard hover:bg-purpleGray hover:shadow-md"
        >
          Search
        </button>
      </div>
    </form>
  );
}

export default PaperSearchBar;
