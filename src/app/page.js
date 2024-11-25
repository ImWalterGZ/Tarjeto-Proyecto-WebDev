'use client'
import { useEffect, useState } from "react";
import { Login } from "./components/Login";
import Image from 'next/image'
import Registro from "./components/Registro";

export default function Home() {
  const [isRegistro, setRegistro] = useState(false);

  return (
    <div className="bg-[#f4262f] min-h-screen p-5">
      <div className="flex justify-center items-center min-h-[calc(100vh-2.5rem)] bg-white rounded-xl shadow-md">
        <div className="flex bg-[#000000] bg-opacity-5 p-4 rounded-xl transition-all">
          <div className="bg-white p-10 rounded-xl shadow-md transition-all">
          {isRegistro ? <Registro setRegistro={() => setRegistro(false)} /> :<Login setRegistro={() => setRegistro(true)}/> }
            </div>
        </div>
      </div>
    </div>
  );
}
