export type ProjectLanguage = "en" | "es";

export const localizedProjectFilePattern = /\.(en|es)\.(md|mdx)$/;

export const isLocalizedProjectId = (projectId: string) =>
  localizedProjectFilePattern.test(projectId);

export const getProjectBaseSlug = (projectId: string) =>
  projectId.replace(localizedProjectFilePattern, "");

export const getProjectLanguageFromId = (projectId: string) => {
  const match = projectId.match(localizedProjectFilePattern);

  if (match?.[1] === "es") {
    return "es";
  }

  if (match?.[1] === "en") {
    return "en";
  }

  return null;
};
