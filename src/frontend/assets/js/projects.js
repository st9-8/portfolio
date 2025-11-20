import { BASE_URL } from './config.js';
import { initMobileMenu, initThemeToggle } from './common/ui.js';

initThemeToggle();
initMobileMenu();

async function loadProjects() {
    try {
         const response = await fetch(BASE_URL + '/api/projects/');
         var projects = await response.json();
         projects = projects?.results ?? [];

        const container = document.getElementById('projects-container');
        if (!container) {
            return;
        }

        if (projects.length === 0) {
            container.innerHTML = `
                <div class="col-span-full text-center py-12">
                    <svg class="w-16 h-16 mx-auto text-gray-900 dark:text-white mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                    </svg>
                    <p class="text-gray-600 dark:text-gray-400">No projects available</p>
                </div>
            `;
            return;
        }

        container.innerHTML = projects.map((project) => {
            const techs = project.technologies ? project.technologies.split(',').map((t) => t.trim()) : [];
            const imageSrc = project.image?.file || project.image || `https://via.placeholder.com/640x400?text=${encodeURIComponent(project.name)}`;
            const hasLink = Boolean(project.link);

            return `
                <div class="project-card bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col h-full">
                    <div class="project-media bg-gray-100 dark:bg-gray-700">
                        <img src="${imageSrc}" alt="${project.name}" class="project-image w-full h-full object-cover">
                    </div>

                    <h3 class="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                        ${project.name}
                    </h3>

                    <p class="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                        ${project.description}
                    </p>

                    <div class="flex flex-wrap gap-2 mb-6">
                        ${techs.map((tech) => `
                            <span class="skill-badge px-3 py-1 text-xs font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full">
                                ${tech}
                            </span>
                        `).join('')}
                    </div>

                    ${hasLink ? `
                        <a href="${project.link}" target="_blank" class="cta-outline mt-auto border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg transition-colors font-medium">
                            View Project
                            <svg class="w-4 h-4 text-gray-900 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                            </svg>
                        </a>
                    ` : `
                        <span class="mt-auto inline-flex items-center justify-center w-full px-4 py-3 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg text-sm text-gray-600 dark:text-gray-400">
                            Project link coming soon
                        </span>
                    `}
                </div>
            `;
        }).join('');
    } catch (error) {
        console.error('Error loading projects:', error);
        const container = document.getElementById('projects-container');
        if (!container) {
            return;
        }
        container.innerHTML = `
            <div class="col-span-full text-center py-12">
                <svg class="w-16 h-16 mx-auto text-gray-900 dark:text-white mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <p class="text-gray-600 dark:text-gray-400">Error loading projects</p>
            </div>
        `;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
});
