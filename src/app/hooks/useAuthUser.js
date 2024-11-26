'use client'
import { useEffect, useContext, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/app/firebase"
import { useRouter } from "next/navigation"
import AuthContext from "@/app/context/AuthContext"
import { doc, getDoc, getDocs, collection} from 'firebase/firestore';
import { db } from "@/app/firebase"

export const useAuthUser = () => {
  const { push, pathname } = useRouter();
  const { setisLogged } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState(null); 
  const [tarjetas, setTarjetas] = useState(null); 
  const [reloadTrigger, setReloadTrigger] = useState(0);
  const reload = () => setReloadTrigger((prev) => prev + 1);

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
          const userDocRef = doc(db, "users", user.uid); 
          const userDoc = await getDoc(userDocRef);
          const userData = userDoc.data();
          const tarjetasRef = collection(db, "users", user.uid, "tarjetas"); 
          const tarjetasSnapshot = await getDocs(tarjetasRef); 
          setTarjetas(tarjetasSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
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
  }, [reloadTrigger]);

  return { currentUser, tarjetas, reload, reloadTrigger };
};