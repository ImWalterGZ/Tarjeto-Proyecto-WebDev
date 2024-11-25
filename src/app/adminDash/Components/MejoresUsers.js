import AnadirLugar from "./AnadirLugar";
import UserCards from "./UserCards";

export default function MejoresUsers() {
  return (
    <div className="flex flex-wrap items-center justify-center bg-stone-100 w-8/12 rounded-xl">
      <UserCards nombreUser="Mario" />
      <UserCards nombreUser="Pere" />
      <UserCards nombreUser="Esteban" />
      <UserCards nombreUser="carlos" />
    </div>
  );
}
