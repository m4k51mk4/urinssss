$(document).ready(() => {
    const startDate = new Date("2023-06-01");
    const currentDate = new Date();

    function getCurrentSeason(date) {
        const month = date.getMonth() + 1;

        if (month === 12 || month === 1 || month === 2) {
            return 'winter';
        } else if (month >= 3 && month <= 5) {
            return 'spring';
        } else if (month >= 6 && month <= 8) {
            return 'summer';
        } else {
            return 'autumn';
        }
    }

    function applySeasonalTheme() {
        const season = getCurrentSeason(currentDate);
        const body = document.body;

        body.classList.remove('winter', 'spring', 'summer', 'autumn');

        if (season !== 'winter') {
            body.classList.add(season);
        }
    }

    applySeasonalTheme();

    function getDevicePerformance() {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const isLowEndDevice = window.innerWidth <= 480 || (isMobile && window.devicePixelRatio < 2);
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
            return 0;
        } else if (isLowEndDevice) {
            return 6;
        } else if (isMobile) {
            return 8;
        } else {
            return 12;
        }
    }

    function getParticlesContainer() {
        let container = document.querySelector('.particles');
        if (!container) {
            container = document.createElement('div');
            container.className = 'particles';
            container.setAttribute('aria-hidden', 'true');
            document.body.appendChild(container);
        }
        return container;
    }

    const SEASON_PARTICLES = {
        winter: {
            className: 'snowflake',
            chars: ['❄', '❅', '❆'],
            durationBase: 12,
            durationRange: 10,
            fontSizeBase: 0.6,
            fontSizeRange: 0.8,
            delayRange: 20
        },
        spring: {
            className: 'petal',
            chars: ['🌸'],
            durationBase: 11,
            durationRange: 9,
            fontSizeBase: 0.8,
            fontSizeRange: 0.9,
            delayRange: 17
        },
        summer: {
            className: 'leaf-green',
            chars: ['🍃'],
            durationBase: 10,
            durationRange: 8,
            fontSizeBase: 0.8,
            fontSizeRange: 1,
            delayRange: 15
        },
        autumn: {
            className: 'leaf',
            chars: ['🍂'],
            durationBase: 10,
            durationRange: 8,
            fontSizeBase: 0.8,
            fontSizeRange: 1,
            delayRange: 15
        }
    };

    function createParticles(config) {
        const elementCount = getDevicePerformance();

        if (elementCount === 0) {
            return;
        }

        const fragment = document.createDocumentFragment();
        const screenWidth = window.innerWidth;

        for (let i = 0; i < elementCount; i++) {
            const particle = document.createElement('div');
            particle.className = config.className;
            particle.textContent = config.chars[i % config.chars.length];
            particle.setAttribute('aria-hidden', 'true');

            const startPositionX = (screenWidth / elementCount) * i + Math.random() * (screenWidth / elementCount);
            const animationDuration = config.durationBase + Math.random() * config.durationRange;
            const fontSize = config.fontSizeBase + Math.random() * config.fontSizeRange;
            const animationDelay = -(Math.random() * config.delayRange);

            particle.style.left = `${startPositionX}px`;
            particle.style.fontSize = `${fontSize}em`;
            particle.style.animationDuration = `${animationDuration}s`;
            particle.style.animationDelay = `${animationDelay}s`;

            fragment.appendChild(particle);
        }

        getParticlesContainer().appendChild(fragment);
    }

    function createSeasonalElements() {
        const season = getCurrentSeason(currentDate);
        const config = SEASON_PARTICLES[season];
        if (config) {
            createParticles(config);
        }
    }

    createSeasonalElements();

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const container = document.querySelector('.particles');
            if (container) {
                container.innerHTML = '';
            }
            createSeasonalElements();
        }, 250);
    });

    function calculateTimeDifference(start, end) {
        let years = end.getFullYear() - start.getFullYear();
        let months = end.getMonth() - start.getMonth();
        let days = end.getDate() - start.getDate();

        if (days < 0) {
            months--;
            const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
            days += prevMonth.getDate();
        }

        if (months < 0) {
            years--;
            months += 12;
        }

        if (days < 0 || months < 0 || years < 0) {
            years = Math.max(0, years);
            months = Math.max(0, months);
            days = Math.max(0, days);
        }

        return { years, months, days };
    }

    function pluralize(number, one, few, many) {
        const mod10 = number % 10;
        const mod100 = number % 100;

        if (mod10 === 1 && mod100 !== 11) {
            return `${number} ${one}`;
        }
        if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) {
            return `${number} ${few}`;
        }
        return `${number} ${many}`;
    }

    const { years, months, days } = calculateTimeDifference(startDate, currentDate);

    const timeParts = [];

    if (years > 0) {
        timeParts.push(pluralize(years, 'год', 'года', 'лет'));
    }
    if (months > 0) {
        timeParts.push(pluralize(months, 'месяц', 'месяца', 'месяцев'));
    }
    if (days > 0) {
        timeParts.push(pluralize(days, 'день', 'дня', 'дней'));
    }

    const timeText = timeParts.length > 0
        ? timeParts.join(' ')
        : 'меньше дня';

    $(".data").text(timeText);

    const midnight = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + 1,
        0, 0, 0
    );

    const timeUntilMidnight = midnight.getTime() - currentDate.getTime();
    setTimeout(() => {
        location.reload();
    }, timeUntilMidnight);

    new Typed('.type', {
        strings: [
            'Настюша, ^1000 спасибо тебе за каждую минуту,^1000 проведенную вместе',
            'Продолжай как можно чаще радовать всех своей прекрасной улыбкой!',
            'Ты просто замечательная!',
            'Я тебя очень сильно люблю',
            '❤️ ^2000'
        ],
        typeSpeed: 50,
        fadeOut: true,
        fadeOutDelay: 500,
        loop: true,
        loopCount: Infinity,
        showCursor: false
    });
});
