<script setup lang="ts">
import { onMounted, onBeforeMount, watch, ref } from 'vue';
import { useRoute } from 'vue-router';
import { usePages } from '@/composables/usePages';
import { cache } from '@/services/cache.ts';
import { fetchPageData } from '@/services/api.ts';
import { trimSlash } from 'src/utils/url.ts';

import NavBar from './components/NavBar.vue';

const pagesToPreload = ['about-us', 'privacy', 'portfolio'];
let preloadingPages = [];
const route = useRoute();

globalThis._cache = cache;

const preloadMainPages = async (awaitMode = false) => {
    for (let pageSlug of pagesToPreload) {
        console.log(`pageSlug: "${pageSlug}"`);

        if (preloadingPages.includes(pageSlug)) {
            return;
        }

        if (cache.has(`page-${pageSlug}`)) {
            continue;
        }

        let _line = '-'.repeat(30);
        console.log(`${_line}\nFetching ${pageSlug}\n${_line}\n`);

        preloadingPages.push(pageSlug);

        try {
            if (awaitMode) {
                await fetchPageData(pageSlug);
                continue;
            }

            fetchPageData(pageSlug);
            preloadingPages = preloadingPages.filter((i) => i !== pageSlug);
        } catch (e: any) {
            console.error(e);
        } finally {
            preloadingPages = preloadingPages.filter((i) => i !== pageSlug);
        }
    }
};

const syncPreloadPages = () => {
    preloadMainPages(false);
};

const asyncPreloadPages = async () => {
    await preloadMainPages(true);
};

onBeforeMount(async () => {
    preloadingPages.unshift(trimSlash(route.path));
    syncPreloadPages();
});

// Watch for route changes
watch(() => route.path, asyncPreloadPages, { immediate: true });
</script>

<template>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
        <NavBar />
        <RouterView />
    </div>
</template>
