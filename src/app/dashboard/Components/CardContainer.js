import Card from "./Card";
export default function CardContainer() {
  return (
    <div className="flex flex-wrap gap-4 bg-stone-200 rounded-lg">
      <Card />
      <Card />
      <Card />
    </div>
  );
}
