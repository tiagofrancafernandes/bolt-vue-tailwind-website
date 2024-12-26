<script setup lang="ts">
import { onMounted, onBeforeMount, watch, ref } from 'vue';
import { useRoute } from 'vue-router';
import { usePages } from './composables/usePages';

import NavBar from './components/NavBar.vue';

const pagesToPreload = ['about-us', 'privacy', 'portfolio'];
const pagesPreloaded = ref(false);
const route = useRoute();
const { fetchPage } = usePages();

const routePathChanged = async (path) => {
    if (pagesPreloaded.value) {
        return;
    }

    console.log('routePathChanged', path, pagesPreloaded.value);
    for (let pageSlug of pagesToPreload) {
        console.log(`Fetching ${pageSlug}`);
        await fetchPage(pageSlug);
    }

    pagesPreloaded.value = true;
};

// Watch for route changes
watch(() => route.path, routePathChanged, { immediate: true });
</script>

<template>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
        <NavBar />
        <RouterView />
    </div>
</template>
