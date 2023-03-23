import { Fragment, useEffect } from "react";
import uuid from "react-uuid";

const PopUp = ({ folders, setPic, setIsPopUp }) => {
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full p-[25px] bg-[rgb(0,0,0,0.25)] z-10">
        <div className="max-w-[700px] w-full bg-white mx-auto rounded p-[20px] max-h-[700px] overflow-y-scroll">
          {folders.map((folder) => {
            const { name, images } = folder;
            return (
              <Fragment key={uuid()}>
                <div>
                  <h2 className="text-[24px]">
                    Folder: <span className="font-[500] ml-[15px]">{name}</span>
                  </h2>
                  <div className="flex flex-wrap gap-[10px] my-[15px]">
                    {images.map((photo) => {
                      return (
                        <img
                          key={uuid()}
                          onClick={() => {
                            setIsPopUp(false);
                            setPic(photo.id);
                          }}
                          className="border cursor-pointer p-[10px] max-w-[100px]"
                          alt={photo.name}
                          title={photo.name}
                          src={`https://drive.google.com/uc?export=view&id=${photo.id}`}
                        />
                      );
                    })}
                  </div>
                </div>
              </Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default PopUp;
