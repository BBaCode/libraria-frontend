"use client";

import { useCurrentBook } from "@/app/context/CurrentBookContext";
import { useLibrary } from "@/app/context/LibraryContext";
import { useAuth } from "../../context/AuthContext";
import { Button } from "@nextui-org/button";
import axios from "axios";
import React, { useEffect } from "react";

function Page() {
  const { currentBook } = useCurrentBook();
  const { library, addBookToLibrary } = useLibrary();
  const { user } = useAuth();
  useEffect(() => {
    console.log(library);
  }, []);

  const volInfo = currentBook.volumeInfo;

  const postBook = (
    id: string,
    title: string,
    authors: string,
    image: string,
    description: string
  ) => {
    let volumeInfo: any;
    if (authors) {
      volumeInfo = {
        title: title,
        authors: authors,
        image: image,
        description: description,
      };
    } else {
      volumeInfo = {
        title: title,
        image: image,
        description: description,
        authors: "unknown",
      };
    }

    axios
      .post(`http://localhost:4500/library/writeBook`, {
        volumeInfo,
        userId: user?.uid,
        id: id,
      })
      .then((res) => {
        alert("Book added to library!");
        addBookToLibrary({
          id: id,
          title: title,
          authors: authors,
          dateAdded: res.data.dateAdded,
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="relative md:mx-auto container max-w-3xl mt-10 p-4 bg-black border-slate-100 border h-screen-minus-64 shadow-slate-300 shadow-xl overflow-scroll">
      <div className="text-6xl mb-1 text-center">{volInfo.title}</div>
      {volInfo.authors ? (
        volInfo.authors.length > 1 ? (
          <div className="text-xl mb-4 text-center">
            {volInfo.authors.map((author: any) => (
              <div key={author}>{author}</div>
            ))}
          </div>
        ) : (
          <div className="text-xl mb-4 text-center text-blue-500">
            {volInfo.authors[0]}
          </div>
        )
      ) : (
        <div className="text-xl mb-4 text-center text-blue-500">
          Author Unknown
        </div>
      )}
      {volInfo ? (
        <img
          className="mb-4 mx-auto w-40"
          src={volInfo.image}
          alt={volInfo.title}
        />
      ) : (
        "No image available"
      )}

      <div className="md:max-w-lg text-center mx-auto">
        {volInfo.description}
      </div>
      <div className="fixed p-10 bg-black "></div>
      {library.some((book: any) => book.id === currentBook.id) ? (
        <Button
          //  onClick={() => {
          // REMOVE BOOK FROM LIBRARY instead
          //    postBook(
          //      currentBook.id,
          //      volInfo.title,
          //      volInfo.authors,
          //      volInfo.image,
          //      volInfo.description
          //    );
          //  }}
          className=""
          color="primary"
          isDisabled={true}
          size="lg"
        >
          Already in Library
        </Button>
      ) : (
        <Button
          onClick={() => {
            postBook(
              currentBook.id,
              volInfo.title,
              volInfo.authors,
              volInfo.image,
              volInfo.description
            );
          }}
          className="mt-4 mx-auto"
          color="primary"
          size="lg"
        >
          Add to Library
        </Button>
      )}
    </div>
  );
}

export default Page;
