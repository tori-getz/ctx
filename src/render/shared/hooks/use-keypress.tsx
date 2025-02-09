import { useEffect } from "react";

export const useKeyPress = (keys: string[], callback: (event: KeyboardEvent) => void, deps: any[] = []) => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (keys.includes(event.key)) {
        callback(event);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [keys, callback, ...deps]);
}