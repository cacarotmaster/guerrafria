
import { Flag, Calendar } from "lucide-react";

interface GameHeaderProps {
  currentEvent: string;
  level: number;
}

export function GameHeader({ currentEvent, level }: GameHeaderProps) {
  return (
    <header className="bg-gradient-to-r from-red-900 to-blue-900 text-white py-6 px-10 flex flex-col md:flex-row justify-between items-center shadow-xl w-full animate-fade-in mb-10 rounded-b-xl">
      <div className="flex items-center gap-4 mb-3 md:mb-0">
        <Flag className="w-10 h-10 text-yellow-400 drop-shadow" />
        <h1 className="font-mono text-3xl tracking-widest font-bold flicker">
          La Guerra Fría: Misión Secreta
        </h1>
      </div>
      <div className="flex items-center gap-3 text-lg font-semibold">
        <Calendar className="w-6 h-6 opacity-80" />
        <span>
          {`Nivel ${level}: ${currentEvent}`}
        </span>
      </div>
    </header>
  )
}
