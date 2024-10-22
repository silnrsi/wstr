// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Writing Systems Technical Resources',
			social: {
				github: 'https://github.com/silnrsi/wstr-sample-site',
			},
			sidebar: [
				{
					label: 'Guides',
					autogenerate: { directory: 'guides' },
				},
				{
					label: 'Topics',
					autogenerate: { directory: 'topics' },
				},
				{
					label: 'Scripts & Languages',
					autogenerate: { directory: 'scrlang' },
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
				{
					label: 'Support',
					autogenerate: { directory: 'support' },
				},
			],
		}),
	],
});
