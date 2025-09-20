import type { APIRoute } from "astro";
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
    const entries = await getCollection('docs', (entry) => ('shortcode' in entry.data));
    return entries.map((entry) => ({
        params: { shortcode: entry.data.shortcode },
        props: { url: '/' + entry.id },
    }));
}

export const GET: APIRoute = ({ props, redirect }) => {
    return redirect(props.url, 303);
};
