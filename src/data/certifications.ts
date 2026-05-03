export interface Certification {
  name: string;
  issuer: string;
  icon: string;
}

export const certifications: Certification[] = [
  {
    name: "Bootcamp Inteligencia Artificial",
    issuer: "MinTIC",
    icon: "AI",
  },
  {
    name: "TensorFlow Developer",
    issuer: "TensorFlow",
    icon: "TF",
  },
  {
    name: "FastAPI Professional",
    issuer: "FastAPI",
    icon: "FA",
  },
  {
    name: "React Development",
    issuer: "React",
    icon: "⚛",
  },
];
