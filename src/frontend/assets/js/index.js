import { BASE_URL } from './config.js';
import { initMobileMenu, initThemeToggle } from './common/ui.js';

initThemeToggle();
initMobileMenu();

async function loadTechnologies() {
    try {
         const response = await fetch(BASE_URL + '/api/technologies/');
         var technologies = await response.json();
         technologies = technologies?.results ?? [];

        const container = document.getElementById('technologies-container');
        if (!container) {
            return;
        }

        container.innerHTML = technologies.map(
            (tech) => `
                <span class="skill-badge px-4 py-2 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-full text-sm font-medium">
                    ${tech.name}
                </span>
            `
        ).join('');
    } catch (error) {
        console.error('Error loading technologies:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadTechnologies();
});