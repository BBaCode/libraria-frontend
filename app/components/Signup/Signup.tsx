"use client";
import { Input } from "@nextui-org/input";
import React, { useMemo, useState } from "react";
import axios from "axios";
import { Button } from "@nextui-org/button";
import { useAuth } from "@/app/context/AuthContext";
import { validate } from "@/app/validators";

function SignUp({ type }: { type: string }) {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { login, redirectToHome } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    familyAccount: "",
    displayName: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const isFormValid = () => {
    return (
      !isDisplayNameInvalid &&
      !isPasswordInvalid &&
      !isEmailInvalid &&
      formData.displayName.length !== 0 &&
      formData.password.length !== 0 &&
      formData.email.length !== 0
    );
  };

  const isDisplayNameInvalid = useMemo(() => {
    return validate("displayName", formData.displayName);
  }, [formData.displayName]);

  const isPasswordInvalid = useMemo(() => {
    return validate("password", formData.password);
  }, [formData.password]);

  const isConfirmPasswordInvalid = useMemo(() => {
    return validate("confirmPassword", confirmPassword, formData.password);
  }, [confirmPassword]);

  const isEmailInvalid = useMemo(() => {
    return validate("email", formData.email);
  }, [formData.email]);

  const isFamilyAccountInvalid = useMemo(() => {
    return validate("familyAccount", formData.familyAccount);
  }, [formData.familyAccount]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4500/users/signup/parent",
        {
          email: formData.email,
          password: formData.password,
          displayName: formData.displayName,
          familyAccount: formData.familyAccount,
        }
      );

      if (response.status === 200 || response.status === 201) {
        const userData = await response.data;
        login(userData); // Call the login function with user data
        setErrorMessage("");
        redirectToHome();
        console.log(userData);
      } else {
        console.error("Authentication failed.");
      }
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
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
          isRequired
          size="sm"
          type="name"
          name="displayName"
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
          type="email"
          name="email"
          label="Email"
          value={formData.email}
          onChange={handleInputChange}
          isInvalid={isEmailInvalid}
          errorMessage={isEmailInvalid && "Email must contain @ and ."}
          color={isEmailInvalid ? "danger" : "default"}
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
          type="password"
          name="confirmPassword"
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
        {type === "parent" ? (
          <Input
            isRequired
            size="sm"
            type="text"
            name="familyAccount"
            label="Family Account Name"
            value={formData.familyAccount}
            onChange={handleInputChange}
            isInvalid={validate("familyAccount", formData.familyAccount)}
            errorMessage={
              isFamilyAccountInvalid &&
              "Your Family Name must be at least 2 letters"
            }
            color={isFamilyAccountInvalid ? "danger" : "default"}
          />
        ) : (
          ""
        )}

        <Button type="submit" color="primary" isDisabled={!isFormValid()}>
          Submit
        </Button>
      </form>
      {errorMessage.length > 1 ? (
        <p className=" text-red-600 mx-auto text-center pt-4">{errorMessage}</p>
      ) : (
        <p></p>
      )}
    </div>
  );
}

export default SignUp;
