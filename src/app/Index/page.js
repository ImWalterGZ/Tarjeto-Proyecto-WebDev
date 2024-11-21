'use client'
import { useContext } from "react";
import AuthContext from "@/app/context/AuthContext";
import { useAuthUser } from "@/app/hooks/useAuthUser";

export default function Index(){
    useAuthUser();
    const { isLogged } = useContext(AuthContext);

    return(
        <div>Hola
            {isLogged === false && (<p>logeate</p>)}
        </div>
    );
}