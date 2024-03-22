function FileUploader({ uploadFile }) {
  const handleFileChange = async (ev) => {
    const userUploadFile = ev.target.files[0];

    uploadFile(userUploadFile);
  };

  return (
    <input
      type="file"
      onChange={handleFileChange}
      className="m-auto text-18 file:px-20 file:py-5 file:rounded-full file:border-0 file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 w-300"
    />
  );
}

export default FileUploader;
