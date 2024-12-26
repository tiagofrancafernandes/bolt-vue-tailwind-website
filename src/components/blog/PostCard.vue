<script setup lang="ts">
import { RouterLink } from 'vue-router';
import type { Post } from '../../types/blog';

defineProps<{
    post: Post;
}>();
</script>

<template>
    <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
        <h2 class="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">{{ post.title }}</h2>
        <p class="text-gray-600 mb-4 line-clamp-3">{{ post.body }}</p>
        <RouterLink :to="`/blog/${post.id}`" class="text-blue-600 hover:text-blue-800 font-medium">Read more →</RouterLink>
    </div>
</template>
