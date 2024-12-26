<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import { usePosts } from '../composables/usePosts';
import type { Post } from '../types/blog';

const route = useRoute();
const { loading, error, fetchPost } = usePosts();
const post = ref<Post | null>(null);

onMounted(async () => {
    const postId = Number(route.params.id);
    post.value = await fetchPost(postId);
});
</script>

<template>
    <div class="min-h-screen bg-gray-50 py-12 px-4">
        <div class="max-w-3xl mx-auto">
            <RouterLink to="/blog" class="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8">← Back to Blog</RouterLink>

            <div v-if="loading" class="text-center py-8">
                <div class="text-gray-600">Loading post...</div>
            </div>

            <div v-else-if="error" class="text-center py-8">
                <div class="text-red-600">{{ error }}</div>
            </div>

            <article v-else-if="post" class="bg-white rounded-lg shadow-md p-8">
                <h1 class="text-4xl font-bold text-gray-900 mb-6">{{ post.title }}</h1>
                <p class="text-gray-600 leading-relaxed">{{ post.body }}</p>
            </article>
        </div>
    </div>
</template>
