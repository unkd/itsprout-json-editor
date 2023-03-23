import { useEffect, useState } from "react";

const TableRow = ({ data, deleteRow }) => {
  const [time, setTime] = useState(data.time);
  const [specification, setSpecification] = useState(data.specification);

  useEffect(() => {
    data["time"] = time;
    data["specification"] = specification;
  }, [time, specification]);

  return (
    <>
      <tr className="relative">
        <th className="border border-neutral-400">
          <input
            className="px-[10px] py-[5px]"
            value={time}
            onChange={(e) => {
              setTime(e.target.value);
            }}
            required
          />
        </th>
        <td className="border border-neutral-400">
          <input
            className="px-[10px] py-[5px]"
            value={specification}
            onChange={(e) => {
              setSpecification(e.target.value);
            }}
            required
          />
          <span
            class="material-symbols-rounded absolute -right-[30px] top-[5px] cursor-pointer"
            onClick={() => {
              deleteRow(data);
            }}
          >
            delete
          </span>
        </td>
      </tr>
    </>
  );
};

export default TableRow;
