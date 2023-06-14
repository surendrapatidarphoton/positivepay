import { useMemo, useState } from "react";
import * as XLSX from "xlsx";
import { AppContext } from "../../../appContext";
import ViewData from "../../view/view";
import Preview from "../../view/preview";

function UploadFIle() {
  const [fileData, setFileData] = useState<any>([]);
  const [radioValue, setradioValue] = useState("comma");
  const [isFileData, setIsFileData] = useState(false);

  const handleChange = (e) => {
    setIsFileData(false);
    setFileData([]);
    setradioValue(e.target.value);
  };

  const viewData: any = useMemo(() => {
    let res = [];
    fileData.forEach((ele) => {
      if (radioValue == "comma") {
        res.push(ele.name + "," + ele.gender);
      } else if (radioValue == "pipeline") {
        res.push(ele.name + "|" + ele.gender);
      }
    });
    return res;
  }, [fileData, radioValue]);

  const changeHandler = (event: any) => {
    setIsFileData(false);
    // setFileData([]);
    const reader = new FileReader();
    const file = event.target.files[0];
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
      {/* <ViewFileformat /> */}

      <div className="flex justify-center items-center mt-4">
        <div className="m-2">File Format</div>
        <div className="m-2">
          <input
            id="comma"
            type="radio"
            value="comma"
            defaultChecked
            onChange={(e) => handleChange(e)}
            name="inline-radio-group"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="comma"
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Comma
          </label>
        </div>
        <div className="m-2">
          <input
            id="pipeline"
            type="radio"
            value="pipeline"
            name="inline-radio-group"
            onChange={(e) => handleChange(e)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="pipeline"
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Pipeline
          </label>
        </div>
      </div>
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

      <AppContext.Provider value={{ viewData: viewData, fileData: fileData }}>
        <Preview />
        <div className="flex justify-center items-center mt-4">
          <button
            disabled={fileData.length == 0}
            onClick={() => setIsFileData(true)}
            className="bg-blue  text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
        {isFileData && <ViewData />}
      </AppContext.Provider>
    </>
  );
}

export default UploadFIle;
