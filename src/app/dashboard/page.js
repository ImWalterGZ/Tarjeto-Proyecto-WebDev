"use client"; // Add this if you need client-side features
import Logo from "./Components/Logo";
import CardContainer from "./Components/CardContainer";
import WelcomeUser from "./Components/WelcomeUser";
export default function Dashboard() {
  return (
    <div className="flex flex-col justify-center align-middle">
      <div className="flex h-12 justify-center items-center">
        <Logo />
      </div>
      <div className="my-16">
        <WelcomeUser />
      </div>
      <div>
        <CardContainer />
      </div>
    </div>
  );
}
