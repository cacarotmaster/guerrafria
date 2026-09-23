
import { User, Code, Book } from "lucide-react";

type Role = "espia" | "diplomatico" | "cientifico";

interface RoleSelectorProps {
  selected: Role|null;
  onSelect: (role: Role) => void;
}
const ROLES: { label: string, value: Role, icon: React.ReactNode, desc: string }[] = [
  {
    label: "Espía",
    value: "espia",
    icon: <Code className="w-8 h-8 text-red-500" />,
    desc: "Descifra códigos, obtén información secreta y opera desde las sombras.",
  },
  {
    label: "Diplomático",
    value: "diplomatico",
    icon: <User className="w-8 h-8 text-blue-600" />,
    desc: "Negocia crisis globales y representa a tu nación en la ONU.",
  },
  {
    label: "Científico",
    value: "cientifico",
    icon: <Book className="w-8 h-8 text-yellow-500" />,
    desc: "Desarrolla tecnologías y participa en la carrera espacial.",
  }
]

export function RoleSelector({ selected, onSelect }: RoleSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-8">
      {ROLES.map(role => (
        <button
          key={role.value}
          className={`p-6 rounded-xl border-2 hover:scale-105 transition shadow-md bg-card cursor-pointer outline-none
            ${selected === role.value ? "border-primary" : "border-muted"}
          `}
          onClick={() => onSelect(role.value)}
        >
          <div className="flex flex-col items-center justify-center">
            {role.icon}
            <span className="mt-3 font-bold text-lg">{role.label}</span>
            <span className="mt-2 text-xs text-muted-foreground">{role.desc}</span>
          </div>
        </button>
      ))}
    </div>
  );
}
