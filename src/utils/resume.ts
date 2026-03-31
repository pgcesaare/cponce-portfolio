import fs from "node:fs";
import path from "node:path";

export type ResumeLanguage = "en" | "es";

const resumeRootDirectory = path.join(process.cwd(), "public", "resume");

export const getResumePath = (lang: ResumeLanguage) => {
  const resumeDirectory = path.join(resumeRootDirectory, lang);
  const resumeFile = fs
    .readdirSync(resumeDirectory)
    .find((file) => file.toLowerCase().endsWith(".pdf"));

  if (!resumeFile) {
    return `/resume/${lang}`;
  }

  return `/resume/${lang}/${encodeURIComponent(resumeFile)}`;
};

export const getResumePaths = () => ({
  en: getResumePath("en"),
  es: getResumePath("es")
});
