import type { Dispatch, SetStateAction } from "react";
import type { ChangeEvent } from "react";

interface FileUploaderProps {
  uploadFile: Dispatch<SetStateAction<File | null>>;
}

function FileUploader({ uploadFile }: FileUploaderProps) {
  const handleFileChange = async (ev: ChangeEvent<HTMLInputElement>) => {
    const uploadFileList = ev.target.files as FileList;
    const userUploadFile = uploadFileList[0];

    uploadFile(userUploadFile);
  };

  return (
    <input
      type="file"
      accept=".pdf"
      onChange={handleFileChange}
      className="m-auto text-18 file:px-20 file:py-5 file:rounded-full file:border-0 file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 w-300"
    />
  );
}

export default FileUploader;
