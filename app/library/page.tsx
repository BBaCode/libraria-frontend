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
import { useLibrary } from "../LibraryContext";

function Library() {
  const { library } = useLibrary();
  const [books, setBooks] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:4500/library`, {})
      .then((res) => {
        setBooks(Object.values(res.data));
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, [library]);

  //NEXT STEP LOAD LIBRARY WITH BOOKS FROM LINE 21

  return (
    <Table
      aria-label="Library"
      className=" mx-auto container max-w-5xl py-10 px-16"
    >
      <TableHeader>
        <TableColumn>Title</TableColumn>
        <TableColumn>Author</TableColumn>
        <TableColumn>STATUS</TableColumn>
      </TableHeader>
      <TableBody>
        {books ? (
          books.map((book: any, index) => (
            <TableRow key={index.toString()}>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.authors}</TableCell>
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
  );
}

export default Library;
