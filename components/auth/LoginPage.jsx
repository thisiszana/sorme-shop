"use client";

import Link from "next/link";
import { useState } from "react";
import { Home } from "../icons/Icons";
import Image from "next/image";
import { images } from "@/constants";
import CustomInp from "../shared/CustomInp";
import CustomBtn from "../shared/CustomBtn";
import useServerAction from "@/hooks/useServerAction";
import { loginUser } from "@/actions/auth.action";

export default function LoginPage() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const { res, loading } = useServerAction(loginUser, {
    username: form.username,
    password: form.password,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.username && !form.password) {
      toast.error("Fill in all the fields.");
      return;
    }

    res();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center bg-white max-sm:p-6 sm:pt-0"
    >
      <div className="max-xl:hidden w-full">
        <Image
          src={images.signininage}
          width={1950}
          height={1300}
          style={{ width: "1950px", height: "100vh" }}
          alt="auth-login"
          priority
          className="w-full h-screen object-cover"
        />
      </div>
      <div className="flex items-center justify-center xl:w-[70%] max-xl:w-full max-xl:h-screen">
        <div className="sm:w-[400px] max-xl:w-full">
          <div className="mb-[30px]">
            <Image src={images.logo} width={300} height={300} alt="logo" />
          </div>
          <h1 className="font-medium text-gray-600 text-[30px] mb-[5px]">
            Buy cheap with Sorme!
          </h1>
          <p className="text-gray-500 text-[13px] tracking-tight mb-[25px]">
            Welcome to Sorme! Experience a safe and enjoyable purchase. Thank
            you for choosing us.
          </p>
          <div className="space-y-5">
            <div className="flex flex-col gap-1">
              <CustomInp
                name="username"
                type="text"
                label="Username"
                value={form.username}
                onChange={changeHandler}
              />
            </div>
            <div className="flex flex-col gap-1 relative">
              <CustomInp
                name="password"
                type="password"
                label="Password"
                value={form.password}
                onChange={changeHandler}
              />
            </div>
            <CustomBtn type="submit" title="Login" isLoading={loading} />
            <div className="flex flex-col items-center gap-4 text-sm font-bold">
              <div className="flex items-center justify-center gap-4">
                <p>Dont have account?</p>
                <Link
                  href="/signup"
                  className="bg-gray-100 border text-center py-1 px-4 rounded-lg"
                >
                  Register
                </Link>
              </div>
              <Link
                href="/forgot-password"
                className="my-3 underline text-gray-600"
              >
                Forgot your password?
              </Link>
            </div>
            <hr />
            <div className="flex justify-center">
              <Link
                href="/"
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 transition1 rounded-xl py-1 px-4 border text-center w-fit"
              >
                <div>{<Home />}</div>
                <p className="text-[13px] font-light">Home Page</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
