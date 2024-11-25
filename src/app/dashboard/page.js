"use client"; // Add this if you need client-side features
import Logo from "./Components/Logo";
import CardContainer from "./Components/CardContainer";
import WelcomeUser from "./Components/WelcomeUser";
import { useAuthUser } from "@/app/hooks/useAuthUser";

export default function Dashboard() {
  const { currentUser } = useAuthUser();
  return (
    <div className="flex flex-col justify-center align-middle">
      <div className="flex h-12 justify-center items-center">
        <Logo />
      </div>
      <div className="my-16">
        <WelcomeUser nombreUser={currentUser ? currentUser.nombre : 'Cargando...'}/>
      </div>
      <div id="CardContDisplay" className="flex justify-center items-center">
        <CardContainer />
      </div>
    </div>
  );
}
