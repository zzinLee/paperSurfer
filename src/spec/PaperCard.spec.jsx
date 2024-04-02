import { describe, beforeEach, it, vi } from "vitest";
import { render, screen, cleanup, waitFor, act, fireEvent } from "@testing-library/react";

import useCollectionStore from "../stores/collection";
import usePaperStore from "../stores/paper";
import useChartStore from "../stores/chart";

import PaperCard from "../components/PaperCard";

import { decodedString } from "../utils/utils";

const eachPaper = {
  DOI: "10.1007/bf00133961",
  title: ["Enantioselective esterification of ibuprofen in supercritical carbon dioxide by immobilized lipase"],
  "is-referenced-by-count": 37,
  created: {
    "date-parts": [[2004, 11, 5]],
    "date-time": "2004-11-05T11:02:25Z",
    timestamp: 1099652545000
  },
  author: [
    {
      given: "Markku",
      family: "Rantakyl�",
      sequence: "first",
      affiliation: []
    },
    {
      given: "Olli",
      family: "Aaltonen",
      sequence: "additional",
      affiliation: []
    }
  ],
  URL: "http://dx.doi.org/10.1007/bf00133961",
  "container-title": ["Biotechnology Letters"],
  "references-count": 23
};

const rawAuthorList = eachPaper.author;
const authorList =
  rawAuthorList &&
  rawAuthorList.filter((author) => author.family && author.given).map((author) => `${author.family} ${author.given}`);

const mockPaper = {
  doi: eachPaper.DOI,
  url: eachPaper.URL,
  title: decodedString(eachPaper?.title[0]) || "제목 정보 없음",
  references: eachPaper["references-count"],
  citations: eachPaper["is-referenced-by-count"],
  createdAt: eachPaper?.created?.["date-parts"]?.[0]?.join(".") || "출판일 정보 없음",
  containerTitle: eachPaper?.["container-title"]?.[0] || "저널 정보 없음",
  authors: authorList?.join(", ") || "저자 정보 없음"
};

describe("[PaperCard Component] 단위 테스트", () => {
  beforeEach(() => {
    sessionStorage.clear();

    const initialCollectionState = useCollectionStore.getState();
    const initilalPaperState = usePaperStore.getState();
    const initialChartState = useChartStore.getState();

    useCollectionStore.setState(initialCollectionState);
    usePaperStore.setState(initilalPaperState);
    useChartStore.setState(initialChartState);

    render(<PaperCard paper={mockPaper} />);
  });

  afterEach(() => {
    const { deleteAllCollection } = useCollectionStore.getState();
    const { deleteAllPaper } = usePaperStore.getState();
    const { deleteAllChart } = useChartStore.getState();

    deleteAllCollection();
    deleteAllPaper();
    deleteAllChart();

    sessionStorage.clear();

    cleanup();
  });

  it("(1) papercard에 올바른 값들이 렌더링 되어야 합니다.", () => {
    expect(
      screen.getByText(
        "Enantioselective esterification of ibuprofen in supercritical carbon dioxide by immobilized lipase"
      )
    ).toBeInTheDocument();
    expect(screen.getByText("Biotechnology Letters")).toBeInTheDocument();
    expect(screen.getByText("23개의 참고문헌")).toBeInTheDocument();
    expect(screen.getByText("37번의 인용")).toBeInTheDocument();
    expect(screen.getByText("2004.11.5")).toBeInTheDocument();
  });

  it("(2) 논문을 보러 갈 수 있는 링크가 제대로 작동합니다.", () => {
    const windowOpenSpy = vi.spyOn(window, "open").mockImplementation();
    const linkElem = screen.getByText("논문 보러 가기 ↗");

    fireEvent.click(linkElem);

    expect(windowOpenSpy).toHaveBeenCalledWith("http://dx.doi.org/10.1007/bf00133961", "_blank", "noopener, noreferrer");

    windowOpenSpy.mockRestore();
  });
});
