import { Medal, Bomb, User, Heart, Award } from "lucide-react";

interface ScorePanelProps {
  score: number;
  lives?: number;
  badges?: number;
}

export function ScorePanel({ score, lives = 3, badges = 0 }: ScorePanelProps) {
  return (
    <div className="fixed right-4 md:right-8 top-4 md:top-8 z-30 bg-background bg-opacity-95 rounded-lg shadow-xl px-4 md:px-6 py-3 md:py-4 flex items-center gap-3 md:gap-4 border border-primary animate-fade-in">
      <Medal className="text-yellow-500 hidden md:block" size={28} />
      <span className="hidden md:inline font-bold tracking-wider text-sm">Poder Geopolítico:</span>
      <span className="md:hidden font-bold tracking-wider text-sm">PG:</span>
      <span
        className={`text-2xl font-mono ${
          score > 0 ? "text-green-600" : score < 0 ? "text-red-500" : "text-gray-700"
        } transition-all duration-300`}
      >
        {score}
      </span>
      <span className="mx-1 opacity-30">|</span>
      <Heart className="text-red-500" size={20} />
      <span className="font-bold text-lg">{lives}</span>
      <Award className="text-amber-500 ml-2" size={20} />
      <span className="font-bold text-lg">{badges}</span>
      <User className="ml-2 opacity-40 hidden md:block" />
      <Bomb className="ml-1 opacity-40 hidden md:block" />
    </div>
  );
}
