"use client";

import { useRouter } from "next/navigation";

import { useState } from "react";

import { Close, Search } from "@/components/icons/Icons";

export default function SearchProducts() {
  const router = useRouter();

  const search = new URLSearchParams(window.location.search);

  const [query, setQuery] = useState(
    search.has("search") ? search.get("search") : ""
  );

  const submitHandler = (e) => {
    e.preventDefault();

    if (!query) router.push("/products");

    if (search.has("page")) search.delete("page");

    search.set("search", query);

    const newPathName = `${window.location.pathname}?${search.toString()}`;
    router.push(newPathName);
  };

  const clearSearchHandler = () => {
    setQuery("");
    router.push("/products");
  };

  return (
    <section className="w-full">
      <form className="flex justify-center" onSubmit={submitHandler}>
        <div className="flex items-center w-full bg-gray-100 rounded-lg">
          <button type="submit" className="p-4 iconSize text-gray-500">
            <Search />
          </button>
          <div className="h-full py-[13px] mr04">
            <div className="w-[1px] h-full bg-gray-300" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Searching for ..."
            className="py-3 pr-4 bg-transparent w-full placeholder:text-[14px] placeholder:font-light outline-none"
          />
          {query && (
            <>
              <div className="h-full py-[13px]">
                <div className="w-[1px] h-full bg-gray-300" />
              </div>
              <button
                type="button"
                className="p-4 text-gray-500"
                onClick={() => clearSearchHandler()}
              >
                <Close />
              </button>
            </>
          )}
        </div>
      </form>
    </section>
  );
}
