import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

export function useLeaderboardPage(): [number, (page: number) => void] {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPageLocal] = useState<number>(
    getPageFromSearchParams(searchParams),
  );

  function getPageFromSearchParams(searchParams: URLSearchParams): number {
    const page = Number(searchParams.get("page"));
    if (page < 1) {
      return 1;
    }
    return page;
  }

  function setPage(page: number) {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("page", String(page));
      return next;
    });
  }

  useEffect(() => {
    setPageLocal(getPageFromSearchParams(searchParams));
  }, [searchParams]);

  return [page, setPage];
}
