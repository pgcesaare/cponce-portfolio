import { defineCollection, z } from "astro:content";

const projects = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    tags: z.array(z.string()),
    date: z.date(),
    links: z.record(z.string()).optional(),
    lang: z.string()
  })
});

export const collections = { projects };