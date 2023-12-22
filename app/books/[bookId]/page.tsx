"use client";

import { useCurrentBook } from "@/app/context/CurrentBookContext";
import { Button } from "@nextui-org/button";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import React from "react";

function Page() {
  const { currentBook } = useCurrentBook();
  const volInfo = currentBook.volumeInfo;
  const { user } = useAuth();

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
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="mx-auto container max-w-3xl mt-10">
      <div className="text-4xl mb-1">{volInfo.title}</div>
      {volInfo.authors ? (
        volInfo.authors.length > 1 ? (
          <div className="text-xl mb-4">
            {volInfo.authors.map((author: any) => (
              <div key={author}>{author}</div>
            ))}
          </div>
        ) : (
          <div className="text-xl mb-4">{volInfo.authors[0]}</div>
        )
      ) : (
        <div>Author Unknown</div>
      )}
      <img className="mb-4" src={volInfo.image} alt={volInfo.title} />
      <div className="">{volInfo.description}</div>
      <Button
        onClick={() => {
          postBook(
            currentBook.id,
            volInfo.title,
            volInfo.authors,
            volInfo.imageLinks.thumbnail,
            volInfo.description
          );
        }}
        className="mt-4"
        color="primary"
        size="lg"
      >
        Add to Library
      </Button>
    </div>
  );
}

export default Page;
