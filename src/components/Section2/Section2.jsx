import Review from "./Review";
import uuid from "react-uuid";
import { ContextWrapper } from "../uploadingForm";
import { useContext } from "react";
import SectionTitle from "../SectionTitle";
import CopyBtn from "../CopyBtn";

const Section2 = () => {
  const { data, setData } = useContext(ContextWrapper);

  const deleteElement = (object) => {
    setData((prev) => {
      const copy = { ...prev };
      copy["Section#2_Reviews"] = copy["Section#2_Reviews"].filter(
        (el) => el != object
      );
      return copy;
    });
  };

  return (
    <>
      <div className="mt-[25px]">
        <div className="flex items-center gap-[15px]">
          <SectionTitle>Section2_Reviews</SectionTitle>
          <CopyBtn toCopy={data["Section#2_Reviews"]} />
        </div>
        <ul className="flex gap-[20px] bg-white mt-[15px] p-[20px] border rounded-lg">
          {data["Section#2_Reviews"].map((review) => {
            return (
              <Review
                key={uuid()}
                data={review}
                deleteElement={deleteElement}
              />
            );
          })}
        </ul>
        <button
          className="border px-[20px] rounded border-neutral-400 mt-[15px] py-[5px] bg-white"
          onClick={() => {
            setData((prev) => {
              const copy = { ...prev };
              copy["Section#2_Reviews"] = [
                ...copy["Section#2_Reviews"],
                { pic: "", name: "", text: "" },
              ];
              return copy;
            });
          }}
        >
          Add review
        </button>
      </div>
    </>
  );
};

export default Section2;
