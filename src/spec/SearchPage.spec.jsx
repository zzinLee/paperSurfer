import axios from "axios";
import { describe, beforeEach, it, vi } from "vitest";
import { render, fireEvent, screen, cleanup, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import App from "../App";
import useCollectionStore from "../stores/collection";
import usePaperStore from "../stores/paper";
import { searchMockData } from "../mocks/json/search_mock.json";

vi.mock("axios");

describe("[SearchPage] 테스트", () => {
  beforeEach(async () => {
    sessionStorage.clear();

    const initialCollectionState = useCollectionStore.getState();
    const initilalPaperState = usePaperStore.getState();

    const key = Date.now();
    const name = "테스트 문서";

    useCollectionStore.setState({ ...initialCollectionState, collection: { [key] : name } });
    usePaperStore.setState(initilalPaperState);

    axios.get.mockResolvedValue({
      data: searchMockData
    });

    render(
      <MemoryRouter initialEntries={[`/${key}/search`]}>
        <App />
      </MemoryRouter>
    );
  });

  afterEach(() => {
    const { deleteAllCollection } = useCollectionStore.getState();
    const { deleteAllPaper } = usePaperStore.getState();

    deleteAllCollection();
    deleteAllPaper();
    sessionStorage.clear();

    cleanup();
  });

  it("(1) 검색하기 버튼을 눌렀을 때 예상한 API 가 호출되는지 확인합니다.", async () => {
    const searchButton = document.querySelector("button[type='submit']");
    fireEvent.click(searchButton);

    waitFor(async () => {
      await expect(axios.get).toHaveBeenCalledWith(
        "https://api.crossref.org/works?filter=type:journal-article,has-references:1&sample=20&query=lipase%20esterification&select=DOI,title,is-referenced-by-count,created,author,URL,container-title,references-count&mailto=sujin951017@gmail.com"
      );
    })

  });
});
