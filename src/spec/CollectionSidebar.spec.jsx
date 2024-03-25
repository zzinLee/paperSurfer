import { describe, beforeEach, afterEach, it } from "vitest";
import { render, fireEvent, screen, cleanup, waitFor, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import CollectionSidebar from "../components/CollectionSidebar";
import useCollectionStore from "../stores/collection";

describe("[Collection Sidebar Component] 단위 테스트", () => {
  beforeEach(() => {
    const initialState = useCollectionStore.getState();
    useCollectionStore.setState(initialState);

    sessionStorage.clear();

    render(
      <MemoryRouter>
        <CollectionSidebar />
      </MemoryRouter>
    );
  });

  afterEach(() => {
    const { deleteAllCollection } = useCollectionStore.getState();
    deleteAllCollection();
    sessionStorage.clear();

    cleanup();
  });

  it("(1) 사이드 바 첫 렌더링 시 새로운 문서를 추가할 수 있는 버튼이 렌더링 됩니다.", () => {
    expect(screen.getByText("새로운 문서")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("(2) 새로운 문서 추가 버튼을 누르면, 새로운 문서를 입력할 수 있는 입력 폼이 렌더링 됩니다.", () => {
    fireEvent.click(screen.getByText("새로운 문서"));

    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("문서 이름을 입력하세요")).toBeInTheDocument();
    expect(screen.queryByRole("listitem")).toBeNull();
  });

  it("(3) 입력 폼에서 \'테스트 문서 200\' 를 입력하여 제출하면 사이드바에 같은 이름의 리스트 컴포넌트가 생성됩니다.", () => {
    fireEvent.click(screen.getByText("새로운 문서"));

    const inputElement = screen.getByRole("textbox");
    fireEvent.change(inputElement, { target: { value: "테스트 문서 200" } });

    const submitButton = screen.getByRole("button", { name: "제출" });
    fireEvent.click(submitButton);

    const listItem = screen.getByRole("listitem");
    expect(listItem).toBeInTheDocument();
    expect(listItem).toHaveTextContent("테스트 문서 200");
  });

  it("(4) 렌더링 된 리스트 아이템이 여러개일 때, 삭제 버튼을 누르면 해당 아이템만 리스트에서 삭제됩니다.", () => {
    fireEvent.click(screen.getByText("새로운 문서"));
    const inputElement = screen.getByRole("textbox");
    const submitButton = screen.getByRole("button", { name: "제출" });

    act(async () => {
      for (let repeat = 0; repeat < 3; repeat++) {
        fireEvent.change(inputElement, { target: { value: `테스트 문서_${repeat}` } });
        fireEvent.click(submitButton);
      }

      await waitFor(() => {
        const listItemList = screen.getAllByRole("listitem");

        expect(listItemList.length).toBe(3);

        const expectedTexts = ["테스트 문서_0", "테스트 문서_1", "테스트 문서_2"];
        listItemList.forEach((item, index) => {
          expect(item).toHaveTextContent(expectedTexts[index]);
        });
      });
    });
  });
});

