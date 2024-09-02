"use client";

const { getSession } = require("@/services/queries");
const { QUERY_KEY } = require("@/services/queriesKey");
const { useQuery } = require("@tanstack/react-query");

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
