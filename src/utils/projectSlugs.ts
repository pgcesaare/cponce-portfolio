export const localizedProjectFilePattern = /\.(en|es)\.(md|mdx)$/;

export const getProjectBaseSlug = (projectId: string) =>
  projectId.replace(localizedProjectFilePattern, "");

export const getProjectLanguageFromId = (projectId: string) => {
  const match = projectId.match(localizedProjectFilePattern);

  return match?.[1] === "es" ? "es" : "en";
};
