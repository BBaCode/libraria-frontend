"use client";

import { Button } from "@nextui-org/react";
import Link from "next/link";

import React from "react";
import Signup from "../components/Signup/Signup";

function Page() {
  return (
    <div className="container mx-auto pt-20">
      <Signup type="individual"></Signup>
      {/* <div className="mx-auto text-6xl text-center">Are you a</div>
      <div className="container mx-auto pt-12 flex max-w-sm justify-between">
        <Link href="/signup/parent">
          <Button className="p-10 text-2xl" variant="ghost" color="primary">
            Parent
          </Button>
        </Link>

        <Link href="/signup/child">
          <Button className="p-10 text-2xl" variant="ghost" color="secondary">
            Student
          </Button>
        </Link>
      </div> */}
    </div>
  );
}

export default Page;
