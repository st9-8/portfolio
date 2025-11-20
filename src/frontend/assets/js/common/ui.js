const html = document.documentElement;

/**
 * Updates the theme toggle icon based on current theme
 * @param {HTMLElement} themeToggleDarkIcon - Moon icon element
 * @param {HTMLElement} themeToggleLightIcon - Sun icon element
 * @param {boolean} isDark - Whether dark mode is active
 */
function showCurrentThemeIcon(themeToggleDarkIcon, themeToggleLightIcon, isDark) {
    if (!themeToggleDarkIcon || !themeToggleLightIcon) {
        return;
    }

    if (isDark) {
        themeToggleDarkIcon.classList.add('hidden');
        themeToggleLightIcon.classList.remove('hidden');
    } else {
        themeToggleLightIcon.classList.add('hidden');
        themeToggleDarkIcon.classList.remove('hidden');
    }
}

/**
 * Gets the initial theme preference
 * Priority: localStorage > system preference > default (light)
 * @returns {string} 'dark' or 'light'
 */
function getInitialTheme() {
    // Check localStorage first
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark' || storedTheme === 'light') {
        return storedTheme;
    }

    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }

    // Default to light
    return 'light';
}

/**
 * Applies the theme to the document
 * @param {string} theme - 'dark' or 'light'
 */
function applyTheme(theme) {
    if (theme === 'dark') {
        html.classList.add('dark');
    } else {
        html.classList.remove('dark');
    }
}

/**
 * Initializes the theme toggle functionality
 */
export function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

    // Apply initial theme immediately to prevent flash
    const initialTheme = getInitialTheme();
    applyTheme(initialTheme);

    if (!themeToggle) {
        // If toggle button doesn't exist, just apply the theme and return
        return;
    }

    // Update icon to match current theme
    const isDark = html.classList.contains('dark');
    showCurrentThemeIcon(themeToggleDarkIcon, themeToggleLightIcon, isDark);

    // Add click event listener
    themeToggle.addEventListener('click', () => {
        html.classList.toggle('dark');
        const isDark = html.classList.contains('dark');
        const newTheme = isDark ? 'dark' : 'light';

        // Save preference
        localStorage.setItem('theme', newTheme);

        // Update icon
        showCurrentThemeIcon(themeToggleDarkIcon, themeToggleLightIcon, isDark);
    });

    // Listen for system theme changes
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            // Only apply system preference if user hasn't set a preference
            if (!localStorage.getItem('theme')) {
                const newTheme = e.matches ? 'dark' : 'light';
                applyTheme(newTheme);
                showCurrentThemeIcon(themeToggleDarkIcon, themeToggleLightIcon, e.matches);
            }
        });
    }
}

/**
 * Initializes the mobile menu toggle functionality
 */
export function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (!mobileMenuBtn || !mobileMenu) {
        return;
    }

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (event) => {
        const isClickInsideMenu = mobileMenu.contains(event.target);
        const isClickOnButton = mobileMenuBtn.contains(event.target);

        if (!isClickInsideMenu && !isClickOnButton && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }
    });

    // Close mobile menu when window is resized to desktop size
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768 && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }
    });
}