import { BASE_URL } from './config.js';
import { initMobileMenu, initThemeToggle } from './common/ui.js';

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

    if (months < 12) {
        return `${months} month${months > 1 ? 's' : ''}`;
    }

    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    if (remainingMonths > 0) {
        return `${years}y ${remainingMonths}m`;
    }

    return `${years} year${years > 1 ? 's' : ''}`;
}

async function loadLectures() {
    try {
         const response = await fetch(BASE_URL + '/api/lectures/');
         var lectures = await response.json();
         lectures = lectures?.results ?? [];

//        const lectures = [
//            {
//                id: 1,
//                name: 'Advanced Web Development with Django',
//                description: 'Comprehensive course covering Django REST Framework, authentication, deployment, and best practices for building production-ready applications.',
//                school: 'Tech University',
//                start_date: '2023-09-01',
//                end_date: null,
//                syllabus: '/media/syllabus/django-advanced.pdf'
//            },
//            {
//                id: 2,
//                name: 'Introduction to Natural Language Processing',
//                description: 'Foundational course in NLP covering tokenization, language modeling, text classification, and an introduction to transformers.',
//                school: 'National Polytechnic School',
//                start_date: '2023-09-01',
//                end_date: null,
//                syllabus: '/media/syllabus/nlp-intro.pdf'
//            },
//            {
//                id: 3,
//                name: 'Full-Stack Web Development Bootcamp',
//                description: 'Intensive 12-week bootcamp teaching HTML, CSS, JavaScript, Vue.js, Django, and PostgreSQL. Students build complete web applications.',
//                school: 'Code Academy Africa',
//                start_date: '2023-01-15',
//                end_date: '2023-04-15',
//                syllabus: '/media/syllabus/fullstack-bootcamp.pdf'
//            },
//            {
//                id: 4,
//                name: 'Speech Processing for African Languages',
//                description: 'Graduate-level course on speech processing techniques with focus on low-resource African languages. Covers forced alignment, ASR, and TTS.',
//                school: 'University of Technology',
//                start_date: '2022-09-01',
//                end_date: '2023-01-31',
//                syllabus: '/media/syllabus/speech-processing.pdf'
//            },
//            {
//                id: 5,
//                name: 'Python Programming for Data Science',
//                description: 'Introduction to Python with emphasis on data analysis using Pandas, NumPy, and visualization with Matplotlib and Seaborn.',
//                school: 'Digital Skills Institute',
//                start_date: '2022-03-01',
//                end_date: '2022-07-01',
//                syllabus: '/media/syllabus/python-data-science.pdf'
//            }
//        ];

        const container = document.getElementById('lectures-container');
        if (!container) {
            return;
        }

        if (lectures.length === 0) {
            container.innerHTML = `
                <div class="text-center py-12">
                    <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                    </svg>
                    <p class="text-gray-600 dark:text-gray-400">No lectures available</p>
                </div>
            `;
            return;
        }

        container.innerHTML = lectures.map((lecture) => {
            const isCurrent = !lecture.end_date;
            const duration = calculateDuration(lecture.start_date, lecture.end_date);

            return `
                <div class="lecture-card mb-6 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                        <div class="flex-1">
                            <div class="flex items-center gap-3 mb-3">
                                <div class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                                    </svg>
                                </div>
                                <div>
                                    <h3 class="text-2xl font-bold text-primary dark:text-primary-light">
                                        ${lecture.name}
                                    </h3>
                                    <p class="text-gray-600 dark:text-gray-400 text-sm">
                                        ${lecture.school}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="flex flex-wrap gap-2">
                            ${isCurrent ? `
                                <span class="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full text-sm font-medium whitespace-nowrap">
                                    🟢 Ongoing
                                </span>
                            ` : `
                                <span class="px-3 py-1 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 rounded-full text-sm font-medium whitespace-nowrap">
                                    ${duration}
                                </span>
                            `}
                        </div>
                    </div>

                    <p class="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                        ${lecture.description}
                    </p>

                    <div class="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <span class="flex items-center gap-2">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                            </svg>
                            ${formatDate(lecture.start_date)} - ${isCurrent ? 'Present' : formatDate(lecture.end_date)}
                        </span>

                        ${lecture.syllabus ? `
                            <a href="${lecture.syllabus}" target="_blank" class="inline-flex items-center gap-2 text-primary hover:text-primary-light transition-colors font-medium">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                </svg>
                                View Syllabus
                            </a>
                        ` : ''}
                    </div>
                </div>
            `;
        }).join('');
    } catch (error) {
        console.error('Error loading lectures:', error);
        const container = document.getElementById('lectures-container');
        if (!container) {
            return;
        }
        container.innerHTML = `
            <div class="text-center py-12">
                <svg class="w-16 h-16 mx-auto text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <p class="text-gray-600 dark:text-gray-400">Error loading lectures</p>
            </div>
        `;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadLectures();
});
