"use client";

import { useRouter } from "next/navigation";

export default function Pagination({ totalPages, searchParams }) {
  const router = useRouter();

  const currentPage = Number(searchParams.page) || 1;

  const nextPage = () => {
    const search = new URLSearchParams(window.location.search);
    const newPage = currentPage + 1;

    search.set("page", newPage);

    const newPathName = `${window.location.pathname}?${search.toString()}`;
    router.push(newPathName);
  };

  const prevPage = () => {
    const search = new URLSearchParams(window.location.search);
    const newPage = currentPage - 1;

    search.set("page", newPage);

    const newPathName = `${window.location.pathname}?${search.toString()}`;
    router.push(newPathName);
  };

  return (
    <section className="flex items-center gap-3 mt-[50px] w-full justify-center">
      <button
        type="button"
        onClick={() => prevPage()}
        disabled={currentPage === 1}
        className={`${
          currentPage === 1
            ? "bg-gray-200 text-gray-600 cursor-not-allowed"
            : "bg-black text-white"
        } rounded-xl py-2 px-4 text-[14px]`}
      >
        Prev
      </button>
      <p className="cardShadow rounded-xl py-2 px-6">
        {currentPage} / {totalPages}
      </p>
      <button
        type="button"
        onClick={() => nextPage()}
        disabled={currentPage === totalPages}
        className={`${
          currentPage === totalPages
            ? "bg-gray-200 text-gray-600 cursor-not-allowed"
            : "bg-black text-white"
        } rounded-xl py-2 px-4 text-[14px]`}
      >
        Next
      </button>
    </section>
  );
}
