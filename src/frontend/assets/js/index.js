import { BASE_URL } from './config.js';
import { initMobileMenu, initThemeToggle } from './common/ui.js';

initThemeToggle();
initMobileMenu();

async function loadTechnologies() {
    try {
         const response = await fetch(BASE_URL + '/api/technologies/');
         var technologies = await response.json();
         technologies = technologies?.results ?? [];

//        const technologies = [
//            { name: 'Django', icon: null },
//            { name: 'Python', icon: null },
//            { name: 'Vue.js', icon: null },
//            { name: 'PostgreSQL', icon: null },
//            { name: 'Docker', icon: null },
//            { name: 'NLP', icon: null },
//            { name: 'Speech Processing', icon: null },
//            { name: 'Kaldi', icon: null }
//        ];

        const container = document.getElementById('technologies-container');
        if (!container) {
            return;
        }

        container.innerHTML = technologies.map(
            (tech) => `
                <span class="skill-badge px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
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
