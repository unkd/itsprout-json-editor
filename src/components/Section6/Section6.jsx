import { useContext } from "react";
import uuid from "react-uuid";
import CopyBtn from "../CopyBtn";
import SectionTitle from "../SectionTitle";
import { ContextWrapper } from "../uploadingForm";
import InfoBlock from "./InfoBlock";

const Section6 = () => {
  const { data, setData } = useContext(ContextWrapper);

  const deleteElement = (object) => {
    setData((prev) => {
      const copy = { ...prev };
      copy["Section#6_HowWork"] = copy["Section#6_HowWork"].filter(
        (el) => el != object
      );
      return copy;
    });
  };

  return (
    <>
      <div className="mt-[25px]">
        <div className="flex items-center gap-[15px]">
          <SectionTitle>Section6_HowWork</SectionTitle>
          <CopyBtn toCopy={data["Section#6_HowWork"]} />
        </div>
        <div className="p-[20px] bg-white rounded-lg border mt-[15px]">
          <div className="flex flex-wrap gap-[20px]">
            {data["Section#6_HowWork"].map((block, index) => {
              return (
                <InfoBlock
                  key={uuid()}
                  data={block}
                  index={index}
                  deleteElement={deleteElement}
                />
              );
            })}
          </div>
        </div>
        <button
          type="button"
          className="border px-[20px] rounded border-neutral-600 mt-[15px] py-[5px] bg-white"
          onClick={() => {
            setData((prev) => {
              const copy = { ...prev };
              copy["Section#6_HowWork"] = [
                ...copy["Section#6_HowWork"],
                { title: "", image: "", text: "" },
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

export default Section6;
