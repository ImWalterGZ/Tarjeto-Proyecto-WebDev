import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Image
        src="/LogoRedPrimary.png" // Put your logo in the public folder
        alt="Logo Tarjeto"
        width={150}
        height={150}
      />
    </div>
  );
}
