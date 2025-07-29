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

        scrpropcode: z.string().optional(),
        scrpropname: z.string().optional(),
        scrproptype: z.string().optional(),
        scrpropregion: z.string().optional(),
        scrpropstatus: z.string().optional(),
        scrpropdir: z.string().optional(),
        scrpropbaseline: z.string().optional(),
        scrpropcase: z.string().optional(),
        scrproprwspace: z.string().optional(),
        scrpropbehavior: z.string().optional(),
        scrpropisocode: z.string().optional(),
        scrpropotcode: z.string().optional(),
      }),
    }),
  }),
};