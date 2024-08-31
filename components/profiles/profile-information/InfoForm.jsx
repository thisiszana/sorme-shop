"use client";

import { Close } from "@/components/icons/Icons";
import Loader from "@/components/shared/Loader";
import { useRouter } from "next/navigation";
import { useState } from "react";
import RadioList from "./RadioList";
import Forms from "./Forms";
import moment from "moment";
import CustomBtn from "@/components/shared/CustomBtn";

export default function InfoForm(props) {
  const { username, displayName, phoneNumber, address, gender, createdAt } =
    props?.user;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    username: username || "",
    displayName: displayName || "",
    phoneNumber: phoneNumber || "",
    address: address || "",
    gender: gender || "",
  });

  const router = useRouter();

  const submitForm = async (e) => {};

  return (
    <div>
      <div className="mb-2 flex justify-end">
        <p className="subtitle">
          Joined At {moment(createdAt).subtract(10, "days").calendar()}
        </p>
      </div>
      <form onSubmit={submitForm}>
        <div className="space-y-5 mb-5">
          <Forms
            label="Username/Password"
            name="username"
            form={form}
            setForm={setForm}
            className="border border-gray-200 focus:outline py-2 px-4 rounded-lg"
          />
          <Forms
            label="Display Name"
            name="displayName"
            form={form}
            setForm={setForm}
            className="border border-gray-200 focus:outline py-2 px-4 rounded-lg"
          />
          <Forms
            label="Phone Number"
            name="phoneNumber"
            form={form}
            setForm={setForm}
            className="border border-gray-200 focus:outline py-2 px-4 rounded-lg"
          />
          <Forms
            label="Address"
            name="address"
            form={form}
            setForm={setForm}
            textarea={true}
            className="border border-gray-200 outline-none py-2 px-4 rounded-lg"
          />
          <RadioList form={form} setForm={setForm} />
        </div>
        {error && (
          <div className="bg-orange-100 rounded-md py-2 px-4 border-l-4 border-orange-500 mb-4 flex justify-between">
            <p className="text-orange-500 font-medium text-[14px] ">{error}</p>
            <button
              type="button"
              className="text-red-500 text-[14px]"
              onClick={() => setError("")}
            >
              <Close />
            </button>
          </div>
        )}
        <CustomBtn
          type="submit"
          title="Submit"
          isLoading={loading}
          classNames="text-[15px] bg-green-500 font-bold rounded-lg h-[35px] shadow w-full flex justify-center items-center mt-[30px] text-white"
        />
      </form>
    </div>
  );
}