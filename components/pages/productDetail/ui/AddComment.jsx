"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import useSession from "@/hooks/useSession";
import Loader from "@/components/shared/Loader";
import useServerAction from "@/hooks/useServerAction";
import { addProductComment } from "@/actions/product.action";
import { MESSAGES } from "@/utils/message";
import CustomInp from "@/components/shared/CustomInp";

export default function AddComment({ productId }) {
  const { data: session, isLoading, isError } = useSession();
  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const router = useRouter();

  const { loading, res } = useServerAction(
    addProductComment,
    {
      form,
      productId,
      userId: session?.session?.userId,
    },
    () =>
      setForm({
        title: "",
        description: "",
      })
  );

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (session?.status !== "authorized") router.push("/login");

    if (!form.title || !form.description) toast.error(MESSAGES.fields);

    res();
  };

  if (isLoading) {
    return (
      <div className="w-full my-3 flex justify-center items-center">
        <Loader h={15} w={15} />
      </div>
    );
  }

  if (isError) {
    return "error";
  }
  return (
    <div className="my-[20px]">
      <h1 className="subheader mb-2">Add your Comment</h1>
      <form onSubmit={submitForm} className="flex flex-col gap-3">
        <CustomInp
          type="text"
          name="title"
          label="Title"
          value={form.title}
          onChange={changeHandler}
          className="input1"
        />
        <textarea
          rows={5}
          placeholder="Description"
          name="description"
          value={form.description}
          onChange={changeHandler}
          className="input1"
        />
        <button
          type="submit"
          className={`${
            loading ? "bg-gray-100" : "bg-black"
          } text-white rounded-lg w-[100px] h-[35px] text-[14px] flex items-center justify-center`}
        >
          {loading ? <Loader h={20} w={20} /> : "Submit"}
        </button>
      </form>
    </div>
  );
}
