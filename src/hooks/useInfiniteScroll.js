import { useCallback, useRef } from "react";

export const useInfiniteScroll = (hasMore, fetchStatus, callback) => {
  const observer = useRef();

  const lastElementRef = useCallback(
    (node) => {
      if (fetchStatus === "loading") return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          callback();
        }
      });

      if (node) observer.current.observe(node);
    },
    [fetchStatus, hasMore, callback]
  );

  return lastElementRef;
};
