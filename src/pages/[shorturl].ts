import type { APIRoute } from "astro";
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
    const entries = await getCollection('docs', (entry) => ('shorturl' in entry.data));
    return entries.map((entry) => ({
        params: { shorturl: entry.data.shorturl },
        props: { url: '/' + entry.id },
    }));
}

export const GET: APIRoute = ({ props, redirect }) => {
    return redirect(props.url, 303);
};
