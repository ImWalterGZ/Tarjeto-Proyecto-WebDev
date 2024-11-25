import AnadirLugar from "./AnadirLugar";
import Card from "./Card";
export default function CardContainer() {
  return (
    <div className="flex flex-col items-center justify-center bg-stone-100 w-8/12 rounded-xl">
      <div
        id="cardContainer"
        className="flex flex-wrap items-center w-full h-auto gap-4  justify-center "
      >
        <Card
          logoSrc="Card 1"
          nombreNegocio="Shugu"
          requisitoMinimo={12}
          visitas={2}
          nivel={1}
        />
        <Card
          logoSrc="Card 2"
          nombreNegocio="Rosetta"
          requisitoMinimo={24}
          visitas={6}
          nivel={2}
        />
        <Card
          logoSrc="Card 4"
          nombreNegocio="Maikel"
          requisitoMinimo={24}
          visitas={20}
          nivel={3}
        />
        <Card
          logoSrc="Card 3"
          nombreNegocio="Trinity"
          requisitoMinimo={24}
          visitas={10}
          nivel={2}
        />
      </div>
      <AnadirLugar />
    </div>
  );
}
