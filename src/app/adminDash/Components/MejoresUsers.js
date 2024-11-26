import AnadirLugar from "./AnadirLugar";
import UserCards from "./UserCards";

export default function MejoresUsers() {
  return (
    <div>
      <div className="flex justify-center text-[#f4262f] font-bold text-3xl my-4">
        <h2>Mejores usuarios</h2>
      </div>
      <div className="flex flex-wrap items-start justify-between bg-stone-100 w-full min-w-85 rounded-xl p-5">
      <UserCards nombreUser="Mario" />
      <UserCards nombreUser="Pere" />
      <UserCards nombreUser="Esteban" />
      <UserCards nombreUser="carlos" />
    </div>

    </div>
    
  );
}
