'use client'
import { useEffect, useState } from "react";
import { Login } from "./components/Login";
import Image from 'next/image'
import Registro from "./components/Registro";

export default function Home() {
  const [isRegistro, setRegistro] = useState(false);

  return (
    <div className="bg-red-500 py-[6.5%] h-screen">
      <div className="flex mx-[20%] h-full border-2 border-black bg-white">
        <div className="basis-1/2 flex justify-end relative ">
            <Image 
            src="/images/loginImg.jpg" 
            alt="Descripción de la imagen"
            fill
            className="object-cover"
            />
        </div>
        <div className="basis-1/2 pb-10 pl-4">
          {isRegistro ? <Registro setRegistro={() => setRegistro(false)} /> :<Login setRegistro={() => setRegistro(true)}/> }
        </div>
      </div>
    </div>
  );
}
