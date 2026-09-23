export type RoleId = "espia" | "diplomatico" | "cientifico";

export interface Choice {
  text: string;
  delta: number;          // cambio en Poder Geopolítico
  critical?: boolean;     // si es un error grave que cuesta una vida
  intel: string;          // retroalimentación histórica (explicación)
}

export interface Scene {
  id: string;
  mission: number;        // a qué misión pertenece
  title: string;
  context: string;        // contexto histórico (narración)
  question: string;       // la decisión a tomar
  choices: Choice[];
}

export interface Mission {
  id: number;
  title: string;
  year: string;
  icon: string;
  headline: string;       // ficha histórica resumen
  scenes: Scene[];
}

export interface GameState {
  fase: "inicio" | "rol" | "ficha" | "mision" | "final";
  rol: RoleId | null;
  score: number;
  lives: number;
  badges: string[];
  missionIndex: number;
  sceneIndex: number;
}
