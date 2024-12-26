import { ref } from 'vue';
import { fetchPageData } from '@/services/api';
import { trimSlash } from 'src/utils/url.ts';

export interface PageData {
    title: string;
    content: string;
    success: boolean;
    status: number;
    [key: string]: any;
}

export function usePages() {
    const page = ref<PageData | null>(null);
    const loading = ref(false);
    const error = ref<string | null>(null);

    const fetchPage = async (slug: string) => {
        if (loading.value) return; // Prevent multiple simultaneous requests

        slug = trimSlash(slug);

        loading.value = true;
        error.value = null;

        try {
            const data = await fetchPageData(slug);
            if (data.success) {
                page.value = data;
            } else {
                error.value = 'Page not found';
                page.value = null;
            }
        } catch (e: any) {
            error.value = e.message || 'Failed to load page';
            page.value = null;
        } finally {
            loading.value = false;
        }
    };

    return {
        page,
        loading,
        error,
        fetchPage,
    };
}
