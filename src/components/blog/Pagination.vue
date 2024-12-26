<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    currentPage: number;
    totalPages: number;
}>();

const emit = defineEmits<{
    (e: 'page-change', page: number): void;
}>();

const pages = computed(() => {
    const delta = 2;
    const range = [];
    for (let i = Math.max(2, props.currentPage - delta); i <= Math.min(props.totalPages - 1, props.currentPage + delta); i++) {
        range.push(i);
    }

    if (props.currentPage - delta > 2) {
        range.unshift('...');
    }
    if (props.currentPage + delta < props.totalPages - 1) {
        range.push('...');
    }

    range.unshift(1);
    if (props.totalPages !== 1) {
        range.push(props.totalPages);
    }

    return range;
});
</script>

<template>
    <div class="flex justify-center space-x-2">
        <button
            v-for="page in pages"
            :key="page"
            @click="page !== '...' && emit('page-change', Number(page))"
            :class="[
                'px-3 py-1 rounded-md',
                page === currentPage
                    ? 'bg-blue-600 text-white'
                    : page === '...'
                      ? 'text-gray-500 cursor-default'
                      : 'text-gray-700 hover:bg-gray-100',
            ]"
            :disabled="page === '...' || page === currentPage"
        >
            {{ page }}
        </button>
    </div>
</template>
