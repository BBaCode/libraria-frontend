"use client";
import { Input } from "@nextui-org/input";
import React, { useMemo, useState } from "react";
import axios from "axios";
import { Button } from "@nextui-org/button";
import { useAuth } from "@/app/context/AuthContext";
import { validate } from "@/app/validators";

function Page() {
  //   const [confirmPassword, setConfirmPassword] = useState("");
  //   const [errorMessage, setErrorMessage] = useState("");

  //   const [formData, setFormData] = useState({
  //     username: "",
  //     password: "",
  //     parentEmail: "",
  //     displayName: "",
  //   });

  //   const isDisplayNameInvalid = useMemo(() => {
  //     return validate("displayName", formData.displayName);
  //   }, [formData.displayName]);

  //   const isUsernameInvalid = useMemo(() => {
  //     return validate("username", formData.username);
  //   }, [formData.username]);

  //   const isPasswordInvalid = useMemo(() => {
  //     return validate("password", formData.password);
  //   }, [formData.password]);

  //   const isConfirmPasswordInvalid = useMemo(() => {
  //     return validate("confirmPassword", confirmPassword, formData.password);
  //   }, [confirmPassword]);

  //   const isParentEmailInvalid = useMemo(() => {
  //     return validate("parentEmail", formData.parentEmail);
  //   }, [formData.parentEmail]);

  //   const handleInputChange = (e: any) => {
  //     const { name, value } = e.target;
  //     setFormData((prevData) => ({
  //       ...prevData,
  //       [name]: value,
  //     }));
  //   };

  //   const isFormValid = () => {
  //     return (
  //       !isDisplayNameInvalid &&
  //       !isUsernameInvalid &&
  //       !isPasswordInvalid &&
  //       !isParentEmailInvalid &&
  //       formData.displayName.length !== 0 &&
  //       formData.username.length !== 0 &&
  //       formData.password.length !== 0 &&
  //       formData.parentEmail.length !== 0
  //     );
  //   };

  //   const { login, redirectToHome } = useAuth();

  //   const handleSubmit = async (e: any) => {
  //     e.preventDefault();

  //     try {
  //       const response = await axios.post(
  //         "http://localhost:4500/users/signup/child",
  //         {
  //           username: formData.username,
  //           password: formData.password,
  //           displayName: formData.displayName,
  //           parentEmail: formData.parentEmail,
  //         }
  //       );

  //       if (response.status === 200 || response.status === 201) {
  //         const userData = await response.data;
  //         login(userData); // Call the login function with user data
  //         setErrorMessage("");
  //         redirectToHome();
  //         console.log(userData);
  //       } else {
  //         console.error("Authentication failed.");
  //       }
  //     } catch (error: any) {
  //       setErrorMessage(error.response.data.message);
  //       console.error("Error during authentication:", error.message);
  //     }
  //   };

  return (
    <div className="container p-10 mx-auto">
      {/* <h2 className="text-center font-bold text-3xl mb-4">Child Signup</h2>
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-md gap-4 flex flex-col"
      >
        <Input
          isRequired
          size="sm"
          name="displayName"
          type="name"
          label="Name"
          value={formData.displayName}
          onChange={handleInputChange}
          isInvalid={isDisplayNameInvalid}
          errorMessage={
            isDisplayNameInvalid && "Your name must be at least 3 letters"
          }
          color={isDisplayNameInvalid ? "danger" : "default"}
        />
        <Input
          isRequired
          size="sm"
          name="username"
          type="text"
          label="Username"
          value={formData.username}
          onChange={handleInputChange}
          isInvalid={isUsernameInvalid}
          errorMessage={
            isUsernameInvalid && "Your username must be of at least length 8"
          }
          color={isUsernameInvalid ? "danger" : "default"}
        />
        <Input
          isRequired
          size="sm"
          name="password"
          type="password"
          label="Password"
          value={formData.password}
          onChange={handleInputChange}
          isInvalid={validate("password", formData.password)}
          errorMessage={
            isPasswordInvalid &&
            "Your password must be of at least length 8 and contain a number, a capital letter and a special character"
          }
          color={isPasswordInvalid ? "danger" : "default"}
        />
        <Input
          isRequired
          size="sm"
          name="confirmPassword"
          type="password"
          label="Confirm Password"
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
          isInvalid={isConfirmPasswordInvalid}
          errorMessage={
            isConfirmPasswordInvalid && "Passwords must be the same"
          }
          color={isConfirmPasswordInvalid ? "danger" : "default"}
        />
        <Input
          size="sm"
          type="email"
          name="parentEmail"
          label="Parent's Email"
          value={formData.parentEmail}
          onChange={handleInputChange}
          isInvalid={isParentEmailInvalid}
          errorMessage={isParentEmailInvalid && "Email must contain @ and ."}
          color={isParentEmailInvalid ? "danger" : "default"}
        />
        <Button isDisabled={!isFormValid()} type="submit" color="primary">
          Submit
        </Button>
      </form>
      {errorMessage.length > 1 ? (
        <p className=" text-red-600 mx-auto text-center pt-4">{errorMessage}</p>
      ) : (
        <p></p>
      )} */}
    </div>
  );
}

export default Page;
