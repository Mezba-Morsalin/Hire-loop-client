"use client";

import { authClient } from "@/lib/auth-client";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import React, { useState } from "react";
import { BiCheck } from "react-icons/bi";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

const Page = () => {
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    try {
      const { error } = await authClient.signIn.email({
        email: user.email,
        password: user.password,
        rememberMe : true,
        callbackURL: "/",
      });

      if (error) {
        setIsSuccess(false);
        setMessage(error.message || "Failed to create account.");
        return;
      }

      setIsSuccess(true);
      setMessage(
        "Welcome back! You have signed in successfully."
      );

      e.target.reset();
    } catch (err) {
      setIsSuccess(false);
      setMessage("Something went wrong. Please try again.");
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-4 sm:mx-6 md:mx-auto shadow-[0_0_30px_rgba(99,102,241,0.6)] my-8 md:my-16 p-5 sm:p-6 md:p-10 rounded-2xl border border-indigo-500/20">
      <div className="space-y-4 text-center">
        <h2 className="text-2xl md:text-4xl font-bold bg-linear-to-r from-indigo-500 to-indigo-600 bg-clip-text text-transparent">
          Welcome Back
        </h2>
        <p className="text-gray-400 leading-7 text-sm sm:text-base">
          Sign in to your HireLoop account to manage applications, track opportunities, and stay connected with employers.
        </p>
      </div>

      <Form
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-4 mt-8"
      >

        <TextField
          className="w-full"
          isRequired
          name="email"
          type="email"
          validate={(value) => {
            if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
            ) {
              return "Please enter a valid email address";
            }
            return null;
          }}
        >
          <Label>Email</Label>
          <Input
            className="border-none shadow-none focus:shadow-[0_0_20px_rgba(99,102,241,0.5)] focus:outline-none transition-all duration-300"
            placeholder="john@example.com"
          />
          <FieldError />
        </TextField>

        <TextField
          className="w-full relative"
          isRequired
          minLength={8}
          name="password"
          type={showPassword ? "text" : "password"}
          validate={(value) => {
            if (value.length < 8) {
              return "Password must be at least 8 characters";
            }
            if (!/[A-Z]/.test(value)) {
              return "Password must contain at least one uppercase letter";
            }
            if (!/[0-9]/.test(value)) {
              return "Password must contain at least one number";
            }
            return null;
          }}
        >
          <Label>Password</Label>
          <Input
            className=" border-none shadow-none focus:shadow-[0_0_20px_rgba(99,102,241,0.5)] focus:outline-none transition-all duration-300"
            placeholder="Enter your password"
          />
          <span onClick={()=> setShowPassword(!showPassword)} className="absolute top-8.5 cursor-pointer right-3">
            {
                showPassword ? <FaEye/> : <FaEyeSlash/>
            }
          </span>
          <Description>
            Must be at least 8 characters with 1 uppercase and 1 number
          </Description>
          <FieldError />
        </TextField>

        {/* Success / Error Message */}
        {message && (
          <div
            className={`w-full rounded-xl px-4 py-3 text-sm font-medium ${
              isSuccess
                ? "bg-green-500/10 border border-green-500/20 text-green-400"
                : "bg-red-500/10 border border-red-500/20 text-red-400"
            }`}
          >
            {message}
          </div>
        )}

        <div className="flex justify-center flex-col sm:flex-row gap-2 w-full">
          <Button
          isDisabled={loading}
            type="submit"
            fullWidth
            className="bg-linear-to-r from-indigo-500 to-indigo-600 rounded-xl text-white"
          >
            {loading ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Signing In...
            </span>
          ) : (
            <>
              <BiCheck className="text-lg" />
              Sign In
            </>
          )}
          </Button>
        </div>
      </Form>

      <div className="flex justify-center items-center gap-4 my-4">
        <div className="border-t border-gray-400 w-5"></div>
        <div className="text-gray-400">OR</div>
        <div className="border-t border-gray-400 w-5"></div>
      </div>

      <div className="flex justify-center items-center">
        <Button className="inline-flex gap-3 bg-transparent border border-indigo-500 text-white rounded-xl">
          <FcGoogle />
          Sign In with Google
        </Button>
      </div>
      <div className="flex justify-center items-center gap-3 mt-4">
        <p className="text-gray-400">Don’t have an account?</p>
        <Link href={'/signup'} className="text-indigo-500">Sign Up</Link>
      </div>
    </div>
  );
};

export default Page;