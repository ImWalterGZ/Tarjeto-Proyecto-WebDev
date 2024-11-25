import Image from "next/image";

export default function Card({
  logoSrc,
  nombreNegocio = "Negocio sin nombre",
  requisitoMinimo = 1,
  visitas = 0,
  nivel = nivel || 1,
}) {
  const calculateVisitPercentage = (visitas, requisitoMinimo) => {
    if (requisitoMinimo === 0) return 0;
    return (Number(visitas) / Number(requisitoMinimo)) * 100;
  };

  const determinarColor = (nivel) => {
    if (nivel === 1) {
      return "bg-gradient-to-br from-red-500 to-red-700";
    } else if (nivel === 2) {
      return "bg-gradient-to-br from-cyan-600 to-slate-500";
    } else if (nivel === 3) {
      return "bg-gradient-to-br from-yellow-300 to-yellow-500";
    }
    return "bg-primary";
  };

  const obtenerClaseAncho = (visitPercentage) => {
    if (visitPercentage >= 91) return "w-11/12";
    if (visitPercentage >= 81) return "w-10/12";
    if (visitPercentage >= 71) return "w-9/12";
    if (visitPercentage >= 61) return "w-8/12";
    if (visitPercentage >= 51) return "w-7/12";
    if (visitPercentage >= 41) return "w-6/12";
    if (visitPercentage >= 31) return "w-5/12";
    if (visitPercentage >= 21) return "w-4/12";
    if (visitPercentage >= 11) return "w-3/12";
    if (visitPercentage >= 1) return "w-2/12";
    return "w-1/12";
  };

  const visitPercentage = calculateVisitPercentage(visitas, requisitoMinimo);

  return (
    <div className="relative flex w-96 h-44 my-4 mx-2 z-20 bg-white items-center rounded-3xl drop-shadow-md ">
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
        className={`${determinarColor(nivel)} ${obtenerClaseAncho(
          calculateVisitPercentage(visitas, requisitoMinimo)
        )} h-full rounded-3xl  border-red-500`}
      ></div>
      <div className="absolute left-60 flex flex-col text-right">
        <div className="text-neutral-700 text-5xl drop-shadow">
          {visitPercentage.toFixed(0)}%
        </div>
        <div className="text-neutral-500">
          {visitas}/{requisitoMinimo}
        </div>
      </div>
    </div>
  );
}
