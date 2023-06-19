import { useContext } from "react";
import { AppContext } from "../../appContext";

function Preview() {
  const { viewData } = useContext(AppContext);
  return (
    <>
      <div className="m-auto w-max">
        <div className="pt-5">File Preview</div>
        <div className="text-center pt-4">
          {viewData &&
            viewData.map((item, index) => {
              return (
                <div className="bg-lightgray" key={item + index}>
                  {item}
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
export default Preview;
