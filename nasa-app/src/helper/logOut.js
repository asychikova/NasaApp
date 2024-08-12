import { useRouter } from "next/navigation";
import Link from "next/link";
import React from "react";
import { useAtom } from "jotai";
import { userName } from "@/global state/atom";

export default function LogOut() {
  const [theUserName, setTheUserName] = useAtom(userName);
  const router = useRouter();
  // https://nasa-app-server-p2d3.onrender.com
  // http://localhost:3003
  const handleLogout = async () => {
    try {
      const resp = await fetch(
        "https://nasa-app-server-p2d3.onrender.com/user/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (resp.ok) {
        localStorage.clear();
        setTheUserName(null);
        router.push("/"); // Redirect to login page
      } else {
        // Handle error
        console.error("Logout failed");
      }
    } catch (error) {
      console.log("Error in the logout ", error);
    }
  };
  return (
    <span onClick={handleLogout} className="nav-item">
      <Link
        className="w-100 btn btn-dark"
        href="/auth/register"
        style={{ whiteSpace: "nowrap" }}>
        Sing out
      </Link>
    </span>
  );
}
