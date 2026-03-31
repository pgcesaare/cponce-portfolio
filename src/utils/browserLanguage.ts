export type LocalizedPaths = {
  en: string;
  es: string;
};

export const getPathForBrowserLanguage = (
  language: string,
  paths: LocalizedPaths
) => (language.toLowerCase().startsWith("es") ? paths.es : paths.en);

export const syncLocalizedHref = (
  element: HTMLAnchorElement,
  paths: LocalizedPaths
) => {
  element.href = getPathForBrowserLanguage(navigator.language, paths);
};
