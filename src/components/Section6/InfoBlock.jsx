import { useContext, useEffect, useState } from "react";
import PopUp from "../PopUp";
import { ContextWrapper } from "../uploadingForm";

const InfoBlock = ({ data, index, deleteElement }) => {
  const [isPopUp, setIsPopUp] = useState(false);
  const [image, setImage] = useState(data.image);
  const [title, setTitle] = useState(data.title);
  const [text, setText] = useState(data.text);

  useEffect(() => {
    data["image"] = image;
    data["title"] = title;
    data["text"] = text;
  }, [image, title, text]);

  const { folders } = useContext(ContextWrapper);
  return (
    <>
      <div className="p-[10px] rounded flex flex-col items-center w-fit gap-[10px] bg-white border border-neutral-400 relative">
        <div className="text-[20px] absolute top-[10px] left-[15px]">
          #{index + 1}
        </div>
        <span
          class="material-symbols-rounded absolute right-[10px] top-[10px] cursor-pointer"
          onClick={() => {
            deleteElement(data);
          }}
        >
          delete
        </span>
        <div className="flex flex-col min-w-[100px]">
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
                className="border border-neutral-400 cursor-pointer p-[10px] max-w-[100px]"
                src={`https://drive.google.com/uc?export=view&id=${image}`}
              />
            </>
          )}
        </div>
        <input
          placeholder="Title"
          className="w-full outline-none border rounded text-[16px]"
          type={"text"}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          required
        />

        <textarea
          required
          placeholder="Text"
          className="border w-[200px] h-[100px]"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
      </div>
      {folders && isPopUp && (
        <PopUp folders={folders} setPic={setImage} setIsPopUp={setIsPopUp} />
      )}
    </>
  );
};

export default InfoBlock;
