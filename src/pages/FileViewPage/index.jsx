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
          className="absolute px-20 py-5 font-semibold border-0 rounded-full right-30 bg-violet-50 text-violet-700 hover:bg-violet-100 top-90"
          onClick={clickReset}
        >
          재선택
        </button>
      )}
    </>
  );
}

export default FileViewPage;
