import { useState, useRef, useEffect } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { BiHighlight } from "react-icons/bi";
import { Document, Page, pdfjs } from "react-pdf";
import { escapeRegExp } from "lodash";

import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = "//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

function FileViewer({ pdfFile }) {
  const pdfContainerElem = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [pdfContainer, setPdfContainer] = useState(null);
  const [highlightElemList, setHighlightElemList] = useState([]);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const prevPage = (ev) => {
    ev.preventDefault();

    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const nextPage = (ev) => {
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
      const pdfContainerRect = pdfContainerElem.current.getBoundingClientRect();

      setPdfContainer(pdfContainerRect);
    }
  }, [scrollY]);

  const highlightText = (ev) => {
    ev.preventDefault();

    const drag = window.getSelection();
    const range = drag.getRangeAt(0);
    const targetString = drag.toString();
    const { top, left, width, height } = range.getBoundingClientRect();

    const dragElem = {
      targetString,
      left: left - pdfContainer.left,
      top: top - pdfContainer.top + scrollY,
      width,
      height
    };

    setHighlightElemList([...highlightElemList, dragElem]);
  };

  const clearHighlight = (ev) => {
    ev.preventDefault();

    setHighlightElemList([]);
  };

  const customTextRenderer = (textItem) => {
    if (!textItem) return;

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
        (text) => `<span style="background-color: rgba(239, 223, 0, 0.5);">${text}<span>`
      );
    } else {
      return textItem.str;
    }
  };

  return (
    <div className="m-auto font-nanumNeo">
      <div className="font-bold text-zinc-700">
        페이지 {pageNumber} / {numPages}
      </div>
      <div>
        <div className="flex flex-row items-center">
          <button className="absolute z-30 p-8 text-white rounded-full shadow-xl bg-violet-700 text-32 top-150">
            <BiHighlight className="size-28" onClick={highlightText} />
          </button>
          <button
            className="absolute p-5 font-semibold border-0 rounded-full w-170 right-30 bg-violet-50 text-violet-700 hover:bg-violet-100 top-140 text-15"
            onClick={clearHighlight}
          >
            하이라이터 지우기
          </button>
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
