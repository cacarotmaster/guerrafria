import type { Mission, RoleId } from "./types";

// ============================================================
// ESTRATEGIA DE GAMIFICACIÓN: "LA GUERRA FRÍA: MISIÓN SECRETA"
// Contenido histórico alineado a Sociales (grados 8-11, MEN)
// Roles y bonificaciones
// ============================================================

export const ROLES: { id: RoleId; label: string; icon: string; color: string; desc: string; skill: string; bonus: number }[] = [
  {
    id: "espia",
    label: "Espía",
    icon: "🕵️",
    color: "from-red-700 to-red-900",
    desc: "Descifra códigos, roba secretos y opera desde las sombras, como en la KGB o la CIA.",
    skill: "Habilidad: +2 puntos por misión en decisiones de inteligencia.",
    bonus: 2,
  },
  {
    id: "diplomatico",
    label: "Diplomático",
    icon: "🤝",
    color: "from-blue-700 to-blue-900",
    desc: "Negocia tratados, calma crisis y representa a tu país en la ONU.",
    skill: "Habilidad: si fallas una decisión, solo pierdes la mitad de puntos (redondeado).",
    bonus: 0,
  },
  {
    id: "cientifico",
    label: "Científico",
    icon: "🔬",
    color: "from-amber-500 to-amber-700",
    desc: "Impulsa la carrera espacial y el desarrollo tecnológico.",
    skill: "Habilidad: cada misión completada te da +3 puntos extra.",
    bonus: 3,
  },
];

export const MISSIONS: Mission[] = [
  {
    id: 1,
    title: "El Bloqueo de Berlín",
    year: "1948-1949",
    icon: "🛫",
    headline:
      "Tras la Segunda Guerra Mundial, Alemania y su capital, Berlín, quedaron divididas entre los Aliados (EE. UU., Reino Unido, Francia) y la Unión Soviética. En junio de 1948 la URSS bloqueó por tierra el sector occidental de Berlín para forzar la salida de los occidentales. Nadie quiere una guerra, pero 2 millones de berlineses quedan sin alimentos ni carbón.",
    scenes: [
      {
        id: "b1",
        mission: 1,
        title: "Una ciudad sitiada",
        context:
          "Eres agente secreto en Berlín Occidental. Los soviéticos cortaron los ferrocarriles, las carreteras y los canales. Los almacenes de comida apenas dan para 36 días. El mundo observa: si Berlín cae, Occidente parece débil; si lo fuerzas, puede estallar una Tercera Guerra Mundial.",
        question: "¿Qué estrategia propones para abastecer a Berlín Occidental sin desencadenar una guerra?",
        choices: [
          {
            text: "Organizar un puente aéreo: llevar todo por avión, incluso carbón y comida.",
            delta: 12,
            intel: "✅ Correcto. La 'Operación Vittles' (puente aéreo de Berlín) entregó más de 2,3 millones de toneladas de suministros en 15 meses. Cada 40 segundos aterrizaba un avión. Fue una victoria pacífica de Occidente: 277.000 vuelos sin disparar una bala.",
          },
          {
            text: "Enviar una columna de tanques para romper el bloqueo por tierra.",
            delta: -15,
            critical: true,
            intel: "⚠️ Riesgo extremo. Forzar el bloqueo con tanques podía encender una guerra nuclear. Los analistas soviéticos veían cualquier avance terrestre como una declaración de guerra. Perdiste una vida por la tensión.",
          },
          {
            text: "Negociar en secreto con la URSS ofreciéndoles control total del sector este.",
            delta: -8,
            intel: "❌ Cediste demasiado. Entregar Berlín Occidental habría dejado a 2 millones de personas bajo un régimen autoritario y debilitado a toda Europa. El puente aéreo era la vía correcta.",
          },
        ],
      },
      {
        id: "b2",
        mission: 1,
        title: "Salvar el invierno",
        context:
          "El bloqueo continúa durante el invierno de 1948-1949. Los aviones no bastan para todo. Necesitas ideas para llegar a los 2 millones de berlineses sin provocar a los soviéticos.",
        question: "¿Qué medida adicional tomas para sostener el puente aéreo?",
        choices: [
          {
            text: "Agregar la ayuda de la OTAN recién creada y aviones civiles voluntarios.",
            delta: 8,
            intel: "✅ Acertaste. La OTAN (Tratado del Atlántico Norte, 1949) y aviones civiles de EE. UU. y Reino Unido reforzaron la operación. La cooperación internacional sostuvo a Berlín.",
          },
          {
            text: "Volar solo durante el día para 'ahorrar' combustible y riesgo.",
            delta: -6,
            intel: "❌ Mal cálculo. Reducir vuelos dejó a la ciudad sin los suministros diarios mínimos. La población sufrió hambre y frío bajo tu mando.",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "La Carrera Espacial",
    year: "1957-1969",
    icon: "🚀",
    headline:
      "La Guerra Fría también se libró en el espacio. En 1957 la URSS lanzó el Sputnik, el primer satélite artificial, y en 1961 Yuri Gagarin fue el primer humano en el espacio. EE. UU. respondió con la NASA y, en 1969, el Apolo 11 llevó al hombre a la Luna. La ciencia se volvió un arma de prestigio.",
    scenes: [
      {
        id: "c1",
        mission: 2,
        title: "Respuesta al Sputnik",
        context:
          "El Sputnik orbita la Tierra y el mundo entero escucha su señal. Muchos temen que los soviéticos puedan lanzar misiles desde el espacio. Tú eres el encargado de responder por tu país.",
        question: "¿Cómo responde tu nación al desafío del Sputnik?",
        choices: [
          {
            text: "Invertir fuerte en tu propio programa espacial y educativo (NASA).",
            delta: 10,
            intel: "✅ Estratégico. EE. UU. creó la NASA en 1958 y los soviéticos respondieron con Gagarin en 1961. La competencia espacial impulsó la ciencia y la tecnología mundial.",
          },
          {
            text: "Restarle importancia y no invertir en tecnología.",
            delta: -10,
            critical: true,
            intel: "⚠️ Error grave. Ignorar la carrera espacial dejó a tu país años de atraso tecnológico y una sensación de inferioridad. La ciencia era prestigio y poder. Gastaste una vida.",
          },
        ],
      },
      {
        id: "c2",
        mission: 2,
        title: "La ciencia como arma",
        context:
          "Tanto el bloque soviético como el occidental quieren ser 'el país que pise la Luna'. Tienes la decisión final sobre el destino de tu programa.",
        question: "¿Qué priorizas para ganar prestigio mundial?",
        choices: [
          {
            text: "Coopera con otros países aliados para unir recursos y conocimientos.",
            delta: 8,
            intel: "✅ La colaboración científica (tecnología, educación, ingeniería) aceleró los logros. La carrera espacial integró a las comunidades científicas del mundo.",
          },
          {
            text: "Gastar todo el presupuesto militar en cohetes de combate.",
            delta: -7,
            intel: "❌ Desviaste el esfuerzo. La carrera espacial no se ganó con misiles de guerra, sino con ciencia y exploración. Descuidaste el prestigio que buscabas.",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "La Crisis de los Misiles",
    year: "1962",
    icon: "☢️",
    headline:
      "En octubre de 1962, aviones espía (U-2) descubrieron misiles soviéticos nucleares en Cuba, a solo 140 km de EE. UU. Fue el momento más cerca del mundo de una guerra nuclear: el pulso de la humanidad estuvo a segundos del desastre. La crisis se resolvió con negociación (barcos soviéticos retirados a cambio de no invadir Cuba y de retirar misiles de Turquía).",
    scenes: [
      {
        id: "m1",
        mission: 3,
        title: "13 días de tensión",
        context:
          "Los misiles están listos en Cuba. Tu comité de crisis está dividido: unos piden bombardeados inmediato, otros bloqueo naval. Un ataque podría desatar un intercambio nuclear. Cada minuto cuenta.",
        question: "Ante los misiles soviéticos en Cuba, ¿qué decisión tomas?",
        choices: [
          {
            text: "Declarar un bloqueo naval (cuarentena) y ganar tiempo para negociar.",
            delta: 12,
            intel: "✅ Decisión histórica. El presidente Kennedy optó por la 'cuarentena' naval: detener barcos soviéticos sin abrir fuego, dando espacio a la diplomacia. La URSS retrocedió sus barcos y se evitó la guerra.",
          },
          {
            text: "Bombardear ya las bases de misiles en Cuba.",
            delta: -20,
            critical: true,
            intel: "⚠️ Catástrofe casi segura. Atacar Cuba provocaría un contraataque nuclear soviético. El comandante soviético aceptó riesgos enormes para evitarlo. Esta fue la decisión que NO debía tomarse. Perdiste una vida.",
          },
          {
            text: "Invadir Cuba por tierra para destruir los misiles.",
            delta: -10,
            intel: "❌ Invasión peligrosa. Una invasión garantizaba millones de bajas y, probablemente, misiles lanzados. La negociación, no la invasión, salvó al planeta.",
          },
        ],
      },
      {
        id: "m2",
        mission: 3,
        title: "El intercambio final",
        context:
          "El mundo entero contuvo el aliento durante 13 días. Un acuerdo está sobre la mesa: los soviéticos retiran los misiles de Cuba si EE. UU. no invade la isla y retira sus misiles de Turquía. Pero los halcones quieren más.",
        question: "¿Cómo cierras la negociación para asegurar la paz?",
        choices: [
          {
            text: "Aceptar el acuerdo y comunicarlo públicamente para reducir la tensión.",
            delta: 10,
            intel: "✅ Pacto exitoso. El acuerdo de 1962 retiró los misiles de Cuba y de Turquía. Se instaló un 'teléfono rojo' de comunicación directa entre Washington y Moscú para evitar malentendidos.",
          },
          {
            text: "Exigir la rendición total de la URSS sin ninguna concesión.",
            delta: -9,
            intel: "❌ Rigidez peligrosa. Exigir rendición total casi reinicia la crisis. La diplomacia flexible, no la humillación, terminó el pulso nuclear.",
          },
        ],
      },
    ],
  },
  {
    id: 4,
    title: "La Caída del Muro de Berlín",
    year: "1989",
    icon: "🧱",
    headline:
      "El Muro de Berlín (1961) separó durante 28 años a las familias de la ciudad. En 1989, tras protestas masivas en Europa del Este y la política de apertura, el muro cayó el 9 de noviembre. Millones celebraron la reunificación. Muchos consideran a 1989-1991 el fin simbólico de la Guerra Fría, que concluyó con la disolución de la URSS en diciembre de 1991.",
    scenes: [
      {
        id: "f1",
        mission: 4,
        title: "El muro cae",
        context:
          "Corren los años finales de la Guerra Fría. Las protestas pacíficas crecen, los bloques se desgastan y el mundo cambia. Frente al Muro de Berlín, el pueblo exige libertad.",
        question: "Ante la presión popular, ¿qué orden das este 9 de noviembre de 1989?",
        choices: [
          {
            text: "Abrir los puestos de control y permitir el paso libre de los ciudadanos.",
            delta: 12,
            intel: "✅ Momento histórico. Miles cruzaron el Muro esa noche. Las familias se reencontraron tras décadas. La apertura fue la victoria de la paz y la libertad.",
          },
          {
            text: "Reforzar el Muro y prohibir las protestas con fuerza.",
            delta: -14,
            critical: true,
            intel: "⚠️ Historia contra corriente. Oponerse con fuerza al clamor popular solo retrasó lo inevitable y costó vidas. La historia eligió la apertura. Perdiste una vida.",
          },
          {
            text: "Pedir a los soviéticos que envíen tanques para mantener el control.",
            delta: -8,
            intel: "❌ Mal camino. En 1989 el mando soviético ya no quería sostener el Muro. La represión con tanques no correspondía al nuevo momento histórico.",
          },
        ],
      },
    ],
  },
];

// Puntuaciones: calcular fin del juego
export function buildResult(score: number, lives: number): { title: string; emoji: string; message: string; color: string } {
  if (lives <= 0) {
    return {
      title: "Misión Fallida: La crisis te superó",
      emoji: "☠️",
      color: "text-red-700",
      message:
        "Perdiste todas tus vidas por decisiones de alto riesgo. La humanidad aprendió que actos impulsivos pudieron precipitar una catástrofe. Inténtalo de nuevo con la diplomacia como escudo.",
    };
  }
  if (score >= 40) {
    return {
      title: "Medalla de la Paz: Gran estratega",
      emoji: "🏅",
      color: "text-green-700",
      message:
        "Negociaste cada crisis con inteligencia y templanza. Tu Poder Geopolítico construyó puentes en lugar de muros. Has honrado la lección más grande de la Guerra Fría: la paz se construye con diálogo.",
    };
  }
  if (score >= 20) {
    return {
      title: "Diplomático consumado",
      emoji: "🤝",
      color: "text-blue-700",
      message:
        "Superaste las crisis principales aunque con algunos tropiezos. Recuerda el pulso de 1962: la negociación salvó al mundo. Buen trabajo, agente.",
    };
  }
  return {
    title: "'El Muro de la Vergüenza'",
    emoji: "🧱",
    color: "text-red-600",
    message:
      "Tus decisiones de mano dura y poca diplomacia recordaron el muro que separó a las personas. Aprendiste de los errores: en la Guerra Fría, la inteligencia y la negociación valían más que la fuerza.",
  };
}
