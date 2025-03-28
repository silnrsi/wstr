// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://silnrsi.github.io',
	base: 'wstr-sample-site',
	integrations: [
		starlight({
			title: 'Writing Systems Technical Resources',
			logo: {
				src: './src/assets/logo.svg',
				replacesTitle: false,
			  },
			favicon: 'favicon.ico',
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
					items: [
						//{ slug: 'topics/writingsystems/writing-systems' },
						{ label: 'Writing Systems', autogenerate: { directory: 'topics/writingsystems' } },
						{ label: 'Computing Support', autogenerate: { directory: 'topics/computing' } },
						{ label: 'Encoding', autogenerate: { directory: 'topics/encoding' } },
						{ label: 'Input', autogenerate: { directory: 'topics/input' } },
						{ label: 'Fonts', autogenerate: { directory: 'topics/fonts' } },
						{ label: 'Layout', autogenerate: { directory: 'topics/layout' } },
						{ label: 'Analysis', autogenerate: { directory: 'topics/analysis' } },
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
