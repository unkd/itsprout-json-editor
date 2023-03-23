import { useEffect, useState } from "react";

const FAQQuetion = ({ data, deleteElement }) => {
  const [quetion, setQuetion] = useState(data.que);
  const [answer, setAnswer] = useState(data.ans);

  useEffect(() => {
    data["que"] = quetion;
    data["ans"] = answer;
  }, [quetion, answer]);

  return (
    <>
      <div className="flex flex-col gap-[20px] p-[10px] border rounded-lg relative">
        <span
          class="material-symbols-rounded absolute right-[10px] top-[10px] cursor-pointer"
          onClick={() => {
            deleteElement(data);
          }}
        >
          delete
        </span>
        <div className="flex flex-col gap-[10px]">
          <div>Quetion:</div>
          <input
            className="w-[150px] outline-none border rounded text-[16px]"
            type={"text"}
            value={quetion}
            onChange={(e) => {
              setQuetion(e.target.value);
            }}
            required
          />
        </div>
        <div>
          <div>Answer:</div>
          <textarea
            className="w-[150px] outline-none border rounded text-[16px]"
            type={"text"}
            value={answer}
            onChange={(e) => {
              setAnswer(e.target.value);
            }}
            required
          />
        </div>
      </div>
    </>
  );
};

export default FAQQuetion;
