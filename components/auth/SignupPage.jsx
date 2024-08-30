"use client";

import { images } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import CustomInp from "../shared/CustomInp";
import Loader from "../shared/Loader";
import { Home } from "../icons/Icons";
import CustomBtn from "../shared/CustomBtn";
import useServerAction from "@/hooks/useServerAction";
import { createUser } from "@/actions/auth.action";
import { useRouter } from "next/navigation";
import { MESSAGES } from "@/utils/message";

export default function SignupPage() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const router = useRouter();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const { res, loading } = useServerAction(
    createUser,
    {
      username: form.username,
      password: form.password,
    },
    () => router.push("/login")
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.username || !form.password || !form.confirmPassword)
      toast.error(MESSAGES.fillInp);

    if (form.password !== form.confirmPassword)
      toast.error(MESSAGES.confirmPass);

    res();
  };
  
  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center bg-white max-sm:p-6"
    >
      <div className="max-xl:hidden w-full">
        <Image
          src={images.signupimage}
          width={1950}
          height={1300}
          alt="auth-signup"
          style={{ width: "1950px", height: "100vh" }}
          priority
          className="w-full h-screen object-cover"
        />
      </div>
      <div className="flex items-center justify-center xl:w-[70%] max-xl:w-full max-xl:h-screen">
        <div className="sm:w-[400px] max-xl:w-full">
          <div>
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
                label="Username *"
                value={form.username}
                onChange={changeHandler}
                wrapperClassName="flex flex-1 xl:min-w-[400px] min-w-[200px]"
              />
            </div>
            <div className="flex flex-col gap-1 relative">
              <CustomInp
                type="password"
                label="Password *"
                name="password"
                value={form.password}
                onChange={changeHandler}
                wrapperClassName="w-full flex flex-1 min-w-[250px] h-fit"
              />
            </div>
            <div className="flex flex-col gap-1 relative">
              <CustomInp
                type="password"
                label="Confirm Password *"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={changeHandler}
                wrapperClassName="w-full flex flex-1 min-w-[250px] h-fit"
              />
            </div>
            <CustomBtn type="submit" title="Sign Up" isLoading={loading} />
            <div className="flex items-center justify-center gap-4 text-sm font-bold">
              <p>Already have account?</p>
              <Link
                href="/login"
                className="bg-gray-100 border text-center py-1 px-4 rounded-lg"
              >
                Login
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
