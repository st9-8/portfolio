import { BASE_URL } from './config.js';
import { initMobileMenu, initThemeToggle } from './common/ui.js';

initThemeToggle();
initMobileMenu();

// Fetch and display services
async function loadServices() {
    try {
        var response = await fetch(BASE_URL + '/api/services/');
        response = await response.json()

        const services = response?.results ?? [];

        // Mock data
//        const services = [
//            {
//                id: 1,
//                name: 'Web Development',
//                description: 'Full-stack web application development using Django, Vue.js, and modern technologies. From MVP to production-ready applications.',
//                image: { file: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop' }
//            },
//            {
//                id: 2,
//                name: 'API Development',
//                description: 'RESTful API design and development with Django REST Framework. Scalable, secure, and well-documented APIs.',
//                image: { file: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop' }
//            },
//            {
//                id: 3,
//                name: 'NLP Consulting',
//                description: 'Natural Language Processing solutions for African languages. Speech recognition, text processing, and language modeling.',
//                image: { file: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=400&h=300&fit=crop' }
//            },
//            {
//                id: 4,
//                name: 'Technical Writing',
//                description: 'Clear and comprehensive technical documentation, API references, and user guides for your software projects.',
//                image: { file: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=300&fit=crop' }
//            },
//            {
//                id: 5,
//                name: 'Code Review & Mentoring',
//                description: 'Code review, architecture advice, and mentoring for Django and Vue.js projects. Best practices and optimization.',
//                image: { file: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop' }
//            },
//            {
//                id: 6,
//                name: 'Research Collaboration',
//                description: 'Collaboration on computational linguistics research, particularly for African language processing and speech technology.',
//                image: { file: 'https://images.unsplash.com/photo-1532619187608-e5375cab36aa?w=400&h=300&fit=crop' }
//            }
//        ];

        const container = document.getElementById('services-container');

        if (services.length === 0) {
            container.innerHTML = `
                <div class="col-span-full text-center py-12">
                    <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
                    </svg>
                    <p class="text-gray-600 dark:text-gray-400">No services available at the moment</p>
                </div>
            `;
            return;
        }

        container.innerHTML = services.map(service => `
            <div class="service-card bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
                <div class="h-48 overflow-hidden">
                    <img src="${service.image?.file || 'https://via.placeholder.com/400x300?text=' + encodeURIComponent(service.name)}"
                         alt="${service.name}"
                         class="service-image w-full h-full object-cover">
                </div>
                <div class="p-6">
                    <h3 class="text-2xl font-bold mb-3 text-primary dark:text-primary-light">
                        ${service.name}
                    </h3>
                    <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
                        ${service.description}
                    </p>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading services:', error);
        document.getElementById('services-container').innerHTML = `
            <div class="col-span-full text-center py-12">
                <svg class="w-16 h-16 mx-auto text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <p class="text-gray-600 dark:text-gray-400">Error loading services</p>
            </div>
        `;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadServices();
});
