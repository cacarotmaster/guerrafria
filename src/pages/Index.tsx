import { useEffect, useMemo, useState } from "react";
import { ScorePanel } from "../components/ScorePanel";
import { RoleSelector } from "../components/RoleSelector";
import { GameHeader } from "../components/GameHeader";
import { ROLES, MISSIONS, buildResult } from "../game/missions";
import type { GameState } from "../game/types";
import { CLASSROOM_REFLECTION, REFLECTION_QUESTIONS } from "../game/types";

const STORAGE_KEY = "guerra-fria-mision-secreta-v1";

const initialState = (): GameState => ({
  fase: "inicio",
  playerName: "",
  rol: null,
  score: 0,
  lives: 3,
  badges: [],
  missionIndex: 0,
  sceneIndex: 0,
  completedMissions: 0,
});

export default function Index() {
  const [state, setState] = useState<GameState>(initialState);
  const [bestScore, setBestScore] = useState<number>(0);
  const [lastResult, setLastResult] = useState<string | null>(null);

  // Cargar mejor puntaje guardado
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        if (typeof saved.bestScore === "number") setBestScore(saved.bestScore);
      }
    } catch {
      /* ignorar */
    }
  }, []);

  const mission = useMemo(
    () => (state.missionIndex < MISSIONS.length ? MISSIONS[state.missionIndex] : null),
    [state.missionIndex]
  );
  const scene = useMemo(
    () => (mission && state.sceneIndex < mission.scenes.length ? mission.scenes[state.sceneIndex] : null),
    [mission, state.sceneIndex]
  );
  const rolInfo = useMemo(() => ROLES.find((r) => r.id === state.rol) ?? null, [state.rol]);

  const saveBest = (finalScore: number) => {
    setBestScore((prev) => {
      const next = Math.max(prev, finalScore);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ bestScore: next }));
      } catch {
        /* ignorar */
      }
      return next;
    });
  };

  // Responder una decisión
  const onChoose = (choiceIndex: number) => {
    if (!scene) return;
    const choice = scene.choices[choiceIndex];
    let delta = choice.delta;

    // Bonus de rol
    if (choice.delta > 0 && state.rol === "espia") delta += ROLES[0].bonus;
    if (state.rol === "cientifico") delta += ROLES[2].bonus;
    if (state.rol === "diplomatico" && delta < 0) delta = Math.round(delta / 2);

    let lives = state.lives;
    if (choice.critical) lives -= 1;

    const score = state.score + delta;
    setLastResult(choice.intel);

    const badges = [...state.badges];
    if (choice.delta > 0 && !badges.includes(scene.id)) badges.push(scene.id);
    if (state.rol === "cientifico" && !badges.includes("ciencia")) badges.push("ciencia");

    const isLastScene = state.sceneIndex >= mission!.scenes.length - 1;

    setTimeout(() => {
      if (lives <= 0) {
        saveBest(score);
        setState((s) => ({ ...s, score, lives, badges, fase: "final" }));
        return;
      }
      if (isLastScene && state.missionIndex >= MISSIONS.length - 1) {
        saveBest(score);
        setState((s) => ({ ...s, score, lives, badges, completedMissions: s.completedMissions + 1, fase: "final" }));
      } else if (isLastScene) {
        setState((s) => ({
          ...s,
          score,
          lives,
          badges,
          completedMissions: s.completedMissions + 1,
          missionIndex: s.missionIndex + 1,
          sceneIndex: 0,
          fase: "ficha",
        }));
      } else {
        setState((s) => ({ ...s, score, lives, badges, sceneIndex: s.sceneIndex + 1 }));
      }
    }, 650);
  };

  const reset = () => {
    setState({ ...initialState() });
    setLastResult(null);
  };

  const eventLabel = mission ? `${mission.title} (${mission.year})` : "Misión secreta";
  const level = state.fase === "ficha" || state.fase === "mision" ? mission?.id ?? 0 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#11151D] via-[#22213e] to-[#1E232C] flex flex-col items-center relative overflow-hidden">
      <GameHeader currentEvent={state.fase === "inicio" ? "Selecciona tu misión" : eventLabel} level={level} />
      <ScorePanel score={state.score} lives={state.lives} badges={state.badges.length} />

      <main className="flex flex-col items-center justify-center grow w-full max-w-3xl mx-auto px-4">
        {/* ============ INICIO ============ */}
        {state.fase === "inicio" && (
          <div className="mt-16 flex flex-col items-center animate-fade-in w-full">
            <div className="text-6xl mb-4">🕵️</div>
            <h2 className="font-mono text-3xl md:text-5xl font-bold tracking-wide mb-6 text-white flicker text-center">
              La Guerra Fría: Misión Secreta
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mb-4 text-center opacity-90">
              <b>1945 – 1991.</b> Dos superpotencias, EE. UU. y la URSS, se enfrentan sin dispararse
              directamente: <b>la Guerra Fría</b>. Tu objetivo: <b>evitar la Tercera Guerra Mundial</b>{" "}
              tomando decisiones históricas clave.
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mb-8 text-center opacity-70">
              Escoge tu rol, supera 4 crisis históricas y demuestra que <b>la diplomacia puede más que la
              guerra</b>. Tu puntaje se llama <b>Poder Geopolítico</b>.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-8 text-sm">
              {["🛫 Bloqueo de Berlín 1948", "🚀 Carrera Espacial", "☢️ Crisis de los Misiles 1962", "🧱 Caída del Muro 1989"].map((t) => (
                <span key={t} className="bg-card border border-primary/30 rounded-full px-4 py-1.5 text-muted-foreground">
                  {t}
                </span>
              ))}
            </div>
            <div className="flex flex-col items-center w-full max-w-md mb-5">
              <label className="text-muted-foreground mb-2 text-sm opacity-80">
                🪪 Nombre de agente (aparece en tu Reporte)
              </label>
              <input
                className="w-full bg-card border-2 border-primary/40 rounded-lg px-4 py-3 text-lg text-center text-white placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition"
                placeholder="Escribe tu nombre o apodo"
                value={state.playerName}
                maxLength={40}
                onChange={(e) => setState((s) => ({ ...s, playerName: e.target.value }))}
              />
            </div>
            <button
              className="bg-primary hover:bg-red-900 text-primary-foreground rounded-lg px-10 py-5 font-bold text-2xl shadow-xl transition-all animate-scale-in hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed"
              disabled={!state.playerName.trim()}
              onClick={() => setState((s) => ({ ...s, fase: "rol" }))}
            >
              Iniciar Misión
            </button>
          </div>
        )}

        {/* ============ SELECCIÓN DE ROL ============ */}
        {state.fase === "rol" && (
          <div className="w-full animate-fade-in my-8">
            <h3 className="mb-2 text-white text-2xl font-bold font-mono text-center">
              🎭 Elige tu rol de agente
            </h3>
            <p className="text-center text-muted-foreground mb-2 opacity-80">
              Cada rol tiene una habilidad distinta que cambia tu forma de jugar.
            </p>
            <RoleSelector
              selected={state.rol}
              onSelect={(role) => {
                setState((s) => ({ ...s, rol: role, missionIndex: 0, sceneIndex: 0, fase: "ficha" }));
              }}
            />
          </div>
        )}

        {/* ============ FICHA HISTÓRICA / CONTEXTO ============ */}
        {state.fase === "ficha" && mission && (
          <div className="bg-card rounded-xl shadow-2xl p-8 my-8 flex flex-col items-center gap-6 animate-fade-in w-full max-w-2xl border border-primary/20">
            <div className="flex items-center gap-3">
              <span className="text-5xl">{mission.icon}</span>
            </div>
            <div className="text-center">
              <span className="text-sm uppercase tracking-widest text-primary font-bold">
                Misión {mission.id} de {MISSIONS.length} · {mission.year}
              </span>
              <h2 className="text-3xl font-bold font-mono text-white mt-1">{mission.title}</h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed text-center">{mission.headline}</p>
            {rolInfo && (
              <div className={`w-full rounded-lg bg-gradient-to-r ${rolInfo.color} text-white p-4 text-center`}>
                <span className="font-bold">{rolInfo.icon} {rolInfo.label}</span>
                <p className="text-sm mt-1 opacity-95">{rolInfo.skill}</p>
              </div>
            )}
            <button
              className="mt-2 bg-primary hover:bg-red-900 text-primary-foreground rounded-lg px-8 py-4 font-bold text-xl hover:scale-105 transition shadow"
              onClick={() => {
                setLastResult(null);
                setState((s) => ({ ...s, sceneIndex: 0, fase: "mision" }));
              }}
            >
              Comenzar Misión ▶
            </button>
          </div>
        )}

        {/* ============ MISIÓN EN CURSO ============ */}
        {state.fase === "mision" && scene && (
          <div className="bg-card rounded-xl shadow-2xl p-8 my-8 flex flex-col items-center gap-6 animate-fade-in w-full max-w-2xl border border-primary/20">
            <div className="w-full flex justify-between items-center mb-2">
              <span className="text-xs uppercase tracking-widest text-primary font-bold">
                {mission!.icon} {mission!.title} · Decisión {state.sceneIndex + 1}/{mission!.scenes.length}
              </span>
              <span className="text-xs text-muted-foreground opacity-70">❤️ {state.lives} vidas</span>
            </div>
            <h2 className="text-2xl font-bold text-white text-center">{scene.title}</h2>
            <p className="text-base text-muted-foreground leading-relaxed">{scene.context}</p>
            <p className="text-lg font-semibold text-center">
              <b className="text-primary">❓ {scene.question}</b>
            </p>

            <div className="flex flex-col gap-4 w-full">
              {scene.choices.map((opt, i) => (
                <button
                  key={i}
                  className="w-full bg-gradient-to-r from-blue-800 to-red-700 hover:from-blue-500 hover:to-red-400 text-white font-semibold rounded-lg py-3 px-4 text-lg text-left transition-all shadow pulse"
                  onClick={() => onChoose(i)}
                >
                  {opt.text}
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground opacity-60 text-center">
              Cada decisión cambia tu Poder Geopolítico. Elige con criterio histórico.
            </p>

            {lastResult && (
              <div className="w-full rounded-lg bg-black/30 border border-primary/30 p-4 text-sm text-cyan-100 leading-relaxed animate-fade-in">
                📟 <b>Informe de inteligencia:</b> {lastResult}
              </div>
            )}
          </div>
        )}

        {/* ============ FINAL ============ */}
        {state.fase === "final" && (
          <div className="bg-card rounded-xl shadow-2xl p-10 mt-16 flex flex-col items-center animate-fade-in text-center w-full max-w-2xl border border-primary/20">
            {renderResult(state, bestScore, reset)}
          </div>
        )}
      </main>

      <style>{`
        .flicker { animation: flicker 2.0s linear infinite alternate; }
        @keyframes flicker {
          0%,100% { opacity: 1 } 40% { opacity: 0.8 } 42% { opacity: 0.5 }
          45% { opacity: 0.6 } 48% { opacity: 0.85 } 60% { opacity: 1 }
        }
      `}</style>
    </div>
  );
}

function renderResult(state: GameState, bestScore: number, reset: () => void) {
  const result = buildResult(state.score, state.lives);
  const rolItem = ROLES.find((r) => r.id === state.rol);
  const rol = rolItem?.label ?? "—";

  const copyReport = async () => {
    const text = [
      "🪪 REPORTE DE AGENTE — Guerra Fría: Misión Secreta",
      `Agente: ${state.playerName || "—"}`,
      `Rol: ${rolItem?.icon ?? ""} ${rol}`,
      `Poder Geopolítico: ${state.score}`,
      `Vidas restantes: ${state.lives}`,
      `Misiones superadas: ${state.completedMissions}/${MISSIONS.length}`,
      `Insignias: ${state.badges.length}`,
    ].join("\n");
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      /* portapapeles no disponible */
    }
  };

  return (
    <>
      <div className="w-full flex items-center justify-center gap-3 mb-2">
        <span className="text-4xl">🪪</span>
        <h2 className="text-3xl font-bold font-mono text-white">REPORTE DE AGENTE</h2>
      </div>
      <p className="text-sm text-muted-foreground mb-4 opacity-80">
        📋 Muestra este reporte a tu docente (evaluación <b>SABER</b>).
      </p>

      <div className={`text-4xl mb-2 ${result.color}`}>{result.emoji}</div>
      <h3 className={`text-2xl font-bold font-mono mb-2 ${result.color}`}>{result.title}</h3>
      <p className="text-base text-muted-foreground mb-4 leading-relaxed">{result.message}</p>

      {/* Datos del agente */}
      <div className="grid grid-cols-2 gap-3 w-full max-w-md mb-4 text-left">
        <div className="bg-black/20 rounded-lg p-3">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Agente</div>
          <div className="text-lg font-bold text-white truncate">{state.playerName || "—"}</div>
        </div>
        <div className="bg-black/20 rounded-lg p-3">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Rol</div>
          <div className="text-lg font-bold">{rolItem?.icon} {rol}</div>
        </div>
        <div className="bg-black/20 rounded-lg p-3">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Poder Geopolítico</div>
          <div className={`text-2xl font-mono font-bold ${state.score >= 0 ? "text-green-600" : "text-red-500"}`}>{state.score}</div>
        </div>
        <div className="bg-black/20 rounded-lg p-3">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Misiones</div>
          <div className="text-2xl font-mono font-bold">{state.completedMissions}/{MISSIONS.length}</div>
        </div>
        <div className="bg-black/20 rounded-lg p-3">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Vidas</div>
          <div className="text-2xl font-mono font-bold">{state.lives > 0 ? "❤️".repeat(state.lives) : "💔"}</div>
        </div>
        <div className="bg-black/20 rounded-lg p-3">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Insignias</div>
          <div className="text-2xl font-mono font-bold">🏅 {state.badges.length}</div>
        </div>
      </div>

      {state.badges.length > 0 && (
        <div className="mb-4 text-left w-full max-w-md">
          <div className="flex flex-wrap gap-2">
            {state.badges.map((b) => (
              <span
                key={b}
                className="bg-yellow-500/20 border border-yellow-500/40 text-yellow-200 rounded-full px-3 py-1 text-sm"
              >
                ⭐ Acierto estratégico
              </span>
            ))}
            {state.badges.includes("ciencia") && (
              <span className="bg-amber-500/20 border border-amber-500/40 text-amber-200 rounded-full px-3 py-1 text-sm">
                🔬 Reto científico
              </span>
            )}
          </div>
        </div>
      )}

      <div className="mb-4 text-muted-foreground text-sm">Tu mejor puntaje: <b>{bestScore}</b></div>

      {/* Reflexión en Classroom */}
      <div className="w-full rounded-xl border border-primary/30 bg-black/20 p-4 mb-4 text-left">
        <div className="font-bold text-white mb-2">✍️ Reflexión en Google Classroom</div>
        <p className="text-sm text-muted-foreground mb-2">
          Elige <b>UNA</b> de las 4 crisis y responde en Classroom (4 puntos · PERIODO 3):
        </p>
        <ol className="text-sm text-muted-foreground list-decimal list-inside mb-3 space-y-1">
          {REFLECTION_QUESTIONS.map((q, i) => (
            <li key={i}>{q}</li>
          ))}
        </ol>
        <div className="flex flex-col gap-2">
          {CLASSROOM_REFLECTION.map((c) => (
            <a
              key={c.url}
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-blue-700 hover:bg-blue-600 text-white font-semibold rounded-lg py-3 text-center transition"
            >
              📚 Abrir {c.label} ▶
            </a>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-2 opacity-70">
          Se abre en una pestaña nueva · selecciona tu grupo.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
        <button
          className="flex-1 bg-primary text-primary-foreground rounded-lg px-6 py-3 font-bold hover:scale-105 transition shadow"
          onClick={copyReport}
        >
          📋 Copiar reporte
        </button>
        <button
          className="flex-1 bg-background border border-primary text-white rounded-lg px-6 py-3 font-bold hover:scale-105 transition shadow"
          onClick={reset}
        >
          🔄 Jugar de nuevo
        </button>
      </div>
    </>
  );
}
