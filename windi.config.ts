import { defineConfig } from 'windicss/helpers';
import formsPlugin from 'windicss/plugin/forms';

export default defineConfig({
    darkMode: 'class',
    extract: {
        include: ['src/**/*.{vue,html,jsx,tsx}'],
        exclude: ['node_modules', '.git'],
    },
    plugins: [formsPlugin],
    theme: {
        extend: {
            colors: {
                teal: {
                    100: '#096',
                },
            },
        },
    },
});
