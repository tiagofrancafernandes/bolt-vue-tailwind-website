<script setup lang="ts">
import { ref, onMounted } from 'vue';
import PostCard from '../components/blog/PostCard.vue';
import Pagination from '../components/blog/Pagination.vue';
import { usePosts } from '../composables/usePosts';

const { posts, loading, error, fetchPosts } = usePosts();
const currentPage = ref(1);
const POSTS_PER_PAGE = 10;
const TOTAL_POSTS = 100; // JSONPlaceholder has 100 posts total
const totalPages = Math.ceil(TOTAL_POSTS / POSTS_PER_PAGE);

const handlePageChange = async (page: number) => {
    currentPage.value = page;
    await fetchPosts(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

onMounted(() => {
    fetchPosts(currentPage.value);
});
</script>

<template>
    <div class="min-h-screen bg-gray-50 py-12 px-4">
        <div class="max-w-4xl mx-auto">
            <h1 class="text-4xl font-bold text-gray-900 mb-8">Blog Posts</h1>

            <div v-if="loading" class="text-center py-8">
                <div class="text-gray-600">Loading posts...</div>
            </div>

            <div v-else-if="error" class="text-center py-8">
                <div class="text-red-600">{{ error }}</div>
            </div>

            <div v-else class="space-y-6">
                <PostCard v-for="post in posts" :key="post.id" :post="post" />

                <div class="mt-8">
                    <Pagination :current-page="currentPage" :total-pages="totalPages" @page-change="handlePageChange" />
                </div>
            </div>
        </div>
    </div>
</template>
