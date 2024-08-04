import React, { createContext, useState, useEffect } from "react";

export const MyContext = createContext();

export const ContextProvider = ({ children }) => {
  const [me, setMe] = useState(null);
  useEffect(() => {
    console.log("me ========>" + me);
  }, [me]);
  return (
    <MyContext.Provider value={{ me, setMe }}>{children}</MyContext.Provider>
  );
};
