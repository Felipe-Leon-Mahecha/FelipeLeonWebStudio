import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

const demos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/demos' }),
  schema: z.object({
    order: z.number(),
    title: z.string(),
    industry: z.string(),
    slug: z.string(),
    tagline: z.string(),
    description: z.string(),
    cta: z.string(),
    features: z.array(z.string()),
    palette: z.array(z.string()).length(2),
    accent: z.string(),
  }),
});

export const collections = { demos };
