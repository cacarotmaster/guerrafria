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
  playerName: string;
  rol: RoleId | null;
  score: number;
  lives: number;
  badges: string[];
  missionIndex: number;
  sceneIndex: number;
  completedMissions: number;
}

// Links de la reflexión en Google Classroom (pregunta corta · PERIODO 3 · 4 pts)
export const CLASSROOM_REFLECTION = [
  { label: "Reflexión · 10-1", url: "https://classroom.google.com/c/793517183640/a/886901756083" },
  { label: "Reflexión · 10-2", url: "https://classroom.google.com/c/793594300998/a/886905731157" },
];

export const REFLECTION_QUESTIONS = [
  "La decisión que tomaste en el juego y si resultó acertada.",
  "Cómo se relaciona tu decisión con lo que ocurrió realmente en la historia.",
  "Qué lección sobre la negociación y la paz puedes aplicar a tu vida o al contexto colombiano.",
];
