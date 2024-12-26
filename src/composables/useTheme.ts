import { ref, onMounted } from 'vue';

const isDark = ref(true); // Default to dark mode

export function useTheme() {
    const toggleTheme = () => {
        isDark.value = !isDark.value;
        updateTheme();
    };

    const updateTheme = () => {
        // Update localStorage
        localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
        // Update document class
        if (isDark.value) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    const initializeTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            isDark.value = savedTheme === 'dark';
        }
        updateTheme();
    };

    onMounted(() => {
        initializeTheme();
    });

    return {
        isDark,
        toggleTheme,
    };
}
