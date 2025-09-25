import type { APIRoute } from "astro";
import { getCollection } from 'astro:content';

const entries = await getCollection('docs', (entry) => ('shorturl' in entry.data));

export async function getStaticPaths() {
    return entries.map((entry) => ({
        params: { shorturl: (entry.data.shorturl + '/') },
        props: { url: '/' + entry.id },
    }));
}

export const GET: APIRoute = ({ params, props, redirect, rewrite }) => {
    const entry = entries.find(entry => entry.data.shorturl === params.shorturl);
    return !entry ? rewrite('/404') : redirect(props.url, 303);
};
