(() => {
    const core = window.SiteCore;
    if (!core) {
        return;
    }

    const { BASE_URL, initMobileMenu, initThemeToggle } = core;
    initThemeToggle();
    initMobileMenu();

    async function loadTechnologies() {
        try {
            const response = await fetch(BASE_URL + '/api/technologies/');
            let technologies = await response.json();
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

    function scheduleTechnologiesLoad() {
        const triggerLoad = () => loadTechnologies();
        if ('requestIdleCallback' in window) {
            window.requestIdleCallback(triggerLoad, { timeout: 2000 });
        } else {
            window.setTimeout(triggerLoad, 300);
        }
    }

    window.addEventListener('load', scheduleTechnologiesLoad);
})();
