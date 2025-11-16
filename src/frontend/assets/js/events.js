import { BASE_URL } from './config.js';
import { initMobileMenu, initThemeToggle } from './common/ui.js';

initThemeToggle();
initMobileMenu();

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
}

let carouselModal;
let carouselImageElement;
let carouselTitleElement;
let carouselCounterElement;
let carouselPrevBtn;
let carouselNextBtn;
let currentCarouselImages = [];
let currentCarouselIndex = 0;

function initCarouselModal() {
    carouselModal = document.getElementById('carousel-modal');
    if (!carouselModal) {
        return;
    }

    carouselImageElement = carouselModal.querySelector('[data-carousel-image]');
    carouselTitleElement = carouselModal.querySelector('[data-carousel-title]');
    carouselCounterElement = carouselModal.querySelector('[data-carousel-counter]');
    carouselPrevBtn = carouselModal.querySelector('[data-carousel-prev]');
    carouselNextBtn = carouselModal.querySelector('[data-carousel-next]');

    const closeBtn = carouselModal.querySelector('[data-carousel-close]');
    closeBtn?.addEventListener('click', closeCarousel);

    carouselPrevBtn?.addEventListener('click', () => changeCarouselImage(-1));
    carouselNextBtn?.addEventListener('click', () => changeCarouselImage(1));

    carouselModal.addEventListener('click', (event) => {
        if (event.target === carouselModal) {
            closeCarousel();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (carouselModal.classList.contains('hidden')) {
            return;
        }

        if (event.key === 'Escape') {
            closeCarousel();
        } else if (event.key === 'ArrowRight') {
            changeCarouselImage(1);
        } else if (event.key === 'ArrowLeft') {
            changeCarouselImage(-1);
        }
    });
}

function openCarousel(images, title) {
    if (!carouselModal || !images?.length) {
        return;
    }

    currentCarouselImages = images;
    currentCarouselIndex = 0;

    carouselTitleElement.textContent = title || 'Event photos';
    updateCarouselDisplay();

    carouselModal.classList.remove('hidden');
    document.body.classList.add('modal-open');
}

function closeCarousel() {
    if (!carouselModal) {
        return;
    }
    carouselModal.classList.add('hidden');
    document.body.classList.remove('modal-open');
}

function changeCarouselImage(step) {
    if (!currentCarouselImages.length) {
        return;
    }
    currentCarouselIndex = (currentCarouselIndex + step + currentCarouselImages.length) % currentCarouselImages.length;
    updateCarouselDisplay();
}

function updateCarouselDisplay() {
    const currentImage = currentCarouselImages[currentCarouselIndex];
    const source = currentImage?.file || currentImage;
    carouselImageElement.src = source;
    carouselImageElement.alt = `Event image ${currentCarouselIndex + 1}`;
    carouselCounterElement.textContent = `${currentCarouselIndex + 1} / ${currentCarouselImages.length}`;
}

function attachImageTriggers(events) {
    const triggers = document.querySelectorAll('[data-carousel-index]');
    triggers.forEach((trigger) => {
        trigger.addEventListener('click', () => {
            const index = Number(trigger.dataset.carouselIndex);
            const eventData = events[index];
            if (eventData?.images?.length) {
                openCarousel(eventData.images, eventData.name);
            }
        });
    });
}

async function loadEvents() {
    try {
         const response = await fetch(BASE_URL + '/api/events/');
         var events = await response.json();
         events = events?.results ?? [];

//        const events = [
//            {
//                id: 1,
//                name: 'International Conference on NLP',
//                title: 'Speaker',
//                description: 'Presented research on forced alignment for African languages. Engaged with international researchers and discussed future collaboration opportunities.',
//                event_type: 'Conference',
//                start_date: '2024-06-15',
//                end_date: '2024-06-18',
//                location: 'Paris, France',
//                source_website: 'https://nlp-conference.example.com',
//                presentation_document: 'https://example.com/presentations/nlp-conf.pdf',
//                images: [
//                    { file: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&h=600&fit=crop' },
//                    { file: 'https://images.unsplash.com/photo-1522199710521-72d69614c702?w=900&h=600&fit=crop' }
//                ]
//            },
//            {
//                id: 2,
//                name: 'African AI Summit',
//                title: 'Attendee',
//                description: 'Attended sessions on machine learning applications in African contexts. Networked with AI practitioners and researchers from across the continent.',
//                event_type: 'Summit',
//                start_date: '2024-03-10',
//                end_date: '2024-03-12',
//                location: 'Nairobi, Kenya',
//                source_website: 'https://ai-summit-africa.example.com',
//                presentation_document: null,
//                images: [
//                    { file: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=900&h=600&fit=crop' }
//                ]
//            },
//            {
//                id: 3,
//                name: 'Django Developer Workshop',
//                title: 'Workshop Leader',
//                description: 'Led a full-day workshop on advanced Django patterns and best practices. Covered topics including REST API design, testing, and deployment strategies.',
//                event_type: 'Workshop',
//                start_date: '2023-11-20',
//                end_date: null,
//                location: 'Yaoundé, Cameroon',
//                source_website: null,
//                presentation_document: 'https://example.com/presentations/django-workshop.pdf',
//                images: [
//                    { file: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=900&h=600&fit=crop' },
//                    { file: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&h=600&fit=crop' }
//                ]
//            },
//            {
//                id: 4,
//                name: 'PyCon Africa',
//                title: 'Talk Presenter',
//                description: 'Delivered a talk on building scalable web applications with Django. Shared insights from real-world projects and best practices.',
//                event_type: 'Conference',
//                start_date: '2023-08-15',
//                end_date: '2023-08-17',
//                location: 'Accra, Ghana',
//                source_website: 'https://africa.pycon.org',
//                presentation_document: null,
//                images: [
//                    { file: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=900&h=600&fit=crop' }
//                ]
//            },
//            {
//                id: 5,
//                name: 'Speech Technology Symposium',
//                title: 'Poster Presenter',
//                description: 'Presented poster on speech processing tools for West African languages. Received valuable feedback from experts in the field.',
//                event_type: 'Symposium',
//                start_date: '2023-05-22',
//                end_date: '2023-05-24',
//                location: 'Dakar, Senegal',
//                source_website: 'https://speech-tech.example.com',
//                presentation_document: 'https://example.com/presentations/speech-tech.pdf',
//                images: [
//                    { file: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=900&h=600&fit=crop' },
//                    { file: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=900&h=600&fit=crop' },
//                    { file: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=900&h=600&fit=crop' }
//                ]
//            },
//            {
//                id: 6,
//                name: 'Web Development Bootcamp',
//                title: 'Instructor',
//                description: 'Taught a 5-day intensive bootcamp covering HTML, CSS, JavaScript, and Django fundamentals. Mentored 30+ students through their first web projects.',
//                event_type: 'Bootcamp',
//                start_date: '2023-02-13',
//                end_date: '2023-02-17',
//                location: 'Douala, Cameroon',
//                source_website: null,
//                presentation_document: null,
//                images: [
//                    { file: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&h=600&fit=crop' }
//                ]
//            }
//        ];

        const container = document.getElementById('events-container');

        if (!container) {
            return;
        }

        if (events.length === 0) {
            container.innerHTML = `
                <div class="col-span-full text-center py-12">
                    <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
                    </svg>
                    <p class="text-gray-600 dark:text-gray-400">No events available</p>
                </div>
            `;
            return;
        }

        container.innerHTML = events.map((event, index) => {
            const mainImage = event.images?.length
                ? event.images[0].file
                : `https://via.placeholder.com/400x300?text=${encodeURIComponent(event.name)}`;

            const dateRange = event.end_date
                ? `${formatDate(event.start_date)} - ${formatDate(event.end_date)}`
                : formatDate(event.start_date);

            const imageCount = event.images?.length || 0;

            return `
                <div class="event-card bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col">
                    <div class="event-image-wrapper bg-gray-100 dark:bg-gray-900">
                        <button type="button"
                                class="event-image-trigger"
                                ${imageCount ? `data-carousel-index="${index}"` : 'disabled'}>
                            <img src="${mainImage}"
                                 alt="${event.name}"
                                 class="event-image w-full h-full object-cover">
                            ${imageCount ? `
                                <span class="image-count-badge">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                              d="M3 5h18v14H3z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                              d="M8 13l2.5-2.5L14 14l3-3 3 3" />
                                    </svg>

                                    ${imageCount}
                                </span>
                            ` : ''}
                        </button>
                    </div>

                    <div class="p-6 flex flex-col flex-1">
                        <div class="flex items-center justify-between mb-3">
                            <span class="py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                                ${event.event_type}
                            </span>
                            <span class="text-sm text-gray-600 dark:text-gray-400">
                                ${event.title}
                            </span>
                        </div>

                        <h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">
                            ${event.name}
                        </h3>

                        <div class="space-y-2 mb-4 text-sm text-gray-600 dark:text-gray-400">
                            <div class="flex items-center gap-2">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                </svg>
                                ${dateRange}
                            </div>
                            ${event.location ? `
                                <div class="flex items-center gap-2">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    </svg>
                                    ${event.location}
                                </div>
                            ` : ''}
                        </div>

                        <p class="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed flex-1">
                            ${event.description}
                        </p>

                        <div class="flex flex-wrap gap-3 mt-auto pt-2">
                            ${event.source_website ? `
                                <a href="${event.source_website}" target="_blank" class="inline-flex items-center gap-2 text-primary hover:text-primary-light transition-colors text-sm font-medium">
                                    Learn more
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                    </svg>
                                </a>
                            ` : ''}
                            ${event.presentation_document ? `
                                <a href="${event.presentation_document}" target="_blank" class="inline-flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition-colors">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v14m0 0l-4-4m4 4l4-4"></path>
                                    </svg>
                                    Download presentation
                                </a>
                            ` : ''}
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        attachImageTriggers(events);
    } catch (error) {
        console.error('Error loading events:', error);
        const container = document.getElementById('events-container');
        if (!container) {
            return;
        }
        container.innerHTML = `
            <div class="col-span-full text-center py-12">
                <svg class="w-16 h-16 mx-auto text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <p class="text-gray-600 dark:text-gray-400">Error loading events</p>
            </div>
        `;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initCarouselModal();
    loadEvents();
});
