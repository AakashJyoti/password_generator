import { useCallback, useRef } from "react";

const useCopyClipboard = (value: string) => {
  const valueRef = useRef<HTMLInputElement | null>(null);

  const copyFunc = useCallback(() => {
    valueRef.current?.select();
    // console.log(valueRef.current?.value);

    window.navigator.clipboard.writeText(value);
  }, [value]);

  return {
    copyFunc,
    valueRef,
  };
};
export default useCopyClipboard;
