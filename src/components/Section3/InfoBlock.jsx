import { useContext, useEffect, useState } from "react";
import PopUp from "../PopUp";
import { ContextWrapper } from "../uploadingForm";

const InfoBlock = ({ data, deleteElement }) => {
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
      <div className=" flex flex-col gap-[10px] items-center p-[10px] border border-neutral-400 rounded-lg relative">
        <span
          class="material-symbols-rounded absolute right-[10px] top-[10px] cursor-pointer"
          onClick={() => {
            deleteElement(data);
          }}
        >
          delete
        </span>
        {image == "" && (
          <>
            <button
              className="border px-[15px] py-[3px] rounded border-black mt-[5px]"
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
          placeholder="Text"
          className="border w-[200px] h-[100px]"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        ></textarea>
      </div>
      {folders && isPopUp && (
        <PopUp folders={folders} setPic={setImage} setIsPopUp={setIsPopUp} />
      )}
    </>
  );
};

export default InfoBlock;
