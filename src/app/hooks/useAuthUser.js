'use client'
import { useEffect, useContext, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/app/firebase"
import { useRouter } from "next/navigation"
import AuthContext from "@/app/context/AuthContext"
import { doc, getDoc } from 'firebase/firestore';
import { db } from "@/app/firebase"

export const useAuthUser = () => {
  const { push, pathname } = useRouter();
  const { setisLogged } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState(null); 

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      let userLogged = user === null ? false : true;
      
      if (!userLogged) {
        push("/");
        setisLogged(false);
        setCurrentUser(null); 
      } else {
        try{
          setisLogged(true);
          const userDoc = await getDoc(doc(db, "users", user.uid));
          const userData = userDoc.data();
          console.log(userDoc.tarjetas)
          setCurrentUser({ 
            nombre: userData.nombre,
            id: user.uid
          });
          if (pathname === "/") {
            push("/dashboard");
          }
        } catch (error) {
          console.error("Error al obtener datos del usuario:", error);
        }
      }
    });
  }, []);

  return { currentUser };
};