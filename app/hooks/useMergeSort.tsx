import { useState, useEffect } from "react";

const useMergeSort = (array: number[]) => {
  const [sortedArray, setSortedArray] = useState(array);
  const [isSorted, setIsSorted] = useState(false);

  useEffect(() => {
    const merge = (left: number[], right: number[]) => {
      let resultArray: number[] = [],
        leftIndex = 0,
        rightIndex = 0;
      while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
          resultArray.push(left[leftIndex]);
          leftIndex++;
        } else {
          resultArray.push(right[rightIndex]);
          rightIndex++;
        }
      }
      return resultArray
        .concat(left.slice(leftIndex))
        .concat(right.slice(rightIndex));
    };

    const mergeSort: any = (array: number[]) => {
      if (array.length <= 1) {
        return array;
      }
      const middle = Math.floor(array.length / 2);
      const left = array.slice(0, middle);
      const right = array.slice(middle);
      return merge(mergeSort(left), mergeSort(right));
    };

    setSortedArray(mergeSort(array));
    setIsSorted(true);
  }, [array]);

  return { sortedArray, isSorted };
};

export default useMergeSort;
