// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightLinksValidator from 'starlight-links-validator';
import astroBrokenLinksChecker from 'astro-broken-links-checker';
import rehypeFigureTitle from 'rehype-figure-title';
import rehypeExternalLinks from 'rehype-external-links';
import cookieconsent from "@jop-software/astro-cookieconsent";
import remarkCharacterDirectives from './src/plugins/remark-usv-directive.mts';
import remarkSourcesLinkReference from './src/plugins/remark-sources-link-reference.mts';

const googleAnalyticsId = 'G-WHT6CVPT8M';

// https://astro.build/config
export default defineConfig({
    site: process.env.ASTRO_SITE || "https://writingsystems.info",
    base: process.env.ASTRO_BASE || "/",
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
                    content:`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${googleAnalyticsId}');
                    `
                },
                {
                    tag: 'script',
                    attrs: {
                        defer: true,
                        type: 'text/plain',
                        'data-category': 'analytics'
                    },
                    content:`
                        gtag('consent', 'update', { analytics_storage: 'granted'});
                        console.log('granted analytics consent.');
                    `
                },
                {
                    tag: 'script',
                    attrs: {
                        defer: true,
                        type: 'text/plain',
                        'data-category': '!analytics'
                    },
                    content:`
                        gtag('consent', 'update', { analytics_storage: 'denied'});
                        console.log('denied analytics consent.');
                    `
                }
            ],
            markdown: {
                headingLinks: true,
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
                    //autogenerate: { directory: 'guides' },
                    items: [
                        'topics/computing/app-development-best-practice',
                        'topics/fonts/font-design-and-development',
                        'topics/fonts/building-and-modifying-sil-fonts',
                    ]
                },
                {
                    label: 'Topics',
                    items: [
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
                        'scrlang/scripts-index',
                        'scrlang/languages',
                        'scrlang/other-resources',
                    ]
                },
                {
                    label: 'Reference',
                    //autogenerate: { directory: 'reference' },
                    items: [
                        'reference/glossary',
                        'reference/standards',
                    ],
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
            plugins: process.env.CHECK_LINKS ? [starlightLinksValidator({
                sameSitePolicy: 'error',
            })] : [],
        }),
        astroBrokenLinksChecker({
            checkExternalLinks: false         // Optional: check external links (currently, caching to disk is not supported, and it is slow )
        }),
        cookieconsent({
            guiOptions: {
                consentModal: {
                    layout: 'box inline',
                    position: 'bottom left',
                },
                preferencesModal: {
                    layout: 'box',
                    position: 'right',
                    equalWeightButtons: true,
                    flipButtons: false,
                }
            },
            categories: {
                analytics: {
                    enabled: true,
                    services: {
                        ga4: {
                            label:
                                '<a href="https://marketingplatform.google.com/about/analytics/terms/us/" target="_blank">Google Analytics 4</a>',
                            cookies: [
                                {
                                    name: /^(_ga|gid)/,
                                },
                            ],
                        },
                    },
                },
            },
            language: {
                default: 'en',
                autoDetect: 'browser',
                translations: {
                    en: {
                        consentModal: {
                            title: 'We use analytics cookies',
                            description:
                                'Our website uses Google Analytics cookies only to help us understand which information is most useful to you.\
                                These cookies will only be enabled if you agree to accept them.\
                                We never use them for advertising and we do not collect or share user identity information.',
                            acceptAllBtn: 'Accept all',
                            acceptNecessaryBtn: 'Reject all',
                            showPreferencesBtn: 'Manage preferences',
                            footer: '<a href="/support/policies/#privacy">Privacy Policy</a>',
                        },
                        preferencesModal: {
                            title: 'Consent Preferences Center',
                            acceptAllBtn: 'Accept all',
                            acceptNecessaryBtn: 'Reject all',
                            savePreferencesBtn: 'Save preferences',
                            closeIconLabel: 'Close modal',
                            serviceCounterLabel: 'Service|Services',
                            sections: [
                                {
                                    title: 'Cookie Usage',
                                    description:
                                        'We use cookies strictly for analytics on this site and never for advertising.',
                                },
                                {
                                    title: 'Analytics',
                                    description:
                                        'We use Google Analytics, configured to never collect or share user identity information.',
                                    linkedCategory: 'analytics',
                                },
                                {
                                    title: 'More information',
                                    description:
                                        'For any query in relation to our policy on\
                                        cookies and your choices, please\
                                        <a class="cc__link" href="/support/contact/">contact us</a>.',
                                },
                            ],
                        },
                    },
                },
            },
        })
    ],
    markdown: {
        remarkPlugins: [
            remarkSourcesLinkReference('/biblio/'),
            remarkCharacterDirectives,
        ],
        rehypePlugins: [
            rehypeFigureTitle, [
                rehypeExternalLinks, {
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
    redirects: {
        "/guides/app-development-best-practice": "/topics/computing/app-development-best-practice",
        "/guides/font-design-and-development": "/topics/fonts/font-design-and-development",
    }
});
