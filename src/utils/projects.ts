import fs from "node:fs";
import path from "node:path";
import { load } from "js-yaml";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import {
  getProjectBaseSlug,
  getProjectLanguageFromId,
  isLocalizedProjectId,
  type ProjectLanguage,
} from "./projectSlugs";

export interface UploadedProjectData {
  title: string;
  description: string;
  image: string;
  tags: string[];
  date: Date;
  links: Record<string, string>;
  lang: ProjectLanguage;
}

export interface UploadedProject {
  id: string;
  slug: string;
  body: string;
  html: string;
  data: UploadedProjectData;
}

const uploadsProjectsDirectory = path.join(
  process.cwd(),
  "public",
  "uploads",
  "projects",
);

const markdownExtensionPattern = /\.(md|mdx)$/;

const hasUploadsProjectFiles = () => {
  try {
    return fs.readdirSync(uploadsProjectsDirectory).some((fileName) =>
      isLocalizedProjectId(fileName),
    );
  } catch {
    return false;
  }
};

const splitFrontmatter = (fileContent: string) => {
  if (!fileContent.startsWith("---")) {
    return { frontmatter: {}, body: fileContent.trim() };
  }

  const closingMarkerIndex = fileContent.indexOf("\n---", 3);

  if (closingMarkerIndex === -1) {
    return { frontmatter: {}, body: fileContent.trim() };
  }

  const rawFrontmatter = fileContent.slice(3, closingMarkerIndex).trim();
  const body = fileContent.slice(closingMarkerIndex + 4).trim();

  try {
    return {
      frontmatter: (load(rawFrontmatter) as Record<string, unknown>) ?? {},
      body,
    };
  } catch {
    return { frontmatter: {}, body };
  }
};

const asString = (value: unknown, fallback = "") =>
  typeof value === "string" ? value : fallback;

const asStringArray = (value: unknown) =>
  Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];

const asStringRecord = (value: unknown) => {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(value).filter(
      (entry): entry is [string, string] => typeof entry[1] === "string",
    ),
  );
};

const resolveProjectImagePath = (image: string) => {
  if (!image) {
    return "";
  }

  if (image.startsWith("/") || image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }

  return `/uploads/images/${image}`;
};

const parseProjectDate = (value: unknown) => {
  if (typeof value !== "string") {
    return new Date(0);
  }

  const parsedDate = new Date(value);

  return Number.isNaN(parsedDate.getTime()) ? new Date(0) : parsedDate;
};

const renderMarkdown = async (markdown: string) => {
  const rendered = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(markdown);

  return String(rendered);
};

const parseProjectFile = async (fileName: string) => {
  const language = getProjectLanguageFromId(fileName);

  if (!language) {
    return null;
  }

  const filePath = path.join(uploadsProjectsDirectory, fileName);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { frontmatter, body } = splitFrontmatter(fileContent);
  const html = await renderMarkdown(body);

  return {
    id: fileName,
    slug: getProjectBaseSlug(fileName),
    body,
    html,
    data: {
      title: asString(frontmatter.title, getProjectBaseSlug(fileName)),
      description: asString(frontmatter.description),
      image: resolveProjectImagePath(asString(frontmatter.image)),
      tags: asStringArray(frontmatter.tags),
      date: parseProjectDate(frontmatter.date),
      links: asStringRecord(frontmatter.links),
      lang: language,
    },
  } satisfies UploadedProject;
};

export const getLocalizedProjects = async (language: ProjectLanguage) => {
  if (!hasUploadsProjectFiles()) {
    return [];
  }

  const fileNames = fs
    .readdirSync(uploadsProjectsDirectory)
    .filter((fileName) => markdownExtensionPattern.test(fileName))
    .filter((fileName) => isLocalizedProjectId(fileName));

  const projects = (
    await Promise.all(fileNames.map((fileName) => parseProjectFile(fileName)))
  ).filter((project): project is UploadedProject => project !== null);

  return projects
    .filter((project) => project.data.lang === language)
    .filter((project, index, entries) => {
      return entries.findIndex((candidate) => candidate.slug === project.slug) === index;
    });
};
