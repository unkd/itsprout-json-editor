import { useContext } from "react";
import uuid from "react-uuid";
import CopyBtn from "../CopyBtn";
import SectionTitle from "../SectionTitle";
import { ContextWrapper } from "../uploadingForm";
import FAQQuetion from "./FAQQuetion";

const Section10 = () => {
  const { data, setData } = useContext(ContextWrapper);

  const deleteElement = (object) => {
    setData((prev) => {
      const copy = { ...prev };
      copy["Section#10_FAQ"] = copy["Section#10_FAQ"].filter(
        (el) => el != object
      );
      return copy;
    });
  };

  return (
    <>
      <div className="mt-[25px]">
        <div className="flex items-center gap-[15px]">
          <SectionTitle>Section10 - FAQ</SectionTitle>
          <CopyBtn toCopy={data["Section#10_FAQ"]} />
        </div>
        <div className="mt-[15px] p-[20px] bg-white border rounded-lg">
          <div className="flex flex-wrap gap-[20px]">
            {data["Section#10_FAQ"].map((block) => {
              return (
                <FAQQuetion
                  key={uuid()}
                  data={block}
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
              copy["Section#10_FAQ"] = [
                ...copy["Section#10_FAQ"],
                { que: "", ans: "" },
              ];
              return copy;
            });
          }}
        >
          Add quetion
        </button>
      </div>
    </>
  );
};

export default Section10;
