import { useContext } from "react";
import uuid from "react-uuid";
import CopyBtn from "../CopyBtn";
import SectionTitle from "../SectionTitle";
import { ContextWrapper } from "../uploadingForm";
import InfoBlock from "./InfoBlock";

const Section3 = () => {
  const { data, setData } = useContext(ContextWrapper);

  const deleteElement = (object) => {
    setData((prev) => {
      const copy = { ...prev };
      copy["Section#3_Internship"] = copy["Section#3_Internship"].filter(
        (el) => el != object
      );
      return copy;
    });
  };

  return (
    <>
      <div className="mt-[25px]">
        <div className="flex items-center gap-[15px]">
          <SectionTitle>Section3_Internship</SectionTitle>
          <CopyBtn toCopy={data["Section#3_Internship"]} />
        </div>
        <ul className="flex gap-[25px] flex-wrap p-[20px] bg-white border rounded-lg mt-[15px]">
          {data["Section#3_Internship"].map((review) => {
            return (
              <InfoBlock
                key={uuid()}
                data={review}
                deleteElement={deleteElement}
              />
            );
          })}
        </ul>
        <button
          type="button"
          className="border px-[20px] rounded border-neutral-600 mt-[15px] py-[5px] bg-white"
          onClick={() => {
            setData((prev) => {
              const copy = { ...prev };
              copy["Section#3_Internship"] = [
                ...copy["Section#3_Internship"],
                { image: "", title: "", text: "" },
              ];
              return copy;
            });
          }}
        >
          Add block
        </button>
      </div>
    </>
  );
};

export default Section3;
