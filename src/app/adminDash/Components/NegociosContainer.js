'use client'
import { useState, useEffect } from "react";
import {collection, getDocs} from 'firebase/firestore';
import NegociosCards from "./NegociosCard";
import { db } from "@/app/firebase"

async function fetchCollectionData() {
  try {
    const collectionRef = collection(db, 'negocios');
    const querySnapshot = await getDocs(collectionRef);
    const data = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching collection data:", error);
    return [];
  }
}

export default function NegociosContainer( { reloadTrigger }) {
  const [negocios, setNegocios] = useState([]);

  useEffect(() => {
    async function loadData() {
      const collectionData = await fetchCollectionData();
      setNegocios(collectionData);
      
    }
    
    loadData();
  }, [reloadTrigger]);


  return (
    <div>
    <div className="flex justify-center text-[#f4262f] font-bold text-3xl my-4">
        <h2>Lugares registrados</h2>
      </div>
      <div className="flex flex-col w-full min-w-85 items-center justify-center bg-stone-100 rounded-xl p-5">
      <div
        id="cardContainer"
        className="flex flex-wrap items-start justify-between w-full h-auto gap-1"
      >
        {negocios.map((negocio) => (
          <NegociosCards 
            key={negocio.id}
            logoSrc="Card 1"
            nombreNegocio={negocio.nombre}
            codigo={negocio.codigo}
          />
        ))}
      </div>
    </div>
    </div>
    
  );
}
