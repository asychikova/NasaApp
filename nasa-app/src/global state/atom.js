import { atom } from "jotai";

export const searchTermAtom = atom("galaxy");
export const currentPageAtom = atom(1);
export const userName = atom(localStorage.getItem("username") || null);

// export const userName = atom(() => {
//   // Initialize from local storage if available
//   const savedUserName = localStorage.getItem("username");
//   return savedUserName || null;
// });

// Create an effect to save the username to local storage
// // onMount, allows us to run side effects when an atom is initialized or when it's first accessed.
// userName.onMount = (setAtom) => {
//   const savedUserName = localStorage.getItem("username");
//   if (savedUserName) {
//     setAtom(savedUserName);
//   }
//   // Save username to local storage when it changes
//   //Whenever the atom's state changes (e.g., when the username is updated), this function will be called. It updates local storage with the new value of the username.
//   setAtom((username) => {
//     if (username) {
//       localStorage.setItem("username", username);
//     } else {
//       localStorage.removeItem("username");
//     }
//   });
// };
