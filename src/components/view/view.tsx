import { useContext } from "react";
import { AppContext } from "../../appContext";
function ViewData() {
  const { fileData } = useContext(AppContext);

  return (
    <>
      {fileData && (
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
              {fileData.map((item: any, index: any) => {
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
