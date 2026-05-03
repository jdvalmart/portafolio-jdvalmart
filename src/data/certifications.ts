export interface Certification {
  name: string;
  issuer: string;
  icon: string;
}

export const certifications: Certification[] = [
  {
    name: "Bootcamp Inteligencia Artificial",
    issuer: "MinTIC",
    icon: "🧠",
  },
  {
    name: "TensorFlow Developer Certificate",
    issuer: "TensorFlow",
    icon: "🤖",
  },
  {
    name: "FastAPI Professional",
    issuer: "FastAPI",
    icon: "⚡",
  },
  {
    name: "React Development",
    issuer: "React",
    icon: "⚛️",
  },
];
