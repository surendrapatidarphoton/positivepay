import { useContext } from "react";
import { AppContext } from "../../appContext";
function ViewData() {
  const data = useContext(AppContext);

  return (
    <>
      <div className="m-auto w-max">
        <div className="pt-5">File Preview</div>
        <div className="text-center pt-4">
          {data &&
            data.map((item, index) => {
              return (
                <div className="bg-lightgray" key={item.name + index}>
                  {item.name + ", " + item.gender}
                </div>
              );
            })}
        </div>
      </div>
      {data && (
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
                  Gender
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item: any, index: any) => {
                return (
                  <tr className="bg-white border-b" key={item.name + index}>
                    <td scope="row" className="px-6 py-4 font-medium">
                      {index + 1}
                    </td>
                    <td scope="row" className="px-6 py-4 font-medium">
                      {item.name}
                    </td>
                    <td scope="row" className="px-6 py-4 font-medium">
                      {item.gender}
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

export default ViewData;
