import { useRef, useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";

import Loading from "../../components/shared/Loading";

import API from "../../utils/configAPI";

function PaperSearchBar({ getSearchList }) {
  const searchInput = useRef(null);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isSubmit) {
      submitSearchForm();
      setIsSubmit(false);
    }
  }, [isSubmit]);


  async function submitSearchForm() {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const userInput = searchInput.current.value;
      const response = await axios.get(
        `${API.CROSSREF_WORKS_URL}?filter=type:journal-article,has-references:1&sample=20&query=${encodeURIComponent(userInput)}`
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
    <div className="relative w-full left-1/4">
      {isLoading && <Loading />}
      <form
        onSubmit={(ev) => {
          ev.preventDefault();

          setIsSubmit(true);
        }}
        className="w-1/2 p-10"
      >
        <label htmlFor="search">
          <h1 className="m-4 text-xl font-extrabold font-nanumNeo">논문 검색</h1>
        </label>
        <div className="flex flex-row gap-5">
          <input
            ref={searchInput}
            type="search"
            id="search"
            className="w-full p-4 pl-10 text-lg rounded-lg shadow-sm h-1/12 font-pretendard"
            placeholder="DOI, 제목, 또는 키워드를 검색하세요..."
            required
          />
          <button type="submit" className="p-8 text-base text-black rounded-full shadow-sm">
            <AiOutlineSearch className="text-30" />
          </button>
        </div>
      </form>
    </div>
  );
}

export default PaperSearchBar;
