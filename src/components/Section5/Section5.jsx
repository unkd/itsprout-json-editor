import { useContext } from "react";
import uuid from "react-uuid";
import CopyBtn from "../CopyBtn";
import SectionTitle from "../SectionTitle";
import { ContextWrapper } from "../uploadingForm";
import TableRow from "./TableRow";

const Section5 = () => {
  const { data, setData } = useContext(ContextWrapper);

  const deleteRow = (row) => {
    setData((prev) => {
      const copy = { ...prev };
      copy["Section#5_Teamwork"].timeTable = copy[
        "Section#5_Teamwork"
      ].timeTable.filter((el) => el != row);
      return copy;
    });
  };
  return (
    <>
      <div className="mt-[25px]">
        <div className="flex items-center gap-[15px]">
          <SectionTitle>Section5_Teamwork</SectionTitle>
          <CopyBtn toCopy={data["Section#5_Teamwork"]} />
        </div>

        <div className="flex gap-[30px] bg-white p-[20px] border rounded-lg mt-[15px]">
          <div className="flex flex-col">
            <textarea
              placeholder="Text"
              className="outline-none border rounded text-[16px]"
              type={"text"}
              value={data["Section#5_Teamwork"].text}
              onChange={(e) => {
                setData((prev) => {
                  const copy = { ...prev };
                  copy["Section#5_Teamwork"].text = e.target.value;
                  return copy;
                });
              }}
              required
            />
          </div>
          <div className="flex relative">
            <table className="border-separate border-spacing-2 w-[440px]">
              <thead>
                <tr>
                  <th colSpan={2} scope="col" className="text-center">
                    Зустрічі в ZOOM з понеділка по п’ятницю
                  </th>
                </tr>
              </thead>
              <tbody>
                {data["Section#5_Teamwork"].timeTable.map((row) => {
                  return (
                    <TableRow key={uuid()} data={row} deleteRow={deleteRow} />
                  );
                })}
              </tbody>
            </table>
            <button
              type="button"
              className="px-[20px] h-fit bg-white border absolute top-0 -right-[50px] border-neutral-600 rounded py-[5px] text-[14px]"
              onClick={() => {
                setData((prev) => {
                  const copy = { ...prev };
                  copy["Section#5_Teamwork"].timeTable = [
                    ...copy["Section#5_Teamwork"].timeTable,
                    { time: "", specification: "" },
                  ];
                  return copy;
                });
              }}
            >
              Add row
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Section5;
