import { useState, useEffect } from "react";

const useSortArrayAlpha = (array: string[]) => {
  const [sortedArray, setSortedArray] = useState<string[]>([]);

  useEffect(() => {
    setSortedArray(
      array.sort((a, b) => {
        if (a.toLocaleLowerCase(b)) {
          return -1;
        }
        if (a.toLocaleLowerCase(b)) {
          return 1;
        }
        return 0;
      })
    );
  }, [array]);

  return sortedArray;
};

export default useSortArrayAlpha;
