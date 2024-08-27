import React, { createContext, useState, useEffect } from "react";
import useSound from "use-sound";
import popSound from "../src/assets/popSound.mp3";

export const MyContext = createContext();

export const ContextProvider = ({ children }) => {
  const [playPopSound] = useSound(popSound);
  const [me, setMe] = useState(null);

  return (
    <MyContext.Provider value={{ me, setMe, playPopSound }}>
      {children}
    </MyContext.Provider>
  );
};
