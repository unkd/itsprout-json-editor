import { useContext, useEffect, useState } from "react";
import CopyBtn from "./CopyBtn";
import PopUp from "./PopUp";
import SectionTitle from "./SectionTitle";
import { ContextWrapper } from "./uploadingForm";

const HeaderBlock = () => {
  const [isPopUp, setIsPopUp] = useState(false);
  const { data, setData, folders } = useContext(ContextWrapper);
  const [image, setImage] = useState(data["Mentors"]);

  useEffect(() => {
    data["Mentors"] = image;
  }, [image]);

  return (
    <>
      <div className="flex flex-col">
        <SectionTitle>Section1</SectionTitle>
        <div className="flex flex-col p-[20px] border rounded-lg bg-white mt-[15px]">
          <div className="flex gap-[25px]">
            <div className="flex flex-col">
              <div>URL:</div>
              <div>
                <div>
                  /internship/
                  <input
                    className="w-[150px] outline-none border rounded text-[16px]"
                    type={"text"}
                    value={data["URL"]}
                    onChange={(e) => {
                      setData((prev) => {
                        const copy = { ...prev };
                        copy["URL"] = e.target.value;
                        return copy;
                      });
                    }}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col  w-fit">
              <div>Status:</div>
              <button
                type="button"
                onClick={() => {
                  setData((prev) => {
                    const copy = { ...prev };
                    copy["Status"] =
                      copy["Status"] == "Inactive" ? "Active" : "Inactive";
                    return copy;
                  });
                }}
                className={`px-[20px] font-[500] w-[100px] text-[#fff] rounded bg-black`}
              >
                {data["Status"]}
              </button>
            </div>
          </div>
          <div className="flex gap-[25px] mt-[30px]">
            <div className="flex gap-[10px]">
              <div>Headline:</div>
              <input
                className="w-[150px] outline-none border rounded text-[16px] h-fit"
                type={"text"}
                value={data["Headline"]}
                onChange={(e) => {
                  setData((prev) => {
                    const copy = { ...prev };
                    copy["Headline"] = e.target.value;
                    return copy;
                  });
                }}
                required
              />
            </div>
            <div className="flex gap-[20px]">
              <div className="flex gap-[10px]">
                Mentors:
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    navigator.clipboard.writeText(data["Mentors"]);
                  }}
                >
                  <span className="material-symbols-outlined text-[24px] pointer-events-none mt-[4px]">
                    content_copy
                  </span>
                </div>
              </div>

              {image == "" && (
                <>
                  <button
                    type="button"
                    className="border px-[15px] py-[3px] rounded border-black mt-[5px] w-fit"
                    onClick={() => {
                      setIsPopUp(true);
                    }}
                  >
                    Select img
                  </button>
                </>
              )}
              {image != "" && (
                <>
                  <img
                    onClick={() => {
                      setIsPopUp(true);
                    }}
                    className="border cursor-pointer p-[10px] max-w-[100px]"
                    src={`https://drive.google.com/uc?export=view&id=${image}`}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {folders && isPopUp && (
        <PopUp folders={folders} setPic={setImage} setIsPopUp={setIsPopUp} />
      )}
    </>
  );
};

export default HeaderBlock;
