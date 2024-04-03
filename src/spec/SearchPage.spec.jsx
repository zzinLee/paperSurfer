import axios from "axios";
import { describe, beforeEach, it, vi } from "vitest";
import { render, screen, cleanup, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import App from "../App";
import useCollectionStore from "../stores/collection";
import usePaperStore from "../stores/paper";
import useChartStore from "../stores/chart";
import searchMockData from "../mocks/json/search_mock.json";

const SEARCH_URI =
  "https://api.crossref.org/works?filter=type:journal-article,has-references:1&sample=20&query=lipase&select=DOI,title,is-referenced-by-count,created,author,URL,container-title,references-count&mailto=sujin951017@gmail.com";

vi.mock("axios", () => ({
  default: {
    get: vi.fn((url) => {
      if (url === SEARCH_URI) {
        return Promise.resolve({ data: searchMockData });
      }

      return Promise.reject(new Error("axios error"));
    }),
  }
}));

describe("[SearchPage] 테스트", () => {
  beforeEach(async () => {
    sessionStorage.clear();

    const initialCollectionState = useCollectionStore.getState();
    const initilalPaperState = usePaperStore.getState();
    const initialChartState = useChartStore.getState();

    const key = Date.now();
    const name = "테스트 문서";

    useCollectionStore.setState({ ...initialCollectionState, collection: { [key]: name } });
    usePaperStore.setState(initilalPaperState);
    useChartStore.setState(initialChartState);

    render(
      <MemoryRouter initialEntries={[`/${key}/search`]}>
        <App />
      </MemoryRouter>
    );
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

  it("(1) 검색하기 버튼을 누른 후 1) 예상한 API 가 호출, 2) 예상한 데이터 반환 후 3) 20개의 paperCard 컴포넌트가 렌더링 되어야 합니다.", async () => {
    const searchButton = document.querySelector("button[type='submit']");
    const inputElem = screen.getByPlaceholderText("키워드를 검색하세요...");

    fireEvent.change(inputElem, { target: { value: "lipase" } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(SEARCH_URI);
      expect(axios.get).toHaveReturnedWith({ data: searchMockData });
    });

    expect(screen.getAllByTestId("papercard")).toHaveLength(20);
  });

  it("(2) Paper Card에서 `이 문서에 추가`버튼을 누르면, paperSideBar에서 Paper컴포넌트가 올바르게 렌더링 되어야 합니다.", async () => {
    const searchButton = document.querySelector("button[type='submit']");
    const inputElem = screen.getByPlaceholderText("키워드를 검색하세요...");

    fireEvent.change(inputElem, { target: { value: "lipase" } });
    fireEvent.click(searchButton);

    let addDocumentButton = null;

    await waitFor(() => {
      expect(screen.queryByTestId("paper")).toBeNull();

      addDocumentButton = screen.getAllByText("이 문서에 추가")[0];
    });

    fireEvent.click(addDocumentButton);

    await waitFor(() => {
      expect(screen.getAllByTestId("paper")).toHaveLength(1);
      expect(screen.getByTestId("paper")).toBeInTheDocument();
    });
  });
});
