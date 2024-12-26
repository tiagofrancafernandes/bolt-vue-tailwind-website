import { buildUrl } from '../utils/url';
import { cache } from './cache';
import { PageData } from '@/composables/usePages.ts';
import { trimSlash } from 'src/utils/url.ts';

export const API_BASE_URL = 'https://admindemo.elmapicms.com/api/04b26added8747db9c25c29ddf3450e7/pages';
export const API_TOKEN = 'zt4mfjCzgBcX4n1MzGvCtbpzX6fiPg8ZOLiaugDF';

export const makeMockResponseData = (slug, response = null): PageData => {
    response = response && typeof response === 'object' && !Array.isArray(response) ? response : {};
    slug = typeof slug === 'string' ? slug : '';

    let _status = response?.status || 200;
    return {
        status: _status,
        success: _status === 200,
        title: slug
            .split('-')
            .map((word: any) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' '),
        content: response?.content || `<p>This is the ${slug} page content.</p>`,
        slug: slug,
    };
};

export async function fetchPageData(slug: string): Promise<PageData> {
    slug = trimSlash(slug);

    if (!slug || typeof slug !== 'string') {
        throw new Error('Invalid slug provided');
    }

    const cacheKey = `page-${slug}`;
    const cachedData: PageData = cache.get(cacheKey);

    if (cachedData) {
        return cachedData;
    }

    try {
        if (slug === 'not-found') {
            let returnData = makeMockResponseData(slug, { status: 404 });
            console.log('slug', slug, 'returnData', returnData);
            cache.set(cacheKey, returnData);
            return returnData;
        }

        const url = buildUrl(API_BASE_URL, {
            'where[url]': slug,
            first: 'true',
        });

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });

        const responseData = (await response.json()) || {};

        responseData.status = responseData.status || response.status || 422;

        // Since we can't access the real API, return mock data
        const mockData = makeMockResponseData(slug, responseData);

        let returnData = {
            ...mockData,
            slug: responseData?.url || mockData?.slug || slug,
            title: responseData?.title || mockData?.title,
            content: responseData?.content || mockData?.content,
        };

        cache.set(cacheKey, returnData);
        return returnData;
    } catch (error) {
        console.error('Error fetching page:', error);
        throw new Error('Failed to fetch page data');
    }
}
