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

    Status: true,
    Headline: "",
    Mentors: "",
    "Section#2_Reviews": [],
    "Section#3_Internship": [],
    "Section#5_Teamwork": { text: "", table: [] },
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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <ContextWrapper.Provider value={{ folders: photoFolders, data, setData }}>
        <HeaderBlock />
        <Section2 />
        <Section3 />
        <Section5 />
        <Section6 />
        <Section10 />
      </ContextWrapper.Provider>
    </>
  );
};

export default UploadingForm;
