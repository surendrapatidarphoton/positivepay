import { useState } from "react";

function UploadFile() {
  const [contents, setcontents] = useState("");

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
      console.log("text", text);
      setcontents(text);
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

          <input
            type="file"
            className="hidden"
            onChange={(event) => onChooseFile(event)}
          />
        </label>
      </div>

      <div className="flex justify-center"> {contents}</div>
    </>
  );
}
export default UploadFile;
