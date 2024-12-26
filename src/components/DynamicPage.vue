<script setup lang="ts">
import { onMounted, onBeforeMount, watch } from 'vue';
import { useRoute } from 'vue-router';
import { usePages } from '../composables/usePages';

const route = useRoute();
const { page, loading, error, fetchPage } = usePages();

const trimSlash = (str: any) => {
    str = typeof str === 'string' ? str : '';
    return str.replaceAll(/^([\/]){1,}/g, '').replaceAll(/([\/]){1,}$/g, '');
};

const loadPage = async () => {
    const slug = trimSlash(route.path as string);
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
