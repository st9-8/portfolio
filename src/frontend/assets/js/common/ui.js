const html = document.documentElement;

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

export function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

    if (!themeToggle) {
        return;
    }

    const currentTheme = localStorage.getItem('theme') || 'light';

    if (currentTheme === 'dark') {
        html.classList.add('dark');
        showCurrentThemeIcon(themeToggleDarkIcon, themeToggleLightIcon, true);
    } else {
        showCurrentThemeIcon(themeToggleDarkIcon, themeToggleLightIcon, false);
    }

    themeToggle.addEventListener('click', () => {
        html.classList.toggle('dark');
        const isDark = html.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        showCurrentThemeIcon(themeToggleDarkIcon, themeToggleLightIcon, isDark);
    });
}

export function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (!mobileMenuBtn || !mobileMenu) {
        return;
    }

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}
