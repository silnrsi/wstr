// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightLinksValidator from 'starlight-links-validator';
import astroBrokenLinksChecker from 'astro-broken-links-checker';
import rehypeFigureTitle from 'rehype-figure-title';
import rehypeExternalLinks from 'rehype-external-links';

const googleAnalyticsId = 'G-RZ7NPXWX10'

// https://astro.build/config
export default defineConfig({
    site: process.env.ASTRO_SITE,
    base: process.env.ASTRO_BASE,
    integrations: [
        starlight({
            title: 'Writing Systems Technical Resources',
            head: [
                {
                    tag: 'script',
                    attrs: { 
                        defer: true,
                        src: `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`
                    }
                },
                {
                    tag: 'script',
                    attrs: { 
                        defer: true 
                    },
                    content: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('consent', 'default', {
                            ad_storage: 'denied', 
                            ad_user_data: 'denied', 
                            ad_personalization: 'denied', 
                            analytics_storage: 'denied',
                        });
                        gtag('config', '${googleAnalyticsId}');`
                }
            ],
            markdown: {
                // TODO: Turn this on to test out if we want automatic
                // heading links. If so remove it as `true` is the new default.
                headingLinks: false,
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
                    //autogenerate: { directory: 'scrlang' },
                    items: [
                        'scrlang/scripts',
                        'scrlang/languages',
                        'scrlang/other-resources',
                        'scrlang/test-index',
                    ]
                },
                {
                    label: 'Reference',
                    autogenerate: { directory: 'reference' },
                },
                {
                    label: 'Support',
                    autogenerate: { directory: 'support' },
                },
                {
                    label: 'Testing',
                    autogenerate: { directory: 'testing' },
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
            plugins: process.env.CHECK_LINKS ? [starlightLinksValidator({
                sameSitePolicy: 'error',
            })] : [],
        }),
        astroBrokenLinksChecker({
          logFilePath: 'broken-links.log',  // Optional: specify the log file path
          checkExternalLinks: false         // Optional: check external links (currently, caching to disk is not supported, and it is slow )
        }),
    ],
    markdown: {
        rehypePlugins: [rehypeFigureTitle,
          [rehypeExternalLinks,
            {
              target: '_blank', // Open external links in a new tab
              rel: ['external', 'nofollow',], // Add security attributes
              // Optional: Add content (e.g., an icon) to the end of external links
              content: {
                type: 'element',
                tagName: 'img',
                properties: {
                  src: '/svgs/external-link.svg',
                //title: 'External link',
                //alt: 'External link',
                },
                children: [],
              },
              // Optional: Add attributes to the added content
              contentProperties: { 'aria-hidden': true, class: 'external-link-icon' },
              // Optional: Filter which <a> tags are processed (e.g., exclude links within code blocks)
              selectors: 'a:not(pre a):not(code a)',
            },
          ],
        ],
      },
    });
