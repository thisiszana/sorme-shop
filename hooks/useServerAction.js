"use client";

import { useState } from "react";

import toast from "react-hot-toast";

const useServerAction = (asyncAction, reqInp, pushToAnotherPage) => {
  const [loading, setLoading] = useState(false);

  const res = async () => {
    setLoading(() => true);

    const result = await asyncAction(reqInp);

    setLoading(() => false);

    if (result.code === 200 || result.code === 201) {
      toast.success(result.message);
      pushToAnotherPage && pushToAnotherPage();
    } else {
      toast.error(result.message);
    }
  };

  return {
    res,
    loading,
  };
};
export default useServerAction;
