"use client"; // Add this if you need client-side features
import Logo from "./Components/Logo";
import NegociosContainer from "./Components/NegociosContainer";
import MejoresUsers from "./Components/MejoresUsers";
import { useAuthUser } from "@/app/hooks/useAuthUser";

export default function Dashboard() {
  const { currentUser, reloadTrigger } = useAuthUser();
  return (
    <div className="flex flex-col justify-center align-middle">
      <div className="flex h-12 justify-center items-center">
        <Logo />
      </div>
      <div className="flex justify-center text-neutral-600 font-bold text-3xl my-16">
        Zona de administrador
      </div>
      <div id="CardContDisplay" className="grid grid-cols-1 md:grid-cols-2 w-full justify-center items-start gap-12">
        <NegociosContainer reloadTrigger={reloadTrigger} />
        <MejoresUsers />
      </div>
    </div>
  );
}
