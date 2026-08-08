import { BASE_PATH } from "@/lib/constants";

export interface Novedad {
  id: string;
  title: string;
  date: string;
  description: string;
  image: string;
  imageAlt: string;
}

export const NOVEDADES: Novedad[] = [
  {
    id: "temporizador-descanso",
    title: "Nuevo: Temporizador de descanso entre series",
    date: "2026-08-05",
    description:
      "Ahora Bitácora Fit incluye un temporizador integrado que se activa automáticamente al completar cada serie. Recibes un aviso silencioso cuando se acaba el descanso para volver a la barra sin perder el ritmo. Puedes configurar la duración del descanso por ejercicio o usar el valor predeterminado.",
    image: `${BASE_PATH}/screenshots/entrenar.png`,
    imageAlt: "Pantalla de entrenamiento mostrando el temporizador de descanso entre series",
  },
  {
    id: "graficas-volumen",
    title: "Gráficas de volumen total por sesión",
    date: "2026-07-22",
    description:
      "Hemos añadido gráficas automáticas de volumen de entrenamiento (series × repeticiones × peso) por cada sesión. Ahora puedes ver de un vistazo cómo tu tonelaje total evoluciona semana a semana. La barra más alta es tu récord personal — el objetivo es superarla.",
    image: `${BASE_PATH}/screenshots/historial.png`,
    imageAlt: "Pantalla de historial mostrando la gráfica de volumen total semanal",
  },
  {
    id: "racha-entrenamientos",
    title: "Racha de entrenamientos: no pierdas tu constancia",
    date: "2026-07-10",
    description:
      "Tu panel de inicio ahora muestra un contador de racha: días consecutivos que llevas entrenando. Es una forma visual y directa de mantener la motivación y la constancia. Si fallas un día, la racha se reinicia. Simple, efectivo, sin gamificación artificial.",
    image: `${BASE_PATH}/screenshots/home.png`,
    imageAlt: "Pantalla de inicio de Bitácora Fit mostrando la racha de entrenamientos",
  },
];
