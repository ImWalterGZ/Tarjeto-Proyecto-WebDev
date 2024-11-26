import Image from "next/image";

export default function UserCards({ logoSrc, nombreUser = "User1" }) {
  return (
    <div className="relative flex w-3/12 min-w-8 h-44 my-4 mx-2 z-20 bg-gradient-to-br from-cyan-600 to-slate-500 items-center rounded-3xl justify-center drop-shadow-md">
      <div className="absolute flex flex-col align-middle items-center gap-3 p-6">
        <div className="w-20">
          <Image src={"/Shugu.png"} width={500} height={500} alt={""} />
        </div>

        <div id="Nombre negocio" className="drop-shadow-md text-white text-2xl">
          <p className="drop-shadow-md bg-zinc-400 px-2 py-1">{nombreUser}</p>
        </div>
      </div>
      <div
        id="codeHolder"
        className="absolute bottom-0 left-0 right-0 flex items-center justify-center text-black mb-2"
      >
        {""}
      </div>
    </div>
  );
}
