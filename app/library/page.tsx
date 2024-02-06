"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLibrary } from "../context/LibraryContext";
import { useAuth } from "../context/AuthContext";
import SignupRedirect from "../components/SignupRedirect/SignupRedirect";
import { useCurrentBook } from "../context/CurrentBookContext";
import { useRouter } from "next/navigation";
import "./library.css";

function Page() {
  const { user } = useAuth();
  const { library } = useLibrary();
  const [books, setBooks] = useState([]);
  const { setCurrentBook } = useCurrentBook();
  const router = useRouter();

  const clickBook = (
    id: string,
    volumeInfo: {
      title: string;
      authors: string;
      image: string;
      description: string;
    }
  ) => {
    setCurrentBook({
      id: id,
      volumeInfo: volumeInfo,
    });
    console.log(id, volumeInfo.title);
    router.push(`/books/${id}`);
  };

  useEffect(() => {
    if (user?.uid) {
      axios
        .post(`http://localhost:4500/library`, { userId: user.uid })
        .then((res) => {
          const transformedBooks: any = Object.entries(res.data).map(
            ([id, volumeInfo]) => ({
              id,
              ...(volumeInfo ?? {}),
            })
          );
          if (transformedBooks) setBooks(transformedBooks);
          console.log(transformedBooks);
        })
        .catch((err) => console.log(err));
    }
  }, [library]); // using library as the dependency to rerender the list

  const filterBooks = (sortBy: string) => {
    const sortedBooks = [...books].sort((a: any, b: any) => {
      // Ensure the property exists and fallback to empty string if not found
      const propertyA = (a.volumeInfo[sortBy] || "").toString().toLowerCase();
      const propertyB = (b.volumeInfo[sortBy] || "").toString().toLowerCase();

      if (propertyA < propertyB) {
        return -1;
      }
      if (propertyA > propertyB) {
        return 1;
      }

      // properties must be equal
      return 0;
    });
    setBooks(sortedBooks);
    console.log(sortedBooks);
  };

  return (
    <div>
      {user ? (
        <Table
          aria-label="Library"
          className=" mx-auto container max-w-5xl py-10 px-16"
        >
          <TableHeader className="">
            <TableColumn className="relative bg-gray-200 text-black rounded-md sm:rounded-none">
              Title{" "}
              <img
                src="/sort.png"
                alt="sort"
                className="w-6 absolute top-2 right-2 sm:right-0 hover:cursor-pointer"
                onClick={() => {
                  filterBooks("title");
                }}
              />
            </TableColumn>
            <TableColumn className="relative bg-gray-200 text-black hide">
              Author{" "}
              <img
                src="/sort.png"
                alt="sort"
                className="w-6 absolute top-2 right-2 sm:right-0 hover:cursor-pointer"
                onClick={() => {
                  filterBooks("authors");
                }}
              />
            </TableColumn>
            <TableColumn className="bg-gray-200 text-black hide">
              Date Added
            </TableColumn>
            <TableColumn className="bg-gray-200 text-black hide">
              STATUS
            </TableColumn>
          </TableHeader>
          <TableBody>
            {books ? (
              books.map((book: any, index) => (
                <TableRow
                  className="cursor-pointer hover:bg-slate-600"
                  onClick={() => {
                    clickBook(book.id, book.volumeInfo);
                  }}
                  key={index.toString()}
                >
                  <TableCell>{book.volumeInfo.title}</TableCell>
                  <TableCell className="hide">
                    {book.volumeInfo.authors}
                  </TableCell>
                  <TableCell className="hide">{book.dateAdded}</TableCell>
                  <TableCell className="hide">Read</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell>Add your first book</TableCell>
                <TableCell>NA</TableCell>
                <TableCell>Read</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      ) : (
        <SignupRedirect currentPage="Library"></SignupRedirect>
      )}
    </div>
  );
}

export default Page;
