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
  ResumeTitle: string;
  ResumeCaption: string;
}

export const siteContent = {
en: {
  title: "César Ponce | Portfolio",
  description: "Data Analyst with over 3 years of experience leading strategic projects and critical operations in the U.S. cattle industry. Specialized in transforming data into actionable insights that drive informed decision-making and improve operational performance.",
  ProfileName: "César Ponce",
  ProfileRole: "Data Analyst",
  ProfileSlogan: "I transform data into clear insights that drive better decisions.",

  FocusTitle: "FOCUS",
  FocusBullets: [
    "Transform data into actionable decisions",
    "Prioritize data quality",
    "Business impact-driven approach",
    "Identify key patterns and anomalies",
    "Communicate insights clearly",
    "Continuous learning"
  ],
  SkillsTitle: "SKILLS",
  SkillsBullets: [
    "Python",
    "Excel",
    "Power BI",
    "Tableau",
    "Git"
  ],
  StrenghtsTitle: "STRENGTHS",
  StrenghtsBullets: [
    "Analytical thinking",
    "Attention to detail",
    "Problem-solving",
    "Clear communication",
    "Data-driven decision-making"
  ],
  PostCardsTitle: "My Projects",
  SectionTitle: "PROFESSIONAL EXPERIENCE",
  SectionExperienceItems: [
    {
      title: "Brandao Cattle LLC",
      period: "Mar 2023 - Present",
      role: "Data Analyst",
      bullets: [
        "Data quality and validation.",
        "Reduction of inconsistencies.",
        "KPI-driven decision optimization.",
        "Reporting automation.",
        "Real-time Power BI dashboards.",
        "Clear communication of insights.",
        "Data segmentation and pattern detection.",
        "Risk and anomaly identification."
      ]
    },
    {
      title: "CIBANCO S.A",
      period: "Aug 2021 - Feb 2023",
      role: "Regional Technical Support",
      bullets: [
        "Technical support and infrastructure for critical systems.",
        "Incident analysis and process optimization.",
        "Ticket management and operational reporting."
      ]
    },
    {
      title: "Autonomous University of Baja California (UABC)",
      period: "2019-2021",
      role: "Computer Engineering",
      bullets: []
    },
  ],
  ResumeTitle: "Resume",
  ResumeCaption: "Download PDF Version"
},
  es: {
    title: "César Ponce | Portafolio",
    description: "Analista de Datos con más de 3 años de experiencia liderando proyectos estratégicos y operaciones críticas en la industria ganadera de Estados Unidos. Especializado en transformar datos en insights accionables que impulsan decisiones informadas y mejoran el desempeño operativo.",
    ProfileName: "César Ponce",
    ProfileRole: "Data Analyst",
    ProfileSlogan: "Transformo datos en insights claros que impulsan mejores decisiones.",

    FocusTitle: "ENFOQUE",
    FocusBullets: [
      "Transformo datos en decisiones accionables",
      "Priorizo calidad de datos",
      "Enfoque en impacto de negocio",
      "Identifico patrones y anomalías clave",
      "Comunico insights de forma clara",
      "Aprendizaje continuo"
    ],
    SkillsTitle: "HABILIDADES",
    SkillsBullets: [
      "Python",
      "Excel",
      "Power BI",
      "Tableau",
      "Git"
    ],
    StrenghtsTitle: "FORTALEZAS",
    StrenghtsBullets: [
      "Pensamiento analítico",
      "Atención al detalle",
      "Resolución de problemas",
      "Comunicación clara",
      "Toma de decisiones basada en datos"
    ],
    PostCardsTitle: "Mis Proyectos",
    SectionTitle: "TRAYECTORIA PROFESIONAL",
    SectionExperienceItems: [
      {
        title: "Brandao Cattle LLC",
        period: "Mar 2023 - Actualidad",
        role: "Analista de datos",
        bullets: [
          "Calidad y validación de datos.",
          "Reducción de inconsistencias.",
          "Optimización de decisiones con KPIs.",
          "Automatización de reportes.",
          "Dashboards en Power BI en tiempo real.",
          "Comunicación clara de insights.",
          "Segmentación y detección de patrones.",
          "Identificación de riesgos y anomalías."
        ]
      },
      {
        title: "CIBANCO S.A",
        period: "Ago 2021 - Feb 2023",
        role: "Regional Technical Support",
        bullets: [
          "Soporte técnico e infraestructura para sistemas críticos.",
          "Análisis de incidencias y optimización de procesos.",
          "Gestión de tickets y generación de reportes operativos."
        ]
      },
      {
        title: "Universidad Autonoma de Baja California (UABC)",
        period: "2019-2021",
        role: "Ingenieria en Computacion",
        bullets: []
      },
    ],
    ResumeTitle: "Curriculum Vitae",
    ResumeCaption: "Descarga Version PDF"
  }
} satisfies Record<"en" | "es", SiteContent>;
