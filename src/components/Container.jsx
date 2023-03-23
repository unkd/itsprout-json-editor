const Container = ({ children }) => {
  return (
    <>
      <div className="max-w-[840px] mx-auto min-h-[100vh] p-[25px]">
        {children}
      </div>
    </>
  );
};

export default Container;
