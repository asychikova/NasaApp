import { atom } from "jotai";

export const searchTermAtom = atom("galaxy");
export const currentPageAtom = atom(1);

export const userName = atom(null);

userName.onMount = (setAtom) => {
  const savedUserName = localStorage.getItem("username");
  if (savedUserName) {
    setAtom(savedUserName);
  }
};
