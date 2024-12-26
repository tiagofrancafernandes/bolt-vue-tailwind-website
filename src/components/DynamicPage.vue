<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { usePages } from '../composables/usePages';
import { trimSlash } from 'src/utils/url.ts';

const route = useRoute();
const { page, loading, error, fetchPage } = usePages();

const getPageID = (value: any) => {
    value = typeof value === 'string' ? value.trim() : 'not-found';

    let pagesPrefix = ['/p/', '/pages/'];

    for (let prefix of pagesPrefix) {
        if (value.startsWith(prefix)) {
            value = value.slice(prefix?.length);
            return trimSlash(value as string);
        }
    }

    return trimSlash(value as string);
};

const loadPage = async () => {
    let slug = ['/index.html'].includes(route.path) ? getPageID(route?.query?.path || null) : getPageID(route.path);

    console.log({
        slug: slug,
        'route.path': route.path,
        'route.query': route.query,
        route: route,
    });

    try {
        await fetchPage(slug);
    } catch (error) {
        console.error(error);
    }
};

// Watch for route changes
watch(() => route.path, loadPage, { immediate: true });

//onMounted(loadPage);
onMounted(async () => {
    await loadPage();
});
</script>

<template>
    <div class="min-h-screen bg-gray-50 py-12 px-4">
        <div class="max-w-3xl mx-auto">
            <div v-if="loading" class="text-center py-8">
                <div class="text-gray-600">Loading...</div>
            </div>

            <div v-else-if="error" class="text-center py-8">
                <div v-if="error === 'Page not found'" class="text-red-600">
                    <h1 class="text-4xl font-bold mb-4">404</h1>
                    <p>The page you're looking for doesn't exist.</p>
                </div>
                <div v-else class="text-red-600">
                    {{ error }}
                </div>
            </div>

            <div v-else-if="page" class="bg-white rounded-lg shadow-md p-8">
                <h1 class="text-4xl font-bold text-gray-900 mb-6">{{ page.title }}</h1>
                <div class="prose prose-lg max-w-none" v-html="page.content"></div>
            </div>
        </div>
    </div>
</template>
