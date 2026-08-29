export interface Certification {
  name: string;
  issuer: string;
  icon: string;
}

export const certifications: Certification[] = [
  {
    name: "Software Eng.",
    issuer: "Politécnico",
    icon: "SE",
  },
  {
    name: "AI Bootcamp",
    issuer: "MinTIC",
    icon: "AI",
  },
  {
    name: "Diploma in C.S.",
    issuer: "Politécnico",
    icon: "CS",
  },
  {
    name: "Software Dev.",
    issuer: "SENA",
    icon: "SD",
  },
];
