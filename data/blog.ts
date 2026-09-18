import { Block } from "@/lib/content";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tag: string;
  content: Block[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "como-medir-progreso-gimnasio",
    title: "Cómo medir tu progreso real en el gimnasio (y por qué tu memoria te engaña)",
    excerpt:
      "Crees que sabes cuánto levantaste la semana pasada, pero los datos dicen otra cosa. Descubre por qué registrar tus entrenos es la diferencia entre avanzar y estancarte.",
    date: "2026-08-01",
    readTime: "5 min",
    tag: "Progreso",
    content: [
      {
        t: "p",
        s: [
          "Todos hemos pasado por esto: llegas al gimnasio, te pones en el banco plano y piensas «la semana pasada hice 80 kg, ¿no?». Cargas los discos, haces tus series… pero no estás seguro de si realmente fueron 80 kg o 75 kg. Y las repeticiones, ¿fueron 8 o 10?",
        ],
      },
      { t: "h2", text: "Tu memoria no es fiable" },
      {
        t: "p",
        s: [
          "Los estudios en psicología cognitiva llevan décadas demostrando que la memoria humana es reconstructiva, no reproductiva. No grabamos los hechos tal cual ocurrieron — los reconstruimos cada vez que los recordamos, y en cada reconstrucción se cuelan distorsiones.",
        ],
      },
      {
        t: "p",
        s: [
          "En el contexto del entrenamiento, esto se traduce en algo muy concreto: ",
          { b: "sobreestimas tus marcas cuando te sientes bien y las subestimas cuando te sientes mal" },
          ". Ninguna de las dos cosas te ayuda a progresar.",
        ],
      },
      { t: "h2", text: "El poder del registro objetivo" },
      { t: "p", s: ["Cuando anotas peso, series y repeticiones de cada ejercicio, ocurren tres cosas:"] },
      {
        t: "ul",
        items: [
          [{ b: "Sabes exactamente dónde estás." }, " No hay lugar para la duda: si la semana pasada hiciste 3×8 con 77,5 kg en press banca, esta semana tu objetivo está claro."],
          [{ b: "Detectas estancamientos reales." }, " Si llevas 4 semanas con el mismo tonelaje total, es una señal objetiva de que necesitas cambiar algo — no una sensación subjetiva."],
          [{ b: "Celebras progreso invisible." }, " A veces progresas tan gradualmente que no te das cuenta. Los datos sí se dan cuenta."],
        ],
      },
      { t: "h2", text: "El volumen total: la métrica que importa" },
      {
        t: "p",
        s: [
          "El volumen de entrenamiento se calcula como ",
          { b: "series × repeticiones × peso" },
          ". Es la métrica más fiable para medir tu progreso a lo largo del tiempo, porque integra las tres variables clave en un solo número.",
        ],
      },
      {
        t: "p",
        s: [
          "Bitácora Fit calcula tu volumen total automáticamente por sesión y lo grafica semana a semana. No tienes que hacer matemáticas — solo tienes que anotar tus series.",
        ],
      },
      { t: "h2", text: "Conclusión" },
      {
        t: "p",
        s: [
          "Entrenar sin registrar es como conducir sin velocímetro: puedes hacerlo, pero no tienes ni idea de si vas rápido o lento. Empieza hoy a anotar tus entrenos y verás la diferencia en pocas semanas.",
        ],
      },
    ],
  },
  {
    slug: "sobrecarga-progresiva-guia",
    title: "Sobrecarga progresiva: la clave para ganar fuerza semana a semana",
    excerpt:
      "El principio más importante del entrenamiento de fuerza explicado de forma simple. Cómo aplicarlo y cómo una app de registro te ayuda a no perderlo de vista.",
    date: "2026-07-20",
    readTime: "4 min",
    tag: "Entrenamiento",
    content: [
      {
        t: "p",
        s: [
          "Si solo pudieras recordar un concepto de todo lo que leas sobre entrenamiento de fuerza, que sea este: ",
          { b: "sobrecarga progresiva" },
          ". Es el principio que separa a quien progresa de quien lleva años levantando lo mismo.",
        ],
      },
      { t: "h2", text: "¿Qué es la sobrecarga progresiva?" },
      {
        t: "p",
        s: [
          "En esencia, es aumentar gradualmente el estrés que impones a tus músculos sesión tras sesión. Tu cuerpo se adapta a un estímulo, así que necesitas darle un estímulo ligeramente mayor para seguir adaptándose (es decir, haciéndose más fuerte y más grande).",
        ],
      },
      { t: "p", s: ["Puedes sobrecargar de varias formas:"] },
      {
        t: "ul",
        items: [
          [{ b: "Más peso" }, " — el método clásico. Añadir 1-2,5 kg a la barra."],
          [{ b: "Más repeticiones" }, " — con el mismo peso, hacer una repetición más."],
          [{ b: "Más series" }, " — añadir una serie extra al ejercicio."],
          [{ b: "Menos descanso" }, " — hacer el mismo trabajo en menos tiempo (más densidad)."],
        ],
      },
      { t: "h2", text: "¿Por qué falla la mayoría?" },
      {
        t: "p",
        s: [
          "Porque no llevan registro. Si no sabes qué hiciste la semana pasada, ¿cómo vas a superar esa marca esta semana? Es imposible aplicar sobrecarga progresiva de forma consistente sin datos.",
        ],
      },
      {
        t: "p",
        s: [
          "Muchos atletas «sienten» que progresan porque cambian de ejercicio frecuentemente. Pero cambiar de ejercicio no es progresar — es simplemente variar. El progreso real se mide en los mismos movimientos a lo largo del tiempo.",
        ],
      },
      { t: "h2", text: "Cómo usar Bitácora Fit para sobrecarga progresiva" },
      {
        t: "p",
        s: [
          "Cada vez que abres un ejercicio en Bitácora Fit, ves inmediatamente tu último registro: qué peso usaste, cuántas repeticiones hiciste y cuántas series completaste. Esa información es tu punto de partida para superarte hoy.",
        ],
      },
      {
        t: "p",
        s: [
          "Al final de cada semana, puedes revisar tu gráfica de volumen total y confirmar que la tendencia es ascendente. Si no lo es, sabes que necesitas ajustar algo.",
        ],
      },
      { t: "h2", text: "La regla del 2,5%" },
      {
        t: "p",
        s: [
          "Un buen punto de partida: intenta aumentar tu tonelaje total un 2,5% por semana. Parece poco, pero en un año eso es un aumento del 130%. Los progresos pequeños y constantes construyen resultados extraordinarios a largo plazo.",
        ],
      },
    ],
  },
  {
    slug: "guia-rapida-bitacora-fit",
    title: "Guía rápida: cómo usar Bitácora Fit para registrar tus entrenos",
    excerpt:
      "Aprende en 3 minutos a sacar el máximo partido a Bitácora Fit. Desde abrir la app hasta analizar tu progreso semanal.",
    date: "2026-07-10",
    readTime: "3 min",
    tag: "Guía",
    content: [
      {
        t: "p",
        s: [
          "Bitácora Fit está diseñada para que registrar tu entrenamiento sea tan rápido que apenas interrumpa tu descanso entre series. Aquí tienes todo lo que necesitas saber para empezar.",
        ],
      },
      { t: "h2", text: "Paso 1: Empieza un entrenamiento" },
      {
        t: "p",
        s: [
          "Al abrir la app, verás tu panel de inicio con tu racha de entrenamientos y accesos rápidos. Pulsa el botón de entrenar y elige los ejercicios de tu sesión de hoy. Puedes buscarlos por nombre o categoría muscular.",
        ],
      },
      { t: "h2", text: "Paso 2: Registra cada serie" },
      {
        t: "p",
        s: [
          "Para cada ejercicio, simplemente introduce el peso y las repeticiones de cada serie. La interfaz está diseñada para que lo hagas con el pulgar en menos de 2 segundos. Mientras descansas, el temporizador integrado te avisa cuando toca volver a la barra.",
        ],
      },
      { t: "h2", text: "Paso 3: Analiza tu historial" },
      {
        t: "p",
        s: [
          "Una vez terminado el entreno, Bitácora Fit calcula automáticamente tu volumen total de la sesión (series × repeticiones × peso). Ve a tu historial para ver todas tus sesiones pasadas y observa la gráfica de volumen subir semana a semana.",
        ],
      },
      { t: "h2", text: "Consejos pro" },
      {
        t: "ul",
        items: [
          [{ b: "No te saltes sesiones de registro." }, " La consistencia es la clave. Un historial con huecos pierde valor analítico."],
          [{ b: "Registra el peso real." }, " No redondees. Si usaste 42,5 kg, anota 42,5 kg. Los detalles importan."],
          [{ b: "Revisa tu historial antes de entrenar." }, " Abre el ejercicio que vas a hacer y mira tu último registro. Ese es tu punto de partida para hoy."],
        ],
      },
      { t: "h2", text: "¿Funciona sin internet?" },
      {
        t: "p",
        s: [
          "Sí. Bitácora Fit funciona al 100% sin conexión. Sabemos que en muchos gimnasios la cobertura es pésima, así que la app está diseñada para funcionar de forma ágil independientemente de tu conexión.",
        ],
      },
    ],
  },
];
