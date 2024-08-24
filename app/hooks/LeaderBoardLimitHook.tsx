import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export function useLeaderboardLimit(): [number, (limit: number) => void] {
  const searchParams = useSearchParams();
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
    const url = new URL(window.location.href);
    url.searchParams.set("limit", String(limit));
    window.history.pushState({}, "", url.toString());
  }

  useEffect(() => {
    setLimitLocal(getLimitFromSearchParams(searchParams));
  }, [searchParams]);

  return [limit, setLimit];
}
