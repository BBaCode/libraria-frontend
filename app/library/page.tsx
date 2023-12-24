"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLibrary } from "../context/LibraryContext";
import { useAuth } from "../context/AuthContext";
import SignupRedirect from "../components/SignupRedirect/SignupRedirect";
import { useCurrentBook } from "../context/CurrentBookContext";
import { useRouter } from "next/navigation";

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

  return (
    <div>
      {user ? (
        <Table
          aria-label="Library"
          className=" mx-auto container max-w-5xl py-10 px-16"
        >
          <TableHeader>
            <TableColumn>Title</TableColumn>
            <TableColumn>Author</TableColumn>
            <TableColumn>Date Added</TableColumn>
            <TableColumn>STATUS</TableColumn>
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
                  <TableCell>{book.volumeInfo.authors}</TableCell>
                  <TableCell>{book.dateAdded}</TableCell>
                  <TableCell>Read</TableCell>
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
