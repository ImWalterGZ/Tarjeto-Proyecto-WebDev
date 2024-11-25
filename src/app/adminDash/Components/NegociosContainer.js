import AnadirLugar from "./AnadirLugar";

import NegociosCards from "./NegociosCard";
export default function NegociosContainer() {
  return (
    <div className="flex flex-col items-center justify-center bg-stone-100 w-8/12 mx-4 rounded-xl">
      <div
        id="cardContainer"
        className="flex flex-wrap items-center w-full h-auto gap-4  justify-center "
      >
        <NegociosCards
          logoSrc="Card 1"
          nombreNegocio="Shugu"
          codigo="Code111"
        />
        <NegociosCards
          logoSrc="Card 2"
          nombreNegocio="Rosetta"
          codigo="Code111"
        />
        <NegociosCards
          logoSrc="Card 4"
          nombreNegocio="Maikel"
          codigo="Code111"
        />
      </div>
    </div>
  );
}
