import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect, type FormEvent, type Dispatch, type SetStateAction } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";

import SearchLoading from "../shared/SearchLoading";

import API from "../../utils/configAPI";
import { decodedString } from "../../utils/utils";
import { MAILTO } from "../../utils/constants";
import type { PaperConfig, SearchResponseConfig } from "../../types/interface";

interface PaperSearchBarProps {
  getSearchList: Dispatch<SetStateAction<Array<PaperConfig>>>;
}

function PaperSearchBar({ getSearchList }: PaperSearchBarProps) {
  const navigator = useNavigate();
  const searchInput = useRef<HTMLInputElement>(null);
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
      const userInput = searchInput.current && searchInput.current.value;

      if (!userInput) {
        return;
      }

      const searchUrl =
        `${API.CROSSREF_WORKS_URL}?filter=type:journal-article,has-references:1` +
        `&query=${encodeURIComponent(userInput)}&mailto=${MAILTO}`;
      const response = await axios.get(searchUrl);

      if (response?.data?.status === "ok") {
        setIsLoading(false);
      }

      const responseItems = response?.data?.message?.items as Array<SearchResponseConfig>;
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
          title: decodedString(eachPaper?.title[0]) || "제목 정보 없음",
          references: eachPaper["references-count"],
          citations: eachPaper["is-referenced-by-count"],
          createdAt: eachPaper?.created?.["date-parts"]?.[0]?.join(".") || "출판일 정보 없음",
          containerTitle: eachPaper?.["container-title"]?.[0] || "저널 정보 없음",
          authors: authorList?.join(", ") || "저자 정보 없음"
        };
      });

      getSearchList(searchList);
    } catch (err) {
      navigator("/error");
    }
  }

  return (
    <div className="w-full pb-8 pl-8">
      <form
        onSubmit={(ev: FormEvent<HTMLFormElement>) => {
          ev.preventDefault();

          setIsSubmit(true);
        }}
        className="w-2/3 p-10"
      >
        <div className="flex flex-row gap-5 m-24">
          <input
            ref={searchInput}
            type="search"
            id="search"
            className="w-full p-4 pl-10 text-lg rounded-lg shadow-sm font-pretendard focus:outline-violet-400"
            placeholder="키워드를 검색하세요..."
            required
          />
          {isLoading ? (
            <SearchLoading />
          ) : (
            <button type="submit" className="px-6 py-2 text-base text-black w-50">
              <AiOutlineSearch className="size-28" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default PaperSearchBar;
