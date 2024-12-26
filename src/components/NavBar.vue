<script setup lang="ts">
import { RouterLink } from 'vue-router';
import ThemeToggle from './ThemeToggle.vue';
</script>

<template>
    <nav class="bg-white dark:bg-gray-800 shadow-md">
        <div class="max-w-7xl mx-auto px-4">
            <div class="flex justify-between h-16">
                <div class="flex space-x-8 items-center">
                    <RouterLink
                        to="/"
                        class="text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium"
                    >
                        Home
                    </RouterLink>
                    <RouterLink
                        to="/about-us"
                        class="text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium"
                    >
                        About Us
                    </RouterLink>
                    <RouterLink
                        to="/portfolio"
                        class="text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium"
                    >
                        Portfolio
                    </RouterLink>
                    <RouterLink
                        to="/privacy"
                        class="text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium"
                    >
                        Privacy
                    </RouterLink>
                    <RouterLink
                        to="/contact"
                        class="text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium"
                    >
                        Contact
                    </RouterLink>
                    <RouterLink
                        to="/blog"
                        class="text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium"
                    >
                        Blog
                    </RouterLink>
                </div>
                <div class="flex items-center">
                    <ThemeToggle />
                </div>
            </div>
        </div>
    </nav>
</template>
