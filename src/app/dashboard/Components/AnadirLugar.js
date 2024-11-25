'use client'
import { db } from "@/app/firebase"
import { collection, query, where, getDocs, addDoc} from 'firebase/firestore';
import { useState } from "react";

export default function AnadirLugar({userId}) {
  const [codigoUs, setCodigoUs] = useState("");

  const obtenerNegocio = async (codigo) => {
    try {
      const negociosRef = collection(db, 'negocios');
      const q = query(negociosRef, where('codigo', '==', codigo));
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        alert("No se encontro el negocio.")
        return null;
      }
      if(await contieneTarjeta(snapshot.docs[0].data().nombre)){
        return null;
      }

      console.log({
        nombre:snapshot.docs[0].data().nombre,
        visitasMinimas: snapshot.docs[0].data().VisitasMinimas,
        visitas: 0
      })
      agregarTarjeta(snapshot.docs[0].data().nombre, snapshot.docs[0].data().VisitasMinimas);
  
    } catch (error) {
      console.error('Error al obtener negocio:', error);
      throw error;
    }
  };

  const agregarTarjeta = async (nombre, visitasMinimas) => {
    try {
      // Obtén la referencia de la subcolección
      const tarjetasRef = collection(db, 'users', userId, 'tarjetas');
      
      // Agrega un nuevo documento a la subcolección
      await addDoc(tarjetasRef, {
        nombreNegocio: nombre,
        requisitoMinimo: visitasMinimas,
        nivel: 0,
        visitas: 0
      });
  
      console.log("Tarjeta agregada correctamente.");
    } catch (error) {
      console.error("Error al agregar tarjeta:", error.stack);
    }
  };


  const contieneTarjeta = async (nombre) =>{
    try {
      const negociosRef = collection(db, 'users',userId,'tarjetas');
      const q = query(negociosRef, where('nombreNegocio', '==', nombre));
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        return false;
      }
      alert("Ya cuenta con esta tarjeta.")
      return true;
  
    } catch (error) {
      console.error('Error al obtener negocio:', error);
      throw error;
    }
  };

  return (
    <div className="flex flex-col justify-center align-middle items-center py-4 bg-white w-1/2 rounded-lg mb-5 ">
      <div className="flex flex-row text-primary font-bold ">
        <img
          src="https://api.iconify.design/tabler/map-pin-plus.svg"
          alt="Add location icon"
          className="w-6 h-6 inline-block mr-2"
        />
        <p>¡Añade un lugar a tu wallet!</p>
      </div>
      <div className="flex w-full items-center justify-center align-middle pt-2">
        <input
          type="text"
          value={codigoUs}
          onChange={(e)=>setCodigoUs(e.target.value)}
          placeholder="Ingresa el código del lugar"
          className="border rounded-md w-10/12 h-10 py-4 bg-neutral-100 border-neutral-300 p-5"
        />
        <button onClick={()=>obtenerNegocio(codigoUs)}>agregar</button>
      </div>
    </div>
  );
}
