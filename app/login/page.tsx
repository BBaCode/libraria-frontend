"use client";
import React, { useMemo, useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { useAuth } from "../context/AuthContext";
import { validate } from "../validators";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [errorMessage, setErrorMessage] = useState("");
  const { login, redirectToHome, user, error } = useAuth();

  const isEmailInvalid = useMemo(() => {
    return validate("email", email);
  }, [email]);

  const isPasswordInvalid = useMemo(() => {
    return validate("password", password);
  }, [password]);

  const isFormValid = () => {
    return (
      !isPasswordInvalid &&
      !isEmailInvalid &&
      email.length !== 0 &&
      password.length !== 0
    );
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await login(email, password); // Using Firebase for authentication
    } catch (error: any) {
      console.error("Authentication failed: ", error.message);
    }
  };

  return (
    <div className="container p-10 mx-auto">
      <h2 className="text-center font-bold text-3xl mb-4">Login</h2>
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
          isInvalid={isEmailInvalid}
          errorMessage={isEmailInvalid && "Email must contain @ and ."}
          color={isEmailInvalid ? "danger" : "default"}
        />
        <Input
          size="sm"
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          isInvalid={isPasswordInvalid}
          errorMessage={
            isPasswordInvalid &&
            "Your password must be of at least length 8 and contain a number, a capital letter and a special character"
          }
          color={isPasswordInvalid ? "danger" : "default"}
        />
        <Button type="submit" color="primary" isDisabled={!isFormValid()}>
          Submit
        </Button>
      </form>
      {error ? (
        <p className=" text-red-600 mx-auto text-center pt-4">{error}</p>
      ) : (
        <p></p>
      )}
    </div>
  );
}

export default Login;
