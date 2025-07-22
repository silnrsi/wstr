import { defineCollection, z } from 'astro:content';
import { docsLoader } from "@astrojs/starlight/loaders";
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: z.object({
        subtitle: z.string().optional(),
        authors: z.string().optional(),
        scrpropCode: z.string().optional(),
        scrpropRegion: z.string().optional(),
        scrpropStatus: z.string().optional(),
      }),
    }),
  }),
};