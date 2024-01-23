"use client";
import React, { useMemo, useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { useAuth } from "../context/AuthContext";
import { validate } from "../validators";
import { provider, auth, signInWithPopup } from "../firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, user, error, redirectToHome } = useAuth();

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

  const handleGoogleSignIn = async () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        redirectToHome();
        console.log(user);
      })
      .catch((error) => {
        // Handle Sign In Error
      });
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
    <div className="container mt-60 p-10 mx-auto bg-black max-w-md border border-white rounded-md">
      <h2 className="text-center font-bold text-3xl mb-4 text-white">Login</h2>
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-md gap-4 flex flex-col"
      >
        <Input
          isRequired
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
          isRequired
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
      <div className="flex justify-center">
        <Button
          onClick={handleGoogleSignIn}
          color={undefined}
          className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
        >
          <img src="/google.svg" className="fill-current w-6 h-6 mr-2" />
          <span>Sign in with Google</span>
        </Button>
      </div>
    </div>
  );
}

export default Login;
