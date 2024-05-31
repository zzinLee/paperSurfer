import { describe, beforeEach, it } from "vitest";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import App from "../App";
import useCollectionStore from "../stores/collection";
import usePaperStore from "../stores/paper";
import useChartStore from "../stores/chart";

describe("[TablePage] 테스트", () => {
  beforeEach(async () => {
    sessionStorage.clear();

    const initialCollectionState = useCollectionStore.getState();
    const initilalPaperState = usePaperStore.getState();
    const initialChartState = useChartStore.getState();

    const key = "testKey";
    const name = "testDocument";

    useCollectionStore.setState({ ...initialCollectionState, collection: { [key]: name } });
    usePaperStore.setState(initilalPaperState);
    useChartStore.setState(initialChartState);
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

  it("(1) 조회된 데이터가 없다면, 에러 페이지로 이동합니다", async () => {
    render(
      <MemoryRouter initialEntries={["/testKey/table"]}>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByText("출력할 수 있는 정보가 없습니다.")).toBeInTheDocument();
    });
  });

  it("(2) 조회된 데이터가 있다면, 조회된 데이터가 존재하는 테이블을 렌더링 합니다.", async () => {
    const initilalPaperState = usePaperStore.getState();

    const paper1 = {
      doi: "10.1111/j.1432-1033.1989.tb14518.x",
      url: "http://dx.doi.org/10.1111/j.1432-1033.1989.tb14518.x",
      title: "Structural features of lipoprotein lipase",
      references: 49,
      citations: 113,
      createdAt: "2005.3.4",
      containerTitle: "European Journal of Biochemistry",
      author: "PERSSON Bengt, BENGTSSON-OLIVECRONA Gunilla, ENERBÄCK Sven, OLIVECRONA Thomas, JÖRNVALL Hans"
    };

    const paper2 = {
      doi: "10.5352/jls.2003.13.5.723",
      url: "http://dx.doi.org/10.5352/jls.2003.13.5.723",
      title: "Investigation of Conserved Regions in Lipase Genes",
      references: 25,
      citations: 0,
      createdAt: "2010.9.9",
      containerTitle: "Journal of Life Science",
      author: "저자 정보 없음"
    };

    usePaperStore.setState({
      ...initilalPaperState,
      paperCollection: {
        testKey: [paper1, paper2],
      },
    });

    const { container } = render(
      <MemoryRouter initialEntries={["/testKey/table"]}>
        <App />
      </MemoryRouter>
    );

    const trElems = container.getElementsByTagName("tr");
    const thElems = container.getElementsByTagName("th");

    await waitFor(() => {
      expect(trElems.length).toBe(3);
      expect(thElems.length).not.toBe(0);
      expect(screen.getByText("Structural features of lipoprotein lipase")).toBeInTheDocument();
      expect(screen.getByText("Investigation of Conserved Regions in Lipase Genes")).toBeInTheDocument();
    });

  });
});
