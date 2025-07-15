import React, { createContext, useState,useEffect } from "react";


export const usercontext = createContext();

const Context = ({ children }) => {
  let [username, setUsername] = useState("");

useEffect(()=>{
    setUsername(localStorage.getItem("username"))
},[])


  return (
    <usercontext.Provider value={{ username, setUsername }}>
      {children}
    </usercontext.Provider>
  );
};

export default Context;
