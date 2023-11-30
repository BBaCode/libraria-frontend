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
import React, { useEffect } from "react";

function Library() {
  let books = [];
  useEffect(() => {
    axios
      .get(`http://localhost:4500/library`, {})
      .then((res) => {
        console.log(res.data);
        books = Object.values(res.data.books);
        console.log(books);
      })
      .catch((err) => console.log(err));
  }, []);

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
        <TableRow key="1">
          <TableCell>Tony Reichert</TableCell>
          <TableCell>CEO</TableCell>
          <TableCell>Active</TableCell>
        </TableRow>
        <TableRow key="2">
          <TableCell>Zoey Lang</TableCell>
          <TableCell>Technical Lead</TableCell>
          <TableCell>Paused</TableCell>
        </TableRow>
        <TableRow key="3">
          <TableCell>Jane Fisher</TableCell>
          <TableCell>Senior Developer</TableCell>
          <TableCell>Active</TableCell>
        </TableRow>
        <TableRow key="4">
          <TableCell>William Howard</TableCell>
          <TableCell>Community Manager</TableCell>
          <TableCell>Vacation</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export default Library;
