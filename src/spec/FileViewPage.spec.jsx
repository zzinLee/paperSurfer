import { describe, beforeEach, it, afterEach } from "vitest";
import { render, screen, cleanup, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import FileViewPage from "../pages/FileViewPage";

describe("[File View Page] PDF 뷰어 페이지 테스트", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <FileViewPage />
      </MemoryRouter>
    );
  });

  afterEach(() => {
    cleanup();
  })

  it("(1) PDF 파일이 업로드 된 후, 해당 파일이 업로드 되고 올바른 렌더링을 진행하는지 확인합니다.", async () => {
    const fileInput = document.querySelector("input[type='file']");
    const mockupFile = new File(["test"], "document.pdf", { type: "application/pdf" });

    fireEvent.change(fileInput, { target: { files: [mockupFile] } });

    await waitFor(() => {
      expect(fileInput.files[0]).toBe(mockupFile);

      expect(screen.getByRole("button", { name: "하이라이터 지우기" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "파일 재선택" })).toBeInTheDocument();
    });
  });

  it("(2) 파일 재선택 클릭 후, 다시 파일 선택이 가능한지 확인합니다.", async () => {
    const fileInput = document.querySelector("input[type='file']");
    const mockupFile = new File(["test"], "document.pdf", { type: "application/pdf" });

    fireEvent.change(fileInput, { target: { files: [mockupFile] } });

    const resetButton = screen.getByRole("button", { name: "파일 재선택" });

    expect(document.querySelector("input[type='file']")).toBeNull();

    fireEvent.click(resetButton);

    await waitFor(() => {
      expect(document.querySelector("input[type='file']")).toBeInTheDocument();
    });
  });

});
