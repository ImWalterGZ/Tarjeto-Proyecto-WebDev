import Image from "next/image";

export default function WelcomeUser( { nombreUser } ) {
  return (
    <div className="flex flex-row items-center justify-center gap-6 w-full h-auto">
      <div className="relative h-24">
        <Image
          src="/moi.png" // aqui debe de ir la ruta de la foto, como user.profileImage de la query a firebase
          alt="Tu foto de perfil"
          width={250}
          height={250}
          className="rounded-full h-full w-full"
        />
      </div>
      <div className="h-full">
        <p className="text-primary">¡Buenas buenas,</p>
        <p className="text-stone-700 font-bold text-4xl">{nombreUser}</p>
      </div>
    </div>
  );
}
