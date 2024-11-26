import AnadirLugar from "./AnadirLugar";
import Card from "./Card";
export default function CardContainer({ userId, tarjetas, reload }) {
  return (
    <div className="flex flex-col items-center justify-center bg-stone-100 w-8/12 rounded-xl">
      <div
        id="cardContainer"
        className="flex flex-wrap items-center w-full h-auto gap-4  justify-center "
      >
        {tarjetas.map((tarjeta) => (
          <Card
            key={tarjeta.id}
            logoSrc="Card 1"
            nombreNegocio={tarjeta.nombreNegocio}
            requisitoMinimo={tarjeta.requisitoMinimo}
            visitas={tarjeta.visitas}
            nivel={tarjeta.nivel}
          />
        ))}
        
      </div>
      <AnadirLugar userId={userId} reload={reload}/>
    </div>
  );
}
