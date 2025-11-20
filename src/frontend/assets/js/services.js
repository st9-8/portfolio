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

        const container = document.getElementById('services-container');

        if (services.length === 0) {
            container.innerHTML = `
                <div class="col-span-full text-center py-12">
                    <svg class="w-16 h-16 mx-auto text-gray-900 dark:text-white mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
                    </svg>
                    <p class="text-gray-600 dark:text-gray-400">No services available at the moment</p>
                </div>
            `;
            return;
        }

        container.innerHTML = services.map(service => `
            <div class="service-card bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
                <div class="h-48 overflow-hidden bg-gray-100 dark:bg-gray-700">
                    <img src="${service.image?.file || 'https://via.placeholder.com/400x300?text=' + encodeURIComponent(service.name)}"
                         alt="${service.name}"
                         class="service-image w-full h-full object-cover">
                </div>
                <div class="p-6">
                    <h3 class="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
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
                <svg class="w-16 h-16 mx-auto text-gray-900 dark:text-white mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
