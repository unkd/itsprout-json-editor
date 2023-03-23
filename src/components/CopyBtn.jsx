const CopyBtn = ({ toCopy }) => {
  return (
    <button
      onClick={() => {
        console.log("Copied");
        navigator.clipboard.writeText(JSON.stringify(toCopy));
      }}
    >
      <span className="material-symbols-outlined text-[24px] pointer-events-none mt-[4px]">
        content_copy
      </span>
    </button>
  );
};

export default CopyBtn;
