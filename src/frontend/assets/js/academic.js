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

function renderKeywords(keywords) {
    if (!keywords) {
        return '';
    }

    const tags = keywords
        .split(',')
        .map((keyword) => keyword.trim())
        .filter((keyword) => keyword.length);

    if (!tags.length) {
        return '';
    }

    return `
        <div class="flex flex-wrap gap-2 mb-4">
            ${tags.map((keyword) => `
                <span class="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm font-medium">
                    ${keyword}
                </span>
            `).join('')}
        </div>
    `;
}

function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const formationsSection = document.getElementById('formations-section');
    const publicationsSection = document.getElementById('publications-section');

    if (!tabBtns.length || !formationsSection || !publicationsSection) {
        return;
    }

    tabBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            const tab = btn.dataset.tab;

            tabBtns.forEach((b) => {
                b.classList.remove('active');
                b.classList.add('text-gray-600', 'dark:text-gray-400');
            });
            btn.classList.add('active');
            btn.classList.remove('text-gray-600', 'dark:text-gray-400');

            if (tab === 'formations') {
                formationsSection.classList.remove('hidden');
                publicationsSection.classList.add('hidden');
            } else {
                formationsSection.classList.add('hidden');
                publicationsSection.classList.remove('hidden');
            }
        });
    });
}

async function loadFormations() {
    try {
         const response = await fetch(BASE_URL + '/api/formations/');
         var formations = await response.json();
         formations = formations?.results ?? [];

//        const formations = [
//            {
//                id: 1,
//                name: 'Ph.D. in Computational Linguistics',
//                school: 'University of Technology',
//                start_date: '2020-09-01',
//                end_date: null
//            },
//            {
//                id: 2,
//                name: 'Master in Computer Science',
//                school: 'National Polytechnic School',
//                start_date: '2015-09-01',
//                end_date: '2017-06-30'
//            },
//            {
//                id: 3,
//                name: 'Bachelor in Software Engineering',
//                school: 'Institute of Technology',
//                start_date: '2012-09-01',
//                end_date: '2015-06-30'
//            }
//        ];

        const container = document.getElementById('formations-container');
        if (!container) {
            return;
        }

        if (formations.length === 0) {
            container.innerHTML = `
                <div class="text-center py-12">
                    <p class="text-gray-600 dark:text-gray-400">No formations available</p>
                </div>
            `;
            return;
        }

        container.innerHTML = formations.map((formation) => {
            const isCurrent = !formation.end_date;

            return `
                <div class="academic-card mb-6 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <div class="flex items-start justify-between mb-3">
                        <div class="flex-1">
                            <h3 class="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                                ${formation.name}
                            </h3>
                            <p class="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                ${formation.school}
                            </p>
                            <p class="text-gray-600 dark:text-gray-400">
                                ${formatDate(formation.start_date)} - ${isCurrent ? 'Present' : formatDate(formation.end_date)}
                            </p>
                        </div>
                        ${isCurrent ? `
                            <span class="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full text-sm font-medium">
                                In Progress
                            </span>
                        ` : ''}
                    </div>
                </div>
            `;
        }).join('');
    } catch (error) {
        console.error('Error loading formations:', error);
    }
}

async function loadPublications() {
    try {
         const response = await fetch(BASE_URL + '/api/publications/');
         var publications = await response.json();
         publications = publications?.results ?? [];


        const container = document.getElementById('publications-container');
        if (!container) {
            return;
        }

        if (publications.length === 0) {
            container.innerHTML = `
                <div class="text-center py-12">
                    <p class="text-gray-600 dark:text-gray-400">No publications available</p>
                </div>
            `;
            return;
        }

        container.innerHTML = publications.map((pub) => `
            <div class="academic-card mb-6 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 class="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                    ${pub.name}
                </h3>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    ${pub.authors} • ${formatDate(pub.pub_date)}
                </p>
                <p class="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                    ${pub.abstract}
                </p>
                ${renderKeywords(pub.keywords)}
                <div class="flex flex-wrap gap-3">
                    ${pub.link ? `
                        <a href="${pub.link}" target="_blank" class="cta-outline inline-flex items-center gap-2 px-4 py-2 border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white rounded-lg transition-colors">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                            </svg>
                            View Online
                        </a>
                    ` : ''}
                    ${pub.full_document ? `
                        <a href="${pub.full_document}" target="_blank" class="cta-outline inline-flex items-center gap-2 px-4 py-2 border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white rounded-lg transition-colors">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                            </svg>
                            Download PDF
                        </a>
                    ` : ''}
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading publications:', error);
    }
}

    window.addEventListener('DOMContentLoaded', () => {
        initTabs();
    });

    window.addEventListener('load', () => {
        const scheduleFormations = () => {
            if ('requestIdleCallback' in window) {
                window.requestIdleCallback(loadFormations, { timeout: 2000 });
                window.requestIdleCallback(loadPublications, { timeout: 2200 });
            } else {
                window.setTimeout(loadFormations, 300);
                window.setTimeout(loadPublications, 400);
            }
        };
        scheduleFormations();
    });
})();
