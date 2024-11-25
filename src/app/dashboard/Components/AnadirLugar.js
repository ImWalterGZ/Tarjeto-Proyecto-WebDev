export default function AnadirLugar() {
  return (
    <div className="flex flex-col justify-center align-middle items-center py-4 bg-white w-1/2 rounded-lg mb-5 ">
      <div className="flex flex-row text-primary font-bold ">
        <img
          src="https://api.iconify.design/tabler/map-pin-plus.svg"
          alt="Add location icon"
          className="w-6 h-6 inline-block mr-2"
        />
        <p>¡Añade un lugar a tu wallter!</p>
      </div>
      <div className="flex w-full items-center justify-center align-middle pt-2">
        <input
          type="text"
          placeholder="Ingresa el código del lugar"
          className="border rounded-md w-10/12 h-10 py-4 bg-neutral-100 border-neutral-300 p-5"
        />
      </div>
    </div>
  );
}
