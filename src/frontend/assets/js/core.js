(function (window) {
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

    function getInitialTheme() {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme === 'dark' || storedTheme === 'light') {
            return storedTheme;
        }

        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }

        return 'light';
    }

    function applyTheme(theme) {
        if (theme === 'dark') {
            html.classList.add('dark');
        } else {
            html.classList.remove('dark');
        }
    }

    function initThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
        const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

        const initialTheme = getInitialTheme();
        applyTheme(initialTheme);

        if (!themeToggle) {
            return;
        }

        const isDark = html.classList.contains('dark');
        showCurrentThemeIcon(themeToggleDarkIcon, themeToggleLightIcon, isDark);

        themeToggle.addEventListener('click', () => {
            html.classList.toggle('dark');
            const nextIsDark = html.classList.contains('dark');
            const newTheme = nextIsDark ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme);
            showCurrentThemeIcon(themeToggleDarkIcon, themeToggleLightIcon, nextIsDark);
        });

        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
                if (!localStorage.getItem('theme')) {
                    const nextTheme = event.matches ? 'dark' : 'light';
                    applyTheme(nextTheme);
                    showCurrentThemeIcon(themeToggleDarkIcon, themeToggleLightIcon, event.matches);
                }
            });
        }
    }

    function initMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');

        if (!mobileMenuBtn || !mobileMenu) {
            return;
        }

        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        document.addEventListener('click', (event) => {
            const isClickInsideMenu = mobileMenu.contains(event.target);
            const isClickOnButton = mobileMenuBtn.contains(event.target);

            if (!isClickInsideMenu && !isClickOnButton && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768 && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        });
    }

    window.SiteCore = {
        BASE_URL: 'https://api.stephanefedim.com',
        initThemeToggle,
        initMobileMenu,
    };
})(window);
