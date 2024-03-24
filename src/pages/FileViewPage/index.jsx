import { useState } from "react";

import FileUploader from "../../components/FileUploader";
import FileViewer from "../../components/FileViewer";

function FileViewPage() {
  const [selectedFile, setSelectedFile] = useState(null);

  const clickReset = () => {
    setSelectedFile(null);
  };

  return (
    <>
      {!selectedFile && <FileUploader uploadFile={setSelectedFile} />}
      {selectedFile && <FileViewer pdfFile={selectedFile} />}
      {selectedFile && (
        <button
          className="absolute px-20 py-5 font-semibold text-red-700 border-0 rounded-full right-30 bg-red-50 hover:bg-red-100 top-90 font-nanumNeo"
          onClick={clickReset}
        >
          파일 재선택
        </button>
      )}
    </>
  );
}

export default FileViewPage;
