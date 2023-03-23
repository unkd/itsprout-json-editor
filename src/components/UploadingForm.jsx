import axios from "axios";
import { createContext, useEffect, useState } from "react";
import HeaderBlock from "./HeaderBlock";
import Section10 from "./Section10/Section10";

import Section2 from "./Section2/Section2";
import Section3 from "./Section3/Section3";
import Section5 from "./Section5/Section5";
import Section6 from "./Section6/Section6";

export const ContextWrapper = createContext();

const UploadingForm = () => {
  const foldersToRetrieve = [
    "1G-H9eQzuW9tOPltJSASxNCIe8hU8wrdE",
    "1Cckw3Eqj5oy4SAgVfBqEdk-rtOY_dV1Y",
    "1VRro_eV23v55s11AfM5cTootoU9eVG-i",
    "1oMmiojImnX4eQcvjEtyL8x5OJAeRJDSq",
  ];

  const [photoFolders, setPhotoFolders] = useState(null);
  const [data, setData] = useState({
    URL: "",
    Status: "Inactive",
    Headline: "",
    Mentors: "",
    "Section#2_Reviews": [],
    "Section#3_Internship": [],
    "Section#5_Teamwork": { text: "", timeTable: [] },
    "Section#6_HowWork": [],
    "Section#10_FAQ": [],
  });

  const generateQuery = () => {
    let url = "";
    foldersToRetrieve.forEach((id) => {
      url += `folder-id[]=${id}&`;
    });
    return url.slice(0, url.length - 1);
  };

  const fetchData = async () => {
    const data = await axios
      .get(`http://localhost:10000/google-drive?${generateQuery()}`)
      .then((res) => res.data);

    setPhotoFolders([...data]);
  };

  const sendToAirtable = async () => {
    for (let key of Object.keys(data)) {
      if (typeof data[key] == "object") {
        data[key] = JSON.stringify(data[key]);
      }
      if (key == "URL") {
        data[key] = "/Internship/" + data[key];
      }
    }

    await axios
      .post("https://api-it-sprout.a-rogovsky1276.workers.dev/Internships", {
        records: [
          {
            fields: {
              ...data,
            },
          },
        ],
      })
      .then((res) => {
        console.log(res.data);
      });

    setData({
      URL: "",
      Status: "Inactive",
      Headline: "",
      Mentors: "",
      "Section#2_Reviews": [],
      "Section#3_Internship": [],
      "Section#5_Teamwork": { text: "", timeTable: [] },
      "Section#6_HowWork": [],
      "Section#10_FAQ": [],
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <form
        className="flex flex-col justify-center"
        onSubmit={(e) => {
          e.preventDefault();
          sendToAirtable();
        }}
      >
        <ContextWrapper.Provider
          value={{ folders: photoFolders, data, setData }}
        >
          <HeaderBlock />
          <Section2 />
          <Section3 />
          <Section5 />
          <Section6 />
          <Section10 />
        </ContextWrapper.Provider>
        <button
          type="submit"
          className="mt-[20px] bg-red-500 px-[20px] py-[10px] rounded text-white"
        >
          Put in airtable
        </button>
      </form>
    </>
  );
};

export default UploadingForm;
