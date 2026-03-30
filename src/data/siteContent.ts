export interface ExperienceItem {
  title: string;
  period: string;
  role: string;
  bullets: string[];
}

export interface SiteContent {
  title: string;
  description: string;
  ProfileName: string;
  ProfileRole: string;
  ProfileSlogan: string;
  FocusTitle: string;
  FocusBullets: string[];
  SkillsTitle: string;
  SkillsBullets: string[];
  StrenghtsTitle: string;
  StrenghtsBullets: string[];
  PostCardsTitle: string;
  SectionTitle: string;
  SectionExperienceItems: ExperienceItem[];
}

export const siteContent = {
  en: {
    title: "",
    description: "",
    ProfileName: "",
    ProfileRole: "",
    ProfileSlogan: "",
    FocusTitle: "",
    FocusBullets: [],
    SkillsTitle: "",
    SkillsBullets: [""],
    StrenghtsTitle: "",
    StrenghtsBullets: [""],
    PostCardsTitle: "",
    SectionTitle: "",
    SectionExperienceItems: [
      {
        title: "",
        period: "",
        role: "",
        bullets: [
          ""
        ]
      }
    ]
  },
  es: {
    title: "",
    description: "",
    ProfileName: "",
    ProfileRole: "",
    ProfileSlogan: "",
    FocusTitle: "",
    FocusBullets: [""],
    SkillsTitle: "",
    SkillsBullets: [""],
    StrenghtsTitle: "",
    StrenghtsBullets: [""],
    PostCardsTitle: "",
    SectionTitle: "",
    SectionExperienceItems: [
      {
        title: "",
        period: "",
        role: " ",
        bullets: [
          ""
        ]
      },
    ]
  }
} satisfies Record<"en" | "es", SiteContent>;
