export interface TeamMember {
  name: string;
  role: string;
  title: string;
  note: string;
  image: string;
  size: "large" | "medium" | "small";
}

export const team: readonly TeamMember[] = [
  {
    name: "Abdallah Al Shaqra",
    role: "founder",
    title: "Founder & CEO",
    note: "Building the future of Dubai real estate, one flow at a time.",
    image: "/images/team/abdallah.webp",
    size: "large",
  },
  {
    name: "Mohamed Shaat",
    role: "advisor",
    title: "Strategic Advisor",
    note: "Real estate industry veteran shaping Keyflow's market strategy.",
    image: "/images/team/mohamed.webp",
    size: "medium",
  },
  {
    name: "Abdullah Abdulqader",
    role: "advisor",
    title: "Strategic Advisor",
    note: "Bringing decades of Dubai real estate expertise to the table.",
    image: "/images/team/abdullah.webp",
    size: "medium",
  },
] as const;
