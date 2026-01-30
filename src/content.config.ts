import { defineCollection, z } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { docsLoader } from "@astrojs/starlight/loaders";
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: z.object({
        subtitle: z.string().optional(),
        authors: z.string().optional(),
        shorturl: z.string().optional(),
        scrpropcode: z.string().optional(),
        scrpropname: z.string().optional(),
        scrpropshortname: z.string().optional(),
        scrpropaltnames: z.string().optional(),
        scrproptype: z.string().optional(),
        scrpropregion: z.string().optional(),
        scrpropstatus: z.string().optional(),
        scrpropdirection: z.string().optional(),
        scrpropbaseline: z.string().optional(),
        scrpropcase: z.string().optional(),
        scrpropwspace: z.string().optional(),
        scrpropbehavior: z.string().optional(),
        scrpropisonumkey: z.string().optional(),
        scrpropotcode: z.string().optional(),
        tags: z.array(z.string()).optional(),
      }),
    }),
  }),
  articlelibdocs: defineCollection({
    loader: glob({ pattern: ['articlelib/**/*.md', 'articlelib/**/*.mdx', '!articlelib/article-index.mdx'], base: './src/content/docs' }),
    schema: docsSchema({
      extend: z.object({
        subtitle: z.string().optional(),
        authors: z.string().optional(),
        shorturl: z.string().optional(),
        tags: z.array(z.string()).optional(),
      }),
    }), 
  }),
  topicsdocs: defineCollection({
    loader: glob({ pattern: ['topics/**/*.md', 'topics/**/*.mdx'], base: './src/content/docs' }),
    schema: docsSchema({
      extend: z.object({
        subtitle: z.string().optional(),
        authors: z.string().optional(),
        shorturl: z.string().optional(),
        tags: z.array(z.string()).optional(),
      }),
    }), 
  }),
  sources: defineCollection({
    loader: file("src/data/sources.yaml"),
    schema: z.object({
      abstract: z.string().optional(),
      addendum: z.string().optional(),
      author: z.string().optional(),
      annotation: z.string().optional(),
      booktitle: z.string().optional(),
      date: z.string().optional(),
      editor: z.string().optional(),
      entrytype: z.enum(["article", "book", "inbook", "inproceedings", "misc", "online"]),
      entrysubtype: z.enum(['f']).optional(),
      isbn: z.string().optional(),
      issn: z.string().optional(),
      journaltitle: z.string().optional(),
      keywords: z.array(z.string()),
      location: z.string().optional(),
      number: z.string().optional(),
      organization: z.string().optional(),
      pages: z.string().optional(),
      presort: z.number().nonnegative().optional(),
      publisher: z.string().optional(),
      series: z.string().optional(),
      sortname: z.string().optional(),
      title: z.string(),
      url: z.string().optional(),
      urldate: z.string().optional(),
      volume: z.string().optional(),
    })
    .required({ entrytype: true, title: true, keywords: true })
  }),
}