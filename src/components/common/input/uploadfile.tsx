import { useState } from "react";
import { any } from "zod";

function UploadFile() {
  const [contents, setcontents] = useState("");
  const [tableData, setTableData] = useState([]);
  const [radioValue, setradioValue] = useState(",");
  const [showTable, setShowtable] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const showTableData = () => {
    setShowtable(true);
  };
  const handleChange = (e) => {
    setErrorMessage("");

    if (e.target.value == "comma") {
      setradioValue(",");
    } else {
      setradioValue("|");
    }
  };
  function csvToArray(str, delimiter = ",") {
    const headers = str.slice(0, str.indexOf("\n")).split(delimiter);
    const rows = str
      .slice(str.indexOf("\n") + 1)
      .split("\n")
      .filter((ele) => ele != "");

    const arr = rows.map(function (row) {
      const values = row.split(delimiter);
      const el = headers.reduce(function (object, header, index) {
        object[header] = values[index];
        return object;
      }, {});
      return el;
    });

    // return the array
    setTableData(arr);
  }
  function onChooseFile(event: any) {
    if (typeof window.FileReader !== "function")
      throw "The file API isn't supported on this browser.";
    const input = event.target;
    if (!input)
      throw "The browser does not properly implement the event object";
    if (!input.files)
      throw "This browser does not support the `files` property of the file input.";
    if (!input.files[0]) return undefined;
    const file = input.files[0];
    const fr = new FileReader();
    fr.onload = async (e: any) => {
      const text = e.target.result;
      if (text.includes(radioValue)) {
        csvToArray(text, radioValue);
        setErrorMessage("");
      } else {
        let rv = radioValue == "," ? "Comma" : "Pipeline";
        setErrorMessage(rv + " delimiter is not found.");
      }
    };
    fr.readAsText(file);
  }
  return (
    <>
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
            onChange={(e) => handleChange(e)}
            name="inline-radio-group"
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
      <div className="flex w-full items-center justify-center bg-grey-lighter p-10 ">
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

          <input
            type="file"
            className="hidden"
            onChange={(event) => onChooseFile(event)}
          />
        </label>
      </div>
      <pre className="flex justify-center text-red">{errorMessage}</pre>
      <pre className="flex justify-center"> {contents} </pre>

      <div className="flex justify-center my-10">
        <button
          disabled={tableData.length == 0}
          onClick={showTableData}
          className="bg-blue  text-white font-bold py-2 px-4 rounded"
        >
          Convert in to Table
        </button>
      </div>
      {tableData && showTable && (
        <div className="flex justify-center pt-5">
          <table className="w-52 text-sm text-left border">
            <thead className="text-xs border-b bg-gray text-white">
              <tr>
                <th scope="col" className="px-6 py-3">
                  ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3">
                  Code
                </th>
                <th scope="col" className="px-6 py-3">
                  Account Number
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item: any, index: any) => {
                return (
                  <tr className="bg-white border-b" key={item.name + index}>
                    <td scope="row" className="px-6 py-4 font-medium">
                      {index + 1}
                    </td>
                    <td scope="row" className="px-6 py-4 font-medium">
                      {item.name}
                    </td>
                    <td scope="row" className="px-6 py-4 font-medium">
                      {item.amount}
                    </td>
                    <td scope="row" className="px-6 py-4 font-medium">
                      {item.code}
                    </td>
                    <td scope="row" className="px-6 py-4 font-medium">
                      {item["account number"]}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
export default UploadFile;
