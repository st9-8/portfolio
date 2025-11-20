(() => {
    const core = window.SiteCore;
    if (!core) {
        return;
    }

    const { BASE_URL, initMobileMenu, initThemeToggle } = core;

    initThemeToggle();
    initMobileMenu();

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

function calculateDuration(startDate, endDate) {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    const months = (end.getFullYear() - start.getFullYear()) * 12 + end.getMonth() - start.getMonth();
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    if (years > 0 && remainingMonths > 0) {
        return `${years}y ${remainingMonths}m`;
    }
    if (years > 0) {
        return `${years} year${years > 1 ? 's' : ''}`;
    }
    return `${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`;
}

async function loadExperiences() {
    try {
         const response = await fetch(BASE_URL + '/api/experiences/');
         var experiences = await response.json();
         experiences = experiences?.results ?? [];

        const container = document.getElementById('experiences-container');

        if (!container) {
            return;
        }

        if (experiences.length === 0) {
            container.innerHTML = `
                <div class="text-center py-12">
                    <svg class="w-16 h-16 mx-auto text-gray-900 dark:text-white mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                    <p class="text-gray-600 dark:text-gray-400">No experiences available</p>
                </div>
            `;
            return;
        }

        container.innerHTML = '<div class="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gray-300 dark:bg-gray-700 hidden md:block"></div>';

        experiences.forEach((exp, index) => {
            const isLeft = index % 2 === 0;
            const duration = calculateDuration(exp.start_date, exp.end_date);
            const isCurrent = !exp.end_date;

            const expHtml = `
                <div class="timeline-item mb-12 flex items-center" style="animation-delay: ${index * 0.1}s">
                    <div class="w-full md:w-5/12 ${isLeft ? 'md:pr-8 md:text-right' : 'md:ml-auto md:pl-8'} ${!isLeft ? 'md:order-2' : ''}">
                        <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                            <div class="flex items-center gap-2 mb-2 ${isLeft ? 'md:justify-end' : ''}">
                                <span class="skill-badge px-3 py-1 text-xs font-medium rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                                    ${isCurrent ? '🟢 Current' : duration}
                                </span>
                                <span class="skill-badge px-3 py-1 text-xs font-medium rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                                    ${exp.contract_type || 'N/A'}
                                </span>
                            </div>

                            <h3 class="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                                ${exp.title}
                            </h3>

                            <p class="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                                ${exp.organisation}
                            </p>

                            <div class="flex flex-wrap gap-2 mb-3 ${isLeft ? 'md:justify-end' : ''}">
                                <span class="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                                    ${exp.location}
                                </span>
                                <span class="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                                    ${formatDate(exp.start_date)} - ${isCurrent ? 'Present' : formatDate(exp.end_date)}
                                </span>
                            </div>

                            <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
                                ${exp.description}
                            </p>
                        </div>
                    </div>

                    <div class="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-100 dark:bg-gray-700 rounded-full border-4 border-gray-900 dark:border-white z-10"></div>
                </div>
            `;

            container.insertAdjacentHTML('beforeend', expHtml);
        });
    } catch (error) {
        console.error('Error loading experiences:', error);
        const container = document.getElementById('experiences-container');
        if (!container) {
            return;
        }
        container.innerHTML = `
            <div class="text-center py-12">
                <svg class="w-16 h-16 mx-auto text-gray-900 dark:text-white mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <p class="text-gray-600 dark:text-gray-400">Error loading experiences</p>
            </div>
        `;
    }
}

    window.addEventListener('load', () => {
        if ('requestIdleCallback' in window) {
            window.requestIdleCallback(loadExperiences, { timeout: 2000 });
        } else {
            window.setTimeout(loadExperiences, 300);
        }
    });
})();
