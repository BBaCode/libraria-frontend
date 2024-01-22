// contexts/CurrentBookContext.js
import React, { createContext, useState, useContext } from "react";

const CurrentBookContext = createContext(null as any);

export const useCurrentBook = () => useContext(CurrentBookContext);

export const CurrentBookProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentBook, setCurrentBook] = useState(null);

  return (
    <CurrentBookContext.Provider value={{ currentBook, setCurrentBook }}>
      {children}
    </CurrentBookContext.Provider>
  );
};
