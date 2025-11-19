import { BASE_URL } from './config.js';
import { initMobileMenu, initThemeToggle } from './common/ui.js';

initThemeToggle();
initMobileMenu();

async function loadProjects() {
    try {
         const response = await fetch(BASE_URL + '/api/projects/');
         var projects = await response.json();
         projects = projects?.results ?? [];

//        const projects = [
//            {
//                id: 1,
//                name: 'AfroEvent Vibes',
//                description: 'Mobile event management application for African cultural events. Built with Django REST Framework and Flutter.',
//                link: 'https://projects.example.com/afroevent',
//                technologies: 'Django, Flutter, PostgreSQL, Docker',
//                image: 'https://images.unsplash.com/photo-1523475472560-d2df97ec485c?w=800&h=600&fit=crop'
//            },
//            {
//                id: 2,
//                name: 'Connectivo Dashboard',
//                description: 'Real-time analytics dashboard application for business intelligence. Features data visualization and reporting.',
//                link: 'https://projects.example.com/connectivo',
//                technologies: 'Vue.js, Django, Chart.js, Celery',
//                image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop'
//            },
//            {
//                id: 3,
//                name: 'Wolof Forced Alignment Tool',
//                description: 'Speech processing tool for Wolof language using Montreal Forced Aligner. Research project for phonetic analysis.',
//                link: 'https://projects.example.com/wolof-alignment',
//                technologies: 'Python, Kaldi, MFA, Praat',
//                image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop'
//            },
//            {
//                id: 4,
//                name: 'Blog Translation System',
//                description: 'Automated blog content translation and reformulation using NLP. Supports multiple African languages.',
//                link: 'https://projects.example.com/blog-translator',
//                technologies: 'Django, Nuxt.js, Transformers, Redis',
//                image: 'https://images.unsplash.com/photo-1522199710521-72d69614c702?w=800&h=600&fit=crop'
//            },
//            {
//                id: 5,
//                name: 'E-Learning Platform',
//                description: 'Complete e-learning platform with course management, video streaming, and progress tracking.',
//                link: 'https://projects.example.com/elearning',
//                technologies: 'Django, Vue.js, PostgreSQL, S3',
//                image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop'
//            },
//            {
//                id: 6,
//                name: 'Speech Recognition API',
//                description: 'RESTful API for speech recognition supporting Fulfulde and other West African languages.',
//                link: 'https://projects.example.com/speech-api',
//                technologies: 'FastAPI, wav2vec2, Docker, Redis',
//                image: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800&h=600&fit=crop'
//            }
//        ];

        const container = document.getElementById('projects-container');
        if (!container) {
            return;
        }

        if (projects.length === 0) {
            container.innerHTML = `
                <div class="col-span-full text-center py-12">
                    <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    <div class="project-media bg-gray-100 dark:bg-gray-900">
                        <img src="${imageSrc}" alt="${project.name}" class="project-image w-full h-full object-cover">
                    </div>

                    <h3 class="text-2xl font-bold mb-3 text-primary dark:text-primary-light">
                        ${project.name}
                    </h3>

                    <p class="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                        ${project.description}
                    </p>

                    <div class="flex flex-wrap gap-2 mb-6">
                        ${techs.map((tech) => `
                            <span class="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
                                ${tech}
                            </span>
                        `).join('')}
                    </div>

                    ${hasLink ? `
                        <a href="${project.link}" target="_blank" class="cta-outline mt-auto border-2 border-primary inline-flex items-center justify-center gap-2 w-full px-4 py-3 text-primary hover:bg-primary hover:text-white dark:hover:bg-primary-dark rounded-lg transition-colors font-medium">
                            View Project
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                            </svg>
                        </a>
                    ` : `
                        <span class="mt-auto inline-flex items-center justify-center w-full px-4 py-3 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg text-sm text-gray-500 dark:text-gray-400">
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
                <svg class="w-16 h-16 mx-auto text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
