import { useEffect } from "react";

export const usePageTitle = (title) => {
  useEffect(() => {
    const baseTitle = "passGen";
    document.title = title ? `${title} | ${baseTitle}` : baseTitle;
  }, [title]);
};