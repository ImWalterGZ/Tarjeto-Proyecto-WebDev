import Image from "next/image";

export default function NegociosCards({
  logoSrc,
  nombreNegocio = "Negocio sin nombre",
  codigo = "",
}) {
  return (
    <div className="relative flex w-5/12 h-44 my-4 mx-2 z-20 bg-white items-center rounded-3xl justify-center drop-shadow-md">
      <div className="absolute flex flex-row align-middle items-center gap-3 p-6">
        <div className="w-20">
          <Image
            src={"/Shugu.png"}
            width={500}
            height={500}
            alt={`Logo de ${nombreNegocio}`}
          />
        </div>

        <div id="Nombre negocio" className="drop-shadow-md text-white text-2xl">
          <p className="drop-shadow-md bg-zinc-400 px-2 py-1">
            {nombreNegocio}
          </p>
        </div>
      </div>
      <div
        id="codeHolder"
        className="absolute bottom-0 left-0 right-0 flex items-center justify-center text-black mb-2"
      >
        {codigo}
      </div>
    </div>
  );
}
