import { ref } from 'vue';
import type { Post } from '../types/blog';
import { cache } from '../services/cache';

export function usePosts() {
    const posts = ref<Post[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);

    const fetchPosts = async (page: number = 1, limit: number = 10) => {
        loading.value = true;
        error.value = null;

        const cacheKey = `posts-page-${page}-limit-${limit}`;
        const cachedData = cache.get<Post[]>(cacheKey);

        if (cachedData) {
            posts.value = cachedData;
            loading.value = false;
            return;
        }

        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`, {
                method: 'GET',
                // mode: 'no-cors',
            });
            const data = await response.json();
            cache.set(cacheKey, data);
            posts.value = data;
        } catch (e) {
            error.value = 'Failed to load posts';
        } finally {
            loading.value = false;
        }
    };

    const fetchPost = async (id: number) => {
        loading.value = true;
        error.value = null;

        const cacheKey = `post-${id}`;
        const cachedData = cache.get<Post>(cacheKey);

        if (cachedData) {
            loading.value = false;
            return cachedData;
        }

        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
                method: 'GET',
                mode: 'no-cors',
            });
            const data = await response.json();
            cache.set(cacheKey, data);
            return data;
        } catch (e) {
            error.value = 'Failed to load post';
            return null;
        } finally {
            loading.value = false;
        }
    };

    return {
        posts,
        loading,
        error,
        fetchPosts,
        fetchPost,
    };
}
