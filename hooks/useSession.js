"use client";

import { useQuery } from "@tanstack/react-query";

import { QUERY_KEY } from "@/services/queriesKey";
import { getSession } from "@/services/queries";

const useSession = () => {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: [QUERY_KEY.user_session],
    queryFn: getSession,
    gcTime: 0,
    staleTime: 0,
  });

  return {
    data,
    error,
    isError,
    isLoading,
  };
};

export default useSession;
