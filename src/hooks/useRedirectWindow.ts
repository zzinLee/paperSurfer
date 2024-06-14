import { useEffect } from "react";
import type { Dispatch, SetStateAction } from "react";

const useRedirectWindow =
  (url: string, isLinkClick: boolean, setIsLinkClick: Dispatch<SetStateAction<boolean>>) => {
    useEffect(() => {
      if (isLinkClick) {
        setIsLinkClick(false);

        window.open(url, "_blank", "noopener, noreferrer");
      }
    }, [isLinkClick, url, setIsLinkClick]);
};

export default useRedirectWindow;
