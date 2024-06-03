import { useState, useRef, useEffect, type MouseEvent } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { BiHighlight } from "react-icons/bi";
import { Document, Page, pdfjs } from "react-pdf";
import { escapeRegExp } from "lodash";

import Highlighted from "../Highlighted";

import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import type { TextItem } from "pdfjs-dist/types/src/display/api.d.ts";
import type { DragElemConfig } from "../../types/interface";

pdfjs.GlobalWorkerOptions.workerSrc = "//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

interface FileViewerInterace {
  pdfFile: File;
}

function FileViewer({ pdfFile }: FileViewerInterace) {
  const pdfContainerElem = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState<number>(0);
  const [pdfContainer, setPdfContainer] = useState<null | DOMRect>(null);
  const [highlightElemList, setHighlightElemList] = useState<DragElemConfig[]>([]);
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const prevPage = (ev: MouseEvent<SVGElement>) => {
    ev.preventDefault();

    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const nextPage = (ev: MouseEvent<SVGAElement>) => {
    ev.preventDefault();

    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (pdfContainerElem) {
      const pdfContainerRect =
        pdfContainerElem.current && pdfContainerElem.current.getBoundingClientRect();

      setPdfContainer(pdfContainerRect);
    }
  }, [scrollY]);

  const highlightText = (ev: MouseEvent<SVGElement>) => {
    ev.stopPropagation();

    const drag = window.getSelection();

    if (!drag) return;

    const range = drag.getRangeAt(0);
    const targetString = drag.toString();

    if (!targetString) return;

    const { top, left, width, height } = range.getBoundingClientRect();

    if (!pdfContainer) return;

    const dragElem = {
      targetString,
      left: left - pdfContainer.left,
      top: top - pdfContainer.top,
      width,
      height,
      id: `${targetString}_${height}`
    };

    setHighlightElemList([...highlightElemList, dragElem]);
  };

  const clearHighlight = (ev: MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();

    setHighlightElemList([]);
  };

  const customTextRenderer = (textItem: TextItem) => {
    if (!textItem) return "";
    if (!pdfContainer) return "";

    const textWidth = textItem.width;
    const textHeight = textItem.height;
    const textTranslationX = textItem.transform[4];
    const textTranslationY = textItem.transform[5];

    const highlightedText =
      highlightElemList
        .filter((dragElem) => {
          const { left: dragLeft, top: dragTop, width: dragWidth, height: dragHeight } = dragElem;
          const isOverlapped =
            dragLeft + dragWidth >= textTranslationX &&
            dragLeft <= textTranslationX + textWidth &&
            dragTop + dragHeight >= pdfContainer.height - textTranslationY &&
            dragTop <= pdfContainer.height - textTranslationY + textHeight;

          return isOverlapped;
        })
        .map((dragElem) => dragElem.targetString)?.[0];

    if (highlightedText) {
      const regexPattern = new RegExp(escapeRegExp(`${highlightedText}`));

      return textItem.str.replace(
        regexPattern,
        (text: string) => `<span style="background-color: rgba(239, 223, 0, 0.4);">${text}<span>`
      );
    } else {
      return textItem.str;
    }
  };

  const highlightedElements = highlightElemList.map((elem) => (
    <Highlighted key={elem.id} elem={elem} resetElemList={setHighlightElemList} elemList={highlightElemList} />
  ));

  const isHighlightedElemntsExist = highlightElemList && highlightElemList.length > 0;

  return (
    <div className="m-auto font-nanumNeo">
      <div className="font-bold text-zinc-700">
        페이지 {pageNumber} / {numPages}
      </div>
      <div>
        <div className="flex flex-row items-center">
          <button className="absolute z-30 p-8 text-white rounded-full shadow-xl text-32 top-150 bg-orange-400">
            <BiHighlight className="size-28" onClick={highlightText} />
          </button>
          <button
            className="absolute p-5 font-semibold border-0 rounded-full w-170 right-30 bg-violet-50 text-violet-700 hover:bg-violet-100 top-140 text-15"
            onClick={clearHighlight}
          >
            하이라이터 지우기
          </button>
          <ul className="absolute flex flex-col gap-2 p-5 font-semibold text-center right-30 text-16 top-200 max-w-250">
            {isHighlightedElemntsExist && <li className="text-slate-600 w-250">하이라이트 리스트</li>}
            {highlightedElements}
          </ul>
          <button className="p-8 text-white rounded-full shadow-xl text-32 bg-zinc-800 hover:bg-violet-700">
            <AiOutlineArrowLeft onClick={prevPage} />
          </button>
          <div className="w-[595px] h-[782px]" ref={pdfContainerElem}>
            <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
              <Page pageNumber={pageNumber} customTextRenderer={customTextRenderer} />
            </Document>
          </div>
          <button className="p-8 text-white rounded-full shadow-xl text-32 bg-zinc-800 hover:bg-violet-700">
            <AiOutlineArrowRight onClick={nextPage} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default FileViewer;
