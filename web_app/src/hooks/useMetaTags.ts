import { useEffect } from 'react';

interface MetaTagsOptions {
    title: string;
    description: string;
    url?: string;
    image?: string;
    type?: string;
}

/**
 * Dynamically sets document title, OG, and Twitter Card meta tags.
 * Restores defaults on unmount.
 */
export default function useMetaTags({ title, description, url, image, type = 'website' }: MetaTagsOptions) {
    useEffect(() => {
        const prev = document.title;
        document.title = title;

        const tags: HTMLMetaElement[] = [];

        const setMeta = (attr: 'property' | 'name', key: string, content: string) => {
            let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
            if (el) {
                el.dataset.prev = el.getAttribute('content') || '';
                el.setAttribute('content', content);
            } else {
                el = document.createElement('meta');
                el.setAttribute(attr, key);
                el.setAttribute('content', content);
                document.head.appendChild(el);
                el.dataset.created = 'true';
            }
            tags.push(el);
        };

        setMeta('name', 'description', description);
        setMeta('property', 'og:title', title);
        setMeta('property', 'og:description', description);
        setMeta('property', 'og:type', type);
        if (url) setMeta('property', 'og:url', url);
        if (image) setMeta('property', 'og:image', image);
        setMeta('name', 'twitter:title', title);
        setMeta('name', 'twitter:description', description);
        if (image) setMeta('name', 'twitter:image', image);

        return () => {
            document.title = prev;
            tags.forEach((el) => {
                if (el.dataset.created) {
                    el.remove();
                } else if (el.dataset.prev !== undefined) {
                    el.setAttribute('content', el.dataset.prev);
                }
            });
        };
    }, [title, description, url, image, type]);
}
