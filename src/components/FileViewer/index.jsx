import { useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = "//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

function FileViewer({ pdfFile }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const prevPage = (ev) => {
    ev.preventDefault();

    if (pageNumber > 1) {
      setPageNumber(pageNumber-1);
    }
  };

  const nextPage = (ev) => {
    ev.preventDefault();

    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  return (
    <div className="m-auto font-nanumNeo">
      <div className="font-bold text-zinc-700">
        Page {pageNumber} of {numPages}
      </div>
      <div>
        <div className="flex flex-row items-center">
          <button className="p-8 text-white rounded-full shadow-xl text-32 bg-zinc-800 hover:bg-violet-700">
            <AiOutlineArrowLeft onClick={prevPage} />
          </button>
          <div className="w-[595px] h-[782px]">
            <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
              <Page pageNumber={pageNumber} />
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
