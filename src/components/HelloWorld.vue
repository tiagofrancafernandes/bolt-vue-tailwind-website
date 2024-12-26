<script setup lang="ts">
import { ref } from 'vue';

defineProps<{ msg: string }>();

const count = ref(0);
</script>

<template>
    <h1 class="text-4xl font-bold mb-4">{{ msg }}</h1>

    <div class="card bg-white p-6 rounded-lg shadow-md">
        <button type="button" @click="count++" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            count is {{ count }}
        </button>
        <p class="mt-4 text-gray-600">
            Edit
            <code class="bg-gray-100 px-2 py-1 rounded">components/HelloWorld.vue</code>
            to test HMR
        </p>
    </div>

    <p class="mt-4">
        Check out
        <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank" class="text-blue-500 hover:text-blue-600">create-vue</a>
        , the official Vue + Vite starter
    </p>
    <p class="mt-2">
        Learn more about IDE Support for Vue in the
        <a href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support" target="_blank" class="text-blue-500 hover:text-blue-600">
            Vue Docs Scaling up Guide
        </a>
        .
    </p>
    <p class="read-the-docs text-gray-500 mt-4">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
/* Keep only custom styles that can't be handled by WindiCSS */
</style>
