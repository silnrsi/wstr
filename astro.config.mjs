// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: process.env.ASTRO_SITE,
	base: process.env.ASTRO_BASE,
	integrations: [
		starlight({
			title: 'Writing Systems Technical Resources',
			markdown: {
				// TODO: Turn this on to test out if we want automatic
				// heading links. If so remove it as `true` is the new default.
				headingLinks: false,
				shikiConfig: {				// TODO: Check if Expressive Code
					theme: 'css-variables', // block render has been disable
				},							// and remove if it's not required.
			},
			logo: {
				src: './src/assets/logo.svg',
				replacesTitle: false,
			},
			favicon: 'favicon.ico',
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/silnrsi/wstr' },
			],
			sidebar: [
				{
					label: 'Guides',
					autogenerate: { directory: 'guides' },
				},
				{
					label: 'Topics',
					items: [
						//{ slug: 'topics/writingsystems/writing-systems' },
						{ label: 'Writing Systems', collapsed: true, autogenerate: { directory: 'topics/writingsystems' } },
						{ label: 'Computing Support', collapsed: true, autogenerate: { directory: 'topics/computing' } },
						{ label: 'Encoding & Unicode', collapsed: true, autogenerate: { directory: 'topics/encoding' } },
						{ label: 'Input & Keyboards', collapsed: true, autogenerate: { directory: 'topics/input' } },
						{ label: 'Fonts', collapsed: true, autogenerate: { directory: 'topics/fonts' } },
						{ label: 'Layout', collapsed: true, autogenerate: { directory: 'topics/layout' } },
						{ label: 'Analysis', collapsed: true, autogenerate: { directory: 'topics/analysis' } },
				],
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
			components: {
				// Override the default Footer component
				Hero: './src/components/Hero.astro',
				PageTitle: './src/components/PageTitle.astro',
				Footer: './src/components/Footer.astro',
			}, 
			customCss: [
				// Relative path to your custom CSS file
				'./src/styles/custom.css',
			  ],
		}),
	],
});
