"use client";
import { Input } from "@nextui-org/input";
import React, { useState } from "react";
import axios from "axios";
import { Button } from "@nextui-org/button";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4500/users/signup", {
        email,
        password,
      });

      if (response.status === 200) {
        // Handle successful authentication, e.g., redirect the user
        console.log("Authentication successful!");
      } else {
        // Handle authentication error, show error message, etc.
        console.error("Authentication failed.");
      }
    } catch (error: any) {
      console.error("Error during authentication:", error.message);
    }
  };

  return (
    <div className="container p-10 mx-auto">
      <h2 className="text-center font-bold text-3xl mb-4">Signup</h2>
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-md gap-4 flex flex-col"
      >
        <Input
          size="sm"
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          size="sm"
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" color="primary">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default SignUp;
