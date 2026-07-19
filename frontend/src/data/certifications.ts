export interface Certification {
  name: string;
  issuer: string;
  icon: string;
}

export const certifications: Certification[] = [
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
  {
    name: "English B1",
    issuer: "SENA",
    icon: "EN",
  },
];
