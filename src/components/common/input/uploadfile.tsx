import { useState } from "react";
import * as XLSX from "xlsx";
import { AppContext } from "../../../appContext";
import ViewData from "../../view/view";
// const ACCEPTED_FILE_TYPES = [
//   "text/plain",
//   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

// ];
function UploadFIle() {
  const [fileData, setFileData] = useState<any>();

  const changeHandler = (event: any) => {
    const reader = new FileReader();
    const file = event.target.files[0];
    // console.log(
    //   "file",
    //   file,
    //   file.length,
    //   event.target.files,
    //   event.target.files.length
    // );
    reader.onload = async (e: any) => {
      const text = e.target.result;

      if (file.type) {
        if (file.type == "text/plain") {
          setFileData(JSON.parse(text));
        } else {
          const wb = XLSX.read(text, { type: "binary" });
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          const data: any = XLSX.utils.sheet_to_json(ws, {
            raw: false,
          });

          setFileData(data);
        }
      }
    };
    if (file.type) {
      if (file.type == "text/plain") {
        reader.readAsText(file);
      } else {
        reader.readAsBinaryString(file);
      }
    }
  };

  return (
    <>
      <div className="flex w-full items-center justify-center bg-grey-lighter p-10">
        <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
          <svg
            className="w-8 h-8"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
          </svg>
          <span className="mt-2 text-base leading-normal">Select a file</span>
          <input type="file" className="hidden" onChange={changeHandler} />
        </label>
      </div>

      <AppContext.Provider value={fileData}>
        <ViewData />
      </AppContext.Provider>
    </>
  );
}

export default UploadFIle;
