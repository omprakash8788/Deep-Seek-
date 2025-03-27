"use client";
import { useUser } from "@clerk/nextjs";
import { createContext, useContext } from "react"; // 1

export const AppContext = createContext(); // 2 - Here we created the AppContext

// After that we will add export useAppContext

export const useAppContext = () => {
  return useContext(AppContext);
};

// using this "useAppContext" we will get all the data from the context file

//Now in this one we have to add data using the "AppContextProvider"

export const AppContextProvider = ({ children }) => {
  // inside we can store all variable and function then we can use it in any component
  const { user } = useUser();

  const value = {
    user,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
