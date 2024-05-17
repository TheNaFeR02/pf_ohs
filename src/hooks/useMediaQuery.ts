import { useEffect, useState } from "react";

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(
    typeof window !== "undefined" ? window.matchMedia(query).matches : false
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const listener = (event: MediaQueryListEvent) => setMatches(event.matches);

    mediaQuery.addEventListener("change", listener);
    setMatches(mediaQuery.matches);

    return () => mediaQuery.removeEventListener("change", listener);
  }, [query]);

  return matches;
}

export { useMediaQuery };
