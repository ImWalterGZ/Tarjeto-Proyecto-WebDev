'use client'
import { useEffect, useContext } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/app/firebase"
import { useRouter } from "next/navigation"
import AuthContext from "@/app/context/AuthContext"

export const useAuthUser = () => {
    const { push, pathname } = useRouter();

  const { setisLogged } = useContext(AuthContext);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
          let userLogged = user === null ? false : true;
    
          if (!userLogged) {
            push("/");
            setisLogged(false);
          } else {
            setisLogged(true);
            if (pathname === "/") {
              push("/dashboard");
            }
          }
        });
      }, []);
}