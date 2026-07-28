"use client";

import { FormEvent, useMemo, useState } from "react";

type Stage = "Todas" | "Adolescencia" | "Fertilidad" | "Embarazo" | "Posparto" | "Menopausia" | "Salud infantil";
type Guide = {
  id: string;
  icon: string;
  title: string;
  intro: string;
  stages: Stage[];
  updated: string;
  sections: { title: string; body: string; bullets?: string[] }[];
  sources: string[];
};

const stages: Stage[] = ["Todas", "Adolescencia", "Fertilidad", "Embarazo", "Posparto", "Menopausia", "Salud infantil"];

const guides: Guide[] = [
  {
    id: "fertilidad",
    icon: "◔",
    title: "Fertilidad y ciclo",
    intro: "Ciclo menstrual, anticoncepción, ovulación, SOP y cuándo pedir valoración.",
    stages: ["Adolescencia", "Fertilidad"],
    updated: "27 julio 2026",
    sections: [
      { title: "Ciclo y ovulación", body: "La duración y regularidad del ciclo varían. Las calculadoras ofrecen fechas aproximadas y no confirman ovulación ni deben usarse como único método anticonceptivo." },
      { title: "Síndrome de ovario poliquístico", body: "La guía internacional de 2023 integra irregularidad ovulatoria, hiperandrogenismo clínico o bioquímico y morfología ovárica/AMH según la edad y el contexto. Deben excluirse otras causas.", bullets: ["El diagnóstico no depende de un solo ultrasonido.", "El tratamiento se individualiza según síntomas, metabolismo y deseo gestacional.", "Amenorrea prolongada, sangrado intenso o dolor requieren valoración."] },
      { title: "Cuándo consultar", body: "Busca orientación si los ciclos cambian de forma persistente, existe dolor incapacitante, sangrado anormal o no llega el embarazo tras el tiempo recomendado para tu edad y situación clínica." },
    ],
    sources: ["International Evidence-based Guideline for PCOS 2023", "NICE: Fertility problems", "OMS: Planificación familiar"],
  },
  {
    id: "embarazo",
    icon: "♡",
    title: "Embarazo, posparto y lactancia",
    intro: "Control prenatal, cambios por trimestre, salud hormonal, lactancia y recuperación.",
    stages: ["Embarazo", "Posparto"],
    updated: "27 julio 2026",
    sections: [
      { title: "Primeras consultas", body: "El control prenatal confirma localización, edad gestacional, antecedentes, medicamentos y necesidades individuales. La fecha probable de parto calculada desde la última menstruación es una estimación que debe confirmarse con evaluación prenatal y ecografía [1]." },
      { title: "Calendario orientativo", body: "Las fechas exactas dependen del país y de cada embarazo.", bullets: ["Semanas 6–10: primera valoración y revisión de medicamentos.", "Semanas 11–14: cribado del primer trimestre cuando corresponda.", "Semanas 18–22: ecografía anatómica.", "Semanas 24–28: evaluación de diabetes gestacional según protocolo.", "Semanas 27–36: vacunas indicadas por país y antecedentes.", "Desde semana 36: planificación del nacimiento y seguimiento más cercano."] },
      { title: "Posparto y lactancia", body: "La recuperación física, el estado emocional, el suelo pélvico, el sueño, la alimentación y la lactancia merecen seguimiento. La forma de alimentar al bebé debe acompañarse sin culpa y con información segura." },
      { title: "Señales de alarma", body: "Sangrado abundante, convulsiones, dificultad respiratoria, dolor torácico, fiebre persistente, cefalea intensa con alteraciones visuales, dolor abdominal intenso o disminución marcada de movimientos fetales requieren atención urgente." },
    ],
    sources: ["[1] ACOG: Methods for Estimating the Due Date", "OMS: Recommendations on antenatal care", "NICE: Antenatal care", "EMA: medicines in pregnancy"],
  },
  {
    id: "hormonal",
    icon: "◒",
    title: "Menopausia y salud hormonal",
    intro: "Climaterio, menopausia, salud ósea y opciones hormonales y no hormonales.",
    stages: ["Menopausia"],
    updated: "27 julio 2026",
    sections: [
      { title: "Climaterio y menopausia", body: "Los síntomas pueden incluir cambios menstruales, sofocos, alteraciones del sueño, síntomas genitourinarios y cambios del estado de ánimo. No todas las personas necesitan el mismo tratamiento." },
      { title: "Opciones terapéuticas", body: "La terapia hormonal puede ser eficaz para síntomas seleccionados, pero requiere valorar edad, tiempo desde la menopausia, útero, antecedentes personales y riesgo vascular y oncológico. También existen alternativas no hormonales y tratamientos locales." },
      { title: "Hueso y prevención", body: "Ejercicio de fuerza, proteína suficiente, calcio preferentemente dietético, vitamina D cuando esté indicada, prevención de caídas y evitar tabaco ayudan a proteger el hueso." },
    ],
    sources: ["EMAS: Menopause health", "NICE NG23: Menopause", "EMA: hormone replacement therapy", "OMS Europa: healthy ageing"],
  },
  {
    id: "odontologia",
    icon: "◇",
    title: "Odontología por etapas",
    intro: "Caries, encías, embarazo, ortodoncia, prótesis, migración y urgencias.",
    stages: ["Adolescencia", "Embarazo", "Menopausia", "Salud infantil"],
    updated: "27 julio 2026",
    sections: [
      { title: "Infancia y adolescencia", body: "Cepillado con pasta fluorada apropiada para la edad, reducción de exposiciones frecuentes a azúcar y revisiones periódicas ayudan a prevenir caries. La ortodoncia requiere higiene cuidadosa alrededor de brackets o alineadores." },
      { title: "Embarazo", body: "El embarazo puede aumentar la inflamación gingival. La higiene, las revisiones y la atención de dolor o infección no deben aplazarse sin motivo. Informa al equipo dental sobre el embarazo y los medicamentos." },
      { title: "Adultez y adulto mayor", body: "La sequedad oral, diabetes, tabaquismo, prótesis y algunos medicamentos cambian el riesgo de caries y enfermedad periodontal. Las prótesis deben revisarse si lastiman, se mueven o dificultan comer." },
      { title: "Azúcares libres y caries", body: "La OMS recomienda mantener los azúcares libres por debajo del 10% de la energía diaria e idealmente por debajo del 5% [1]. Importan tanto la cantidad como la frecuencia: bebidas azucaradas, jugos, mieles y azúcares añadidos mantienen el medio oral expuesto.", bullets: ["4 gramos de azúcar equivalen aproximadamente a 1 cucharadita.", "Revisa “azúcares” y el tamaño de porción en la etiqueta.", "El agua es la bebida habitual de elección."] },
      { title: "Salud oral y enfermedades", body: "La enfermedad periodontal comparte factores y se asocia con diabetes y enfermedad cardiovascular; también se estudia su relación con deterioro cognitivo y Alzheimer. Asociación no significa causalidad ni demuestra que una enfermedad cause la otra." },
      { title: "Urgencias", body: "Traumatismo dental, sangrado que no cede, hinchazón facial progresiva, fiebre con infección dental o dificultad para respirar o tragar requieren atención urgente." },
    ],
    sources: ["[1] OMS: Guideline on sugars intake for adults and children", "OMS: Oral health", "European Federation of Periodontology", "Council of European Dentists"],
  },
  {
    id: "nutricion",
    icon: "✦",
    title: "Nutrición y fitness",
    intro: "Energía, proteína, azúcares, fuerza y ejercicio adaptado a cada etapa.",
    stages: ["Adolescencia", "Fertilidad", "Embarazo", "Posparto", "Menopausia"],
    updated: "27 julio 2026",
    sections: [
      { title: "Nutrición orientativa", body: "Las necesidades cambian con edad, talla, peso, actividad, composición corporal, embarazo, lactancia y condiciones clínicas. Las cifras de la calculadora son una referencia, no una prescripción." },
      { title: "Fitness integrado", body: "Combinar movimiento cotidiano, actividad aeróbica y fuerza suele aportar beneficios. El plan debe adaptarse a experiencia, etapa vital, lesiones y síntomas.", bullets: ["Progresa carga y volumen gradualmente.", "Dolor torácico, desmayo o falta de aire desproporcionada obligan a detenerse.", "Durante embarazo y posparto solicita adaptaciones individualizadas."] },
    ],
    sources: ["OMS: Physical activity and sedentary behaviour", "EFSA: Dietary Reference Values", "NICE: Maternal and child nutrition"],
  },
  {
    id: "adicciones",
    icon: "⊘",
    title: "Adicciones y reducción de riesgos",
    intro: "Alcohol, tabaco, cannabis, medicamentos, dependencia, intoxicación y ayuda.",
    stages: ["Adolescencia", "Fertilidad", "Embarazo", "Posparto"],
    updated: "27 julio 2026",
    sections: [
      { title: "Sustancias y medicamentos", body: "Alcohol, nicotina, cannabis y medicamentos sedantes, opioides o estimulantes pueden generar daño o dependencia. No suspendas bruscamente un medicamento prescrito sin orientación, porque algunas retiradas pueden ser peligrosas." },
      { title: "Señales de dependencia", body: "Pérdida de control, tolerancia, abstinencia, consumo pese a consecuencias, ocultamiento y abandono de responsabilidades son señales para pedir ayuda." },
      { title: "Embarazo y lactancia", body: "No se ha establecido una cantidad segura de alcohol durante el embarazo. El tabaco, cannabis y otros productos también requieren conversación clínica sin juicios para reducir riesgos." },
      { title: "Intoxicación o sobredosis", body: "Respiración lenta o ausente, pérdida de conciencia, convulsiones, coloración azulada, confusión extrema o dolor torácico son una emergencia. Llama al número local, no dejes sola a la persona y sigue las instrucciones del servicio." },
      { title: "Cómo solicitar ayuda", body: "Puedes acudir a atención primaria, salud mental, servicios de adicciones, reducción de daños o una línea de crisis. Pedir ayuda temprana mejora las opciones de tratamiento." },
    ],
    sources: ["OMS: Alcohol, drugs and addictive behaviours", "OMS Europa: tobacco", "EMA: safe use of medicines", "NICE: Alcohol-use disorders"],
  },
  {
    id: "mental",
    icon: "☼",
    title: "Salud mental y seguridad",
    intro: "Ansiedad, depresión, duelo, violencia, trata y redes de apoyo.",
    stages: ["Adolescencia", "Fertilidad", "Embarazo", "Posparto", "Menopausia"],
    updated: "27 julio 2026",
    sections: [
      { title: "Cuándo pedir apoyo", body: "Tristeza o ansiedad persistentes, aislamiento, pérdida de funcionamiento, pensamientos de hacerte daño, violencia o control coercitivo merecen atención." },
      { title: "Plan de seguridad", body: "Si es seguro hacerlo, identifica una persona de confianza, documentos esenciales, medicamentos, una palabra clave y una ruta de salida. No confrontes a una persona violenta si aumenta el riesgo." },
    ],
    sources: ["OMS: Mental health", "WAVE Network", "NICE: Perinatal mental health"],
  },
  {
    id: "migracion",
    icon: "◎",
    title: "Migración y acceso a la salud",
    intro: "Resumen médico portátil, red consular, ONG y directorio internacional manual.",
    stages: ["Todas"],
    updated: "27 julio 2026",
    sections: [
      { title: "Antes de viajar", body: "Lleva diagnósticos, alergias, medicamentos con dosis y nombre genérico, recetas, vacunas, seguros y contactos consulares. Confirma teléfonos oficiales antes de viajar: pueden cambiar." },
      { title: "Directorio sin geolocalización", body: "Selecciona manualmente el país en el botón “Necesito ayuda”. Incluye referencias para América Latina, México, España, Bélgica, Francia, Alemania, Italia, Portugal y Marruecos, además de red consular y ONG." },
      { title: "Organizaciones internacionales", body: "Cruz Roja/Media Luna Roja, Médicos Sin Fronteras, WAVE y líneas europeas contra la trata pueden orientar según el contexto. En una emergencia utiliza primero el número oficial del país." },
    ],
    sources: ["Comisión Europea: 112", "IFRC: National Societies Directory", "Médicos Sin Fronteras", "WAVE Network"],
  },
  {
    id: "infantil",
    icon: "♧",
    title: "Salud infantil",
    intro: "Crecimiento, vacunas, sueño seguro, desarrollo y señales de alarma.",
    stages: ["Salud infantil", "Posparto"],
    updated: "27 julio 2026",
    sections: [
      { title: "Primeros cuidados", body: "Los controles permiten seguir crecimiento, alimentación, audición, visión, desarrollo y vacunación según el país." },
      { title: "Atención urgente", body: "Dificultad respiratoria, coloración azulada, convulsión, somnolencia extrema, deshidratación o fiebre en un recién nacido requieren valoración urgente." },
    ],
    sources: ["OMS: Child health", "UNICEF: Early childhood development", "NICE: Postnatal care"],
  },
];

const directory: Record<string, { emergency: string; notes: string }> = {
  México: { emergency: "911", notes: "Emergencias nacionales. Consulta también Locatel y la red consular de tu país." },
  España: { emergency: "112", notes: "Emergencias europeas. 016 ofrece información sobre violencia contra las mujeres; revisa condiciones de uso." },
  Bélgica: { emergency: "112", notes: "Emergencias europeas. La línea 1712 orienta sobre violencia y abuso en Flandes." },
  Francia: { emergency: "112 / 15", notes: "112 emergencias europeas; 15 urgencias médicas." },
  Alemania: { emergency: "112", notes: "Emergencias. El 116 117 orienta para atención médica no vital fuera de horario." },
  Italia: { emergency: "112", notes: "Número europeo de emergencias." },
  Portugal: { emergency: "112", notes: "Número europeo de emergencias." },
  Marruecos: { emergency: "15 / 19", notes: "Ambulancia/protección civil y policía; confirma cobertura local antes del viaje." },
  "Referencia internacional": { emergency: "Número local", notes: "Consulta el directorio oficial de Cruz Roja/Media Luna Roja y la representación consular." },
};

function addDays(value: string, days: number) {
  const date = new Date(`${value}T12:00:00`);
  date.setDate(date.getDate() + days);
  return date;
}

function dateText(date: Date) {
  return new Intl.DateTimeFormat("es-MX", { day: "numeric", month: "long", year: "numeric" }).format(date);
}

function compactDate(date: Date) {
  return date.toISOString().slice(0, 10).replaceAll("-", "");
}

function saveCalendar(title: string, date: Date, description: string, google = false) {
  const start = compactDate(date);
  const end = compactDate(addDays(date.toISOString().slice(0, 10), 1));
  if (google) {
    window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${start}/${end}&details=${encodeURIComponent(description)}`, "_blank", "noopener,noreferrer");
    return;
  }
  const content = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Maternity Global//ES", "BEGIN:VEVENT", `DTSTART;VALUE=DATE:${start}`, `DTEND;VALUE=DATE:${end}`, `SUMMARY:${title}`, `DESCRIPTION:${description}`, "END:VEVENT", "END:VCALENDAR"].join("\r\n");
  const link = document.createElement("a");
  link.href = URL.createObjectURL(new Blob([content], { type: "text/calendar" }));
  link.download = `${title.toLowerCase().replaceAll(" ", "-")}.ics`;
  link.click();
  URL.revokeObjectURL(link.href);
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [stage, setStage] = useState<Stage>("Todas");
  const [calc, setCalc] = useState<"cycle" | "nutrition" | "sugar">("cycle");
  const [cycleResult, setCycleResult] = useState<{ label: string; date: Date; extra?: string }[]>([]);
  const [nutritionResult, setNutritionResult] = useState("");
  const [sugarResult, setSugarResult] = useState("");
  const [helpOpen, setHelpOpen] = useState(false);
  const [country, setCountry] = useState("México");
  const [passportMessage, setPassportMessage] = useState("");

  const visibleGuides = useMemo(() => {
    const term = query.trim().toLocaleLowerCase("es");
    return guides.filter((guide) => {
      const stageMatch = stage === "Todas" || guide.stages.includes("Todas") || guide.stages.includes(stage);
      const text = `${guide.title} ${guide.intro} ${guide.sections.map((item) => `${item.title} ${item.body}`).join(" ")}`.toLocaleLowerCase("es");
      return stageMatch && (!term || text.includes(term));
    });
  }, [query, stage]);

  function calculateCycle(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const lastPeriod = String(data.get("lastPeriod") || "");
    const length = Number(data.get("cycleLength") || 28);
    if (!lastPeriod) return;
    const ovulation = addDays(lastPeriod, length - 14);
    setCycleResult([
      { label: "Ventana fértil inicia", date: addDays(lastPeriod, length - 19), extra: `Hasta aproximadamente el ${dateText(addDays(lastPeriod, length - 13))}` },
      { label: "Ovulación estimada", date: ovulation },
      { label: "Próxima menstruación", date: addDays(lastPeriod, length) },
      { label: "Fecha probable de parto", date: addDays(lastPeriod, 280), extra: "Estimación: debe confirmarse mediante control prenatal y ecografía." },
    ]);
  }

  function calculateNutrition(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const weight = Number(data.get("weight"));
    const activity = Number(data.get("activity"));
    if (!weight) return;
    setNutritionResult(`Energía orientativa: ${Math.round(weight * activity)} kcal/día · Proteína orientativa: ${Math.round(weight * 1.2)}–${Math.round(weight * 1.6)} g/día. Ajustar según etapa, objetivo y salud.`);
  }

  function calculateSugar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const sugar = Number(data.get("sugar"));
    const servings = Number(data.get("servings")) || 1;
    const total = sugar * servings;
    setSugarResult(`${total.toFixed(1)} g de azúcar en total ≈ ${(total / 4).toFixed(1)} cucharaditas. La frecuencia de exposición también influye en el riesgo de caries.`);
  }

  function downloadPassport(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1350;
    const context = canvas.getContext("2d");
    if (!context) return;
    const field = (name: string) => String(data.get(name) || "No indicado");
    const wrap = (text: string, x: number, y: number, width: number, lineHeight: number) => {
      const words = text.split(/\s+/);
      let line = "";
      words.forEach((word) => {
        const test = `${line} ${word}`.trim();
        if (context.measureText(test).width > width && line) {
          context.fillText(line, x, y);
          line = word;
          y += lineHeight;
        } else line = test;
      });
      context.fillText(line, x, y);
      return y;
    };
    const gradient = context.createLinearGradient(0, 0, 1080, 1350);
    gradient.addColorStop(0, "#effaf5");
    gradient.addColorStop(1, "#d7f0e4");
    context.fillStyle = gradient;
    context.fillRect(0, 0, 1080, 1350);
    context.fillStyle = "#ffffff";
    context.roundRect(55, 55, 970, 1240, 42);
    context.fill();
    context.fillStyle = "#4a9d82";
    context.roundRect(55, 55, 970, 210, 42);
    context.fill();
    context.fillRect(55, 180, 970, 85);
    context.fillStyle = "#ffffff";
    context.font = "700 22px Arial";
    context.fillText("MATERNITY GLOBAL · SALUD SIN FRONTERAS", 95, 125);
    context.font = "800 42px Arial";
    context.fillText("PASAPORTE DE SALUD", 95, 205);
    context.fillStyle = "#163e34";
    context.font = "800 40px Arial";
    wrap(field("name"), 95, 335, 880, 48);
    const items = [
      ["Fecha de nacimiento", field("birthDate")], ["Nacionalidad", field("nationality")],
      ["Grupo sanguíneo", field("bloodType")], ["Teléfono", field("phone")],
      ["Contacto de emergencia", field("emergency")], ["Alergias", field("allergies")],
      ["Diagnósticos y antecedentes", field("conditions")], ["Medicamentos, dosis y horarios", field("medicines")],
      ["Vacunas relevantes", field("vaccines")],
    ];
    let y = 420;
    items.forEach(([label, value]) => {
      context.fillStyle = "#4a7d6e";
      context.font = "700 16px Arial";
      context.fillText(label.toUpperCase(), 95, y);
      context.fillStyle = "#163e34";
      context.font = "600 23px Arial";
      y = wrap(value, 95, y + 32, 880, 30) + 52;
    });
    context.fillStyle = "#647b74";
    context.font = "16px Arial";
    context.fillText(`Generado el ${new Date().toLocaleDateString("es-MX")} · Verifica la información con un profesional.`, 95, 1250);
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "pasaporte-de-salud.png";
    link.click();
    event.currentTarget.reset();
    setPassportMessage("Pasaporte descargado. El formulario se borró automáticamente y no conservamos tus datos.");
  }

  return (
    <>
      <a className="skip" href="#contenido">Saltar al contenido</a>
      <header className="header">
        <div className="utility"><span>Información médica clara, estés donde estés</span><span>Contenido educativo · Revisión 2026</span></div>
        <nav className="nav" aria-label="Navegación principal">
          <a className="brand" href="#inicio"><b>MG</b><span><strong>Maternity Global</strong><small>Salud sin fronteras</small></span></a>
          <div className="navLinks"><a href="#guias">Guías</a><a href="#herramientas">Calculadoras</a><a href="#pasaporte">Pasaporte</a><a href="#bibliografia">Bibliografía</a></div>
          <a className="ambassador" href="#sobre">Embajadora: Nicole Arellano</a>
        </nav>
      </header>

      <main id="contenido">
        <section className="hero" id="inicio">
          <div className="heroCopy">
            <p className="eyebrow">SALUD · MATERNIDAD · MIGRACIÓN</p>
            <h1>Tu salud también viaja contigo.</h1>
            <p className="lead">Información médica comprensible y herramientas prácticas para acompañarte en cada etapa, sin importar el país en el que estés.</p>
            <div className="actions"><a className="button primary" href="#guias">Explorar las guías</a><a className="button secondary" href="#herramientas">Usar calculadoras</a></div>
            <div className="trust"><span>✓ Fuentes médicas</span><span>✓ Sin juicios</span><span>✓ Sin rastrear ubicación</span></div>
          </div>
          <aside className="heroMap">
            <span className="mapGlow one" /><span className="mapGlow two" />
            <p>MAPA DE NAVEGACIÓN</p>
            <h2>¿Qué necesitas hoy?</h2>
            <a href="#guias">Encontrar una guía <b>→</b></a>
            <a href="#embarazo">Acompañar mi embarazo <b>→</b></a>
            <a href="#odontologia">Cuidar mi salud oral <b>→</b></a>
            <a href="#directorio" onClick={() => setHelpOpen(true)}>Necesito ayuda <b>→</b></a>
            <small>No sustituye una consulta ni la atención de urgencias.</small>
          </aside>
        </section>

        <section className="mission" id="sobre">
          <div><p className="eyebrow dark">POR QUÉ NACIÓ</p><h2>Información útil que cruza fronteras</h2></div>
          <p><strong>Misión:</strong> acercar información médica clara, práctica y basada en fuentes confiables a mujeres, familias y personas migrantes.</p>
          <p><strong>Visión:</strong> que nadie enfrente una etapa de salud importante sin comprender sus opciones, señales de alarma y recursos de ayuda.</p>
        </section>

        <section className="section tools" id="herramientas">
          <div className="sectionHeading"><div><p className="eyebrow dark">HERRAMIENTAS ÚTILES</p><h2>Calculadoras orientativas</h2></div><p>Los resultados son estimaciones y no sustituyen una valoración individual.</p></div>
          <div className="toolTabs" role="tablist">
            <button className={calc === "cycle" ? "active" : ""} onClick={() => setCalc("cycle")}>Ciclo y embarazo</button>
            <button className={calc === "nutrition" ? "active" : ""} onClick={() => setCalc("nutrition")}>Energía y proteína</button>
            <button className={calc === "sugar" ? "active" : ""} onClick={() => setCalc("sugar")}>Azúcares de etiqueta</button>
          </div>
          {calc === "cycle" && <div className="calculatorPanel"><form onSubmit={calculateCycle}><label>Primer día de la última menstruación<input type="date" name="lastPeriod" required /></label><label>Duración habitual del ciclo<input type="number" name="cycleLength" min="20" max="45" defaultValue="28" required /></label><button className="button primary" type="submit">Calcular fechas</button></form>{cycleResult.length > 0 && <div className="results">{cycleResult.map((result) => <article key={result.label}><small>{result.label}</small><strong>{dateText(result.date)}</strong>{result.extra && <p>{result.extra}</p>}<div><button onClick={() => saveCalendar(result.label, result.date, result.extra || "Fecha orientativa de Maternity Global")}>Guardar .ics</button><button onClick={() => saveCalendar(result.label, result.date, result.extra || "Fecha orientativa de Maternity Global", true)}>Google Calendar</button></div></article>)}</div>}</div>}
          {calc === "nutrition" && <div className="calculatorPanel"><form onSubmit={calculateNutrition}><label>Peso en kg<input name="weight" type="number" min="30" max="250" step="0.1" required /></label><label>Nivel orientativo<select name="activity" defaultValue="30"><option value="26">Actividad baja</option><option value="30">Actividad moderada</option><option value="34">Actividad alta</option></select></label><button className="button primary" type="submit">Estimar</button></form>{nutritionResult && <p className="singleResult">{nutritionResult}</p>}</div>}
          {calc === "sugar" && <div className="calculatorPanel"><form onSubmit={calculateSugar}><label>Azúcares por porción (g)<input name="sugar" type="number" min="0" step="0.1" required /></label><label>Porciones consumidas<input name="servings" type="number" min="0.1" step="0.1" defaultValue="1" required /></label><button className="button primary" type="submit">Convertir</button></form>{sugarResult && <p className="singleResult">{sugarResult}</p>}</div>}
          <p className="calendarNote">Recomendación: guarda las fechas en el calendario del teléfono. Google Drive almacenaría un documento, pero no crearía recordatorios ni fechas visibles.</p>
        </section>

        <section className="section guideSection" id="guias">
          <div className="sectionHeading"><div><p className="eyebrow dark">BIBLIOTECA DE SALUD</p><h2>Guías propias, ordenadas por etapa</h2></div><p>La portada permanece limpia: abre únicamente el contenido que necesitas.</p></div>
          <div className="searchBar"><label><span>Buscar cualquier tema</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Ej. caries, lactancia, SOP, sobredosis…" /></label></div>
          <div className="filters" aria-label="Filtrar por etapa">{stages.map((item) => <button className={stage === item ? "active" : ""} key={item} onClick={() => setStage(item)}>{item}</button>)}</div>
          <div className="guideGrid">{visibleGuides.map((guide) => <details className="guideCard" id={guide.id} key={guide.id}><summary><span className="guideIcon">{guide.icon}</span><span><small>Revisado: {guide.updated}</small><h3>{guide.title}</h3><p>{guide.intro}</p></span><b>＋</b></summary><div className="guideContent">{guide.sections.map((section) => <article key={section.title}><h4>{section.title}</h4><p>{section.body}</p>{section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}</article>)}<div className="guideSources"><h4>Fuentes de esta guía</h4><ol>{guide.sources.map((source) => <li key={source}>{source}</li>)}</ol></div></div></details>)}</div>
          {visibleGuides.length === 0 && <p className="empty">No encontramos ese tema con los filtros elegidos. Prueba otra palabra o selecciona “Todas”.</p>}
        </section>

        <section className="section passport" id="pasaporte">
          <div className="passportIntro"><p className="eyebrow">PASAPORTE DE SALUD</p><h2>Tu resumen médico portátil</h2><p>Completa lo esencial y descarga una imagen PNG. La información se procesa en tu dispositivo: no la guardamos y el formulario se borra automáticamente después de descargar.</p></div>
          <form className="passportForm" onSubmit={downloadPassport}>
            <label>Nombre completo<input name="name" required /></label>
            <div className="formRow"><label>Fecha de nacimiento<input name="birthDate" type="date" /></label><label>Nacionalidad<input name="nationality" /></label></div>
            <div className="formRow"><label>Grupo sanguíneo<select name="bloodType"><option>No indicado</option>{["O+", "O−", "A+", "A−", "B+", "B−", "AB+", "AB−"].map((blood) => <option key={blood}>{blood}</option>)}</select></label><label>Teléfono<input name="phone" type="tel" /></label></div>
            <label>Contacto de emergencia<input name="emergency" /></label>
            <label>Alergias<textarea name="allergies" /></label>
            <label>Diagnósticos y antecedentes<textarea name="conditions" /></label>
            <label>Medicamentos, dosis y horarios<textarea name="medicines" /></label>
            <label>Vacunas relevantes<textarea name="vaccines" /></label>
            <button className="button light" type="submit">Descargar PNG y borrar datos</button>
            {passportMessage && <p className="passportMessage" role="status">{passportMessage}</p>}
          </form>
        </section>

        <section className="section bibliography" id="bibliografia">
          <div className="sectionHeading"><div><p className="eyebrow dark">BIBLIOGRAFÍA GENERAL</p><h2>Fuentes institucionales</h2></div><p>Cada guía incluye además su propia bibliografía numerada o identificada.</p></div>
          <div className="sourceGrid">{["Organización Mundial de la Salud (OMS y OMS Europa)", "National Institute for Health and Care Excellence (NICE)", "European Menopause and Andropause Society (EMAS)", "European Medicines Agency (EMA)", "European Food Safety Authority (EFSA)", "American College of Obstetricians and Gynecologists (ACOG)", "European Federation of Periodontology y Council of European Dentists", "UNICEF, IFRC, Médicos Sin Fronteras y WAVE Network"].map((source, index) => <p key={source}><b>[{index + 1}]</b> {source}</p>)}</div>
          <p className="reviewNote">La información debe revisarse periódicamente. Recomendamos confirmar calendarios, teléfonos, vacunas y protocolos con fuentes oficiales del país antes de viajar o tomar decisiones clínicas.</p>
        </section>
      </main>

      <footer><div className="brand footerBrand"><b>MG</b><span><strong>Maternity Global</strong><small>Salud sin fronteras</small></span></div><p>Proyecto educativo de Nicole Arellano · Información clara, multicultural y basada en fuentes.</p><p>© 2026 · No sustituye atención médica.</p></footer>

      <button className="helpButton" onClick={() => setHelpOpen(true)}>Necesito ayuda</button>
      {helpOpen && <div className="modalBackdrop" role="presentation" onMouseDown={() => setHelpOpen(false)}><section className="helpModal" id="directorio" role="dialog" aria-modal="true" aria-labelledby="help-title" onMouseDown={(event) => event.stopPropagation()}><button className="close" onClick={() => setHelpOpen(false)} aria-label="Cerrar">×</button><p className="eyebrow danger">DIRECTORIO MANUAL · SIN GEOLOCALIZACIÓN</p><h2 id="help-title">Ayuda y emergencias</h2><p>Selecciona el país. No solicitamos ni conservamos tu ubicación.</p><label>País o referencia<select value={country} onChange={(event) => setCountry(event.target.value)}>{Object.keys(directory).map((item) => <option key={item}>{item}</option>)}</select></label><div className="emergencyNumber"><small>Número principal</small><strong>{directory[country].emergency}</strong><p>{directory[country].notes}</p></div><div className="internationalHelp"><h3>Red internacional</h3><p>Red consular · Cruz Roja/Media Luna Roja · Médicos Sin Fronteras · WAVE · líneas europeas contra la trata.</p></div><p className="warning">Confirma siempre los teléfonos antes de viajar: los números y servicios pueden cambiar. Si existe peligro inmediato, usa el servicio oficial de emergencias.</p></section></div>}
    </>
  );
}
