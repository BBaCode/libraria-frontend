import React, { createContext, useContext, useState, ReactNode } from "react";

interface Book {
  title: string;
  authors: string;
}

interface LibraryContextType {
  library: Book[];
  addBookToLibrary: (book: Book) => void;
}

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

// Create a provider component
interface LibraryProviderProps {
  children: ReactNode;
}

export const LibraryProvider: React.FC<LibraryProviderProps> = ({
  children,
}) => {
  const [library, setLibrary] = useState<Book[]>([]);

  const addBookToLibrary = (book: Book) => {
    setLibrary((prevLibrary) => [...prevLibrary, book]);
  };

  const contextValue: LibraryContextType = {
    library,
    addBookToLibrary,
  };

  return (
    <LibraryContext.Provider value={contextValue}>
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibrary = () => {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error("useLibrary must be used within a LibraryProvider");
  }

  return context;
};
