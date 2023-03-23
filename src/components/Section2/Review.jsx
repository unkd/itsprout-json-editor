import { useContext, useEffect, useState } from "react";
import PopUp from "../PopUp";
import { ContextWrapper } from "../uploadingForm";

const Review = ({ data, deleteElement }) => {
  const [isPopUp, setIsPopUp] = useState(false);
  const [pic, setPic] = useState(data.pic);
  const [name, setName] = useState(data.name);
  const [text, setText] = useState(data.text);

  useEffect(() => {
    data["pic"] = pic;
    data["name"] = name;
    data["text"] = text;
  }, [pic, name, text]);

  const { folders } = useContext(ContextWrapper);

  return (
    <>
      <div className="p-[10px] rounded flex flex-col items-center w-fit gap-[10px] bg-white border border-neutral-400 relative">
        <span
          class="material-symbols-rounded absolute right-[10px] top-[10px] cursor-pointer"
          onClick={() => {
            deleteElement(data);
          }}
        >
          delete
        </span>
        <div className="flex flex-col min-w-[100px]">
          {pic == "" && (
            <>
              <button
                className="border px-[15px] py-[3px] rounded border-black mt-[5px] w-fit"
                onClick={() => {
                  setIsPopUp(true);
                }}
              >
                Select img
              </button>
            </>
          )}
          {pic != "" && (
            <>
              <img
                onClick={() => {
                  setIsPopUp(true);
                }}
                className="border border-neutral-400 cursor-pointer p-[10px] max-w-[100px]"
                src={`https://drive.google.com/uc?export=view&id=${pic}`}
              />
            </>
          )}
        </div>
        <input
          placeholder="Name"
          className="w-full outline-none border rounded text-[16px]"
          type={"text"}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          required
        />

        <textarea
          placeholder="Text"
          className="border w-[200px] h-[100px]"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        ></textarea>
      </div>
      {folders && isPopUp && (
        <PopUp folders={folders} setPic={setPic} setIsPopUp={setIsPopUp} />
      )}
    </>
  );
};

export default Review;
