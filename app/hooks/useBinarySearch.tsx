import { useState, useEffect } from "react";

const useBinarySearch = (array: number[], target: number) => {
  const [index, setIndex] = useState<number>(-1);

  useEffect(() => {
    let start = 0;
    let end = array.length - 1;
    let middle = Math.floor((start + end) / 2);

    while (array[middle] !== target && start <= end) {
      if (target < array[middle]) {
        end = middle - 1;
      } else {
        start = middle + 1;
      }
      middle = Math.floor((start + end) / 2);
    }

    if (array[middle] === target) {
      setIndex(middle);
    }
  }, [array, target]);

  return index;
};

export default useBinarySearch;
