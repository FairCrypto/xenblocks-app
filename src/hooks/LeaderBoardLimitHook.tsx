import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

export function useLeaderboardLimit(): [number, (limit: number) => void] {
  const [searchParams, setSearchParams] = useSearchParams();
  const [limit, setLimitLocal] = useState<number>(
    getLimitFromSearchParams(searchParams),
  );

  function getLimitFromSearchParams(searchParams: URLSearchParams): number {
    const limit = Number(searchParams.get("limit"));
    if (limit < 1) {
      return 100;
    }
    return limit;
  }

  function setLimit(limit: number) {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("limit", String(limit));
      return next;
    });
  }

  useEffect(() => {
    setLimitLocal(getLimitFromSearchParams(searchParams));
  }, [searchParams]);

  return [limit, setLimit];
}
