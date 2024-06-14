import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect, type FormEvent, type Dispatch, type SetStateAction } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";

import SearchLoading from "../shared/SearchLoading";

import API from "../../utils/configAPI";
import { formattingResponse, goErrorPage } from "../../utils/utils";
import { MAILTO } from "../../utils/constants";

import type { PaperConfig, SearchResponseConfig } from "../../types/interface";

interface PaperSearchBarProps {
  setSearchList: Dispatch<SetStateAction<PaperConfig[]>>;
}

function PaperSearchBar({ setSearchList }: PaperSearchBarProps) {
  const navigator = useNavigate();
  const searchInput = useRef<HTMLInputElement>(null);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isSubmit) {
      submitSearchForm();
      setIsSubmit(false);
    }

    async function submitSearchForm() {
      setIsLoading(true);

      try {
        const userInput = searchInput.current && searchInput.current.value;

        if (!userInput) return;

        const searchUrl =
          `${API.CROSSREF_WORKS_URL}?filter=type:journal-article,has-references:1` +
          `&query=${encodeURIComponent(userInput)}&mailto=${MAILTO}`;
        const response = await axios.get(searchUrl);

        if (response?.data?.status === "ok") {
          setIsLoading(false);
        }

        const responseItems = response?.data?.message?.items as SearchResponseConfig[];
        const searchList = responseItems.map(eachPaper => formattingResponse(eachPaper));

        setSearchList(searchList);
      } catch (err) {
        goErrorPage(navigator);
      }
    }
  }, [isSubmit, setSearchList, navigator]);

  return (
    <div className="w-full pb-8 pl-8">
      <form
        className="pr-[1em]"
        onSubmit={(ev: FormEvent<HTMLFormElement>) => {
          ev.preventDefault();

          setIsSubmit(true);
        }}
      >
        <div className="flex flex-row gap-5 m-24 justify-center items-center">
          <input
            ref={searchInput}
            type="search"
            id="search"
            disabled={isLoading}
            className="w-full p-2 pl-10 text-16 min-w-60 rounded-lg border border-slate-300 shadow-sm font-pretendard focus:outline-blue-600"
            placeholder="키워드를 검색하세요..."
            required
          />
          {isLoading ? (
            <SearchLoading />
          ) : (
            <button
              type="submit"
              className="flex flex-row justify-center items-center px-6 py-2 text-white text-18 min-w-fit bg-blue-600 rounded-md"
            >
              <AiOutlineSearch className="size-18" />
              검색
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default PaperSearchBar;
