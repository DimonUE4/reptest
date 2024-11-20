let coins = 0;
let coinPerClick = 1;
let coinPerSecond = 0;

// Навигация по страницам
const clickerPage = document.getElementById('clicker-page');
const profilePage = document.getElementById('profile-page');
const airdropPage = document.getElementById('airdrop-page');

const clickerSection = document.getElementById('clicker-section');
const profileSection = document.getElementById('profile-section');
const airdropSection = document.getElementById('airdrop-section');

clickerPage.addEventListener('click', () => {
    showPage(clickerSection, clickerPage);
});

profilePage.addEventListener('click', () => {
    showPage(profileSection, profilePage);
    updateProfile(); // Обновляем профиль при переходе
});

airdropPage.addEventListener('click', () => {
    showPage(airdropSection, airdropPage);
});

// Функция для отображения нужной страницы
function showPage(section, link) {
    document.querySelectorAll('.page').forEach(page => page.classList.add('hidden'));
    section.classList.remove('hidden');

    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    link.classList.add('active');
}

// Функция для обновления профиля
function updateProfile() {
    document.getElementById('user-balance').textContent = coins;
}

// Логика для кликера
const coinElem = document.getElementById('coin');
const coinCountElem = document.getElementById('coin-count');

coinElem.addEventListener('click', () => {
    coins += coinPerClick;
    coinCountElem.textContent = coins;
    updateProfile();
    updateUpgradeButtons();  // Обновляем состояние кнопок после клика
});

// Категории улучшений
const upgradeCategories = {
    crypto: {
        upgrades: [
            { name: 'Биткойн', value: 2, price: 10 },
            { name: 'Эфириум', value: 4, price: 20 },
            { name: 'Ripple', value: 6, price: 30 },
            { name: 'Litecoin', value: 8, price: 40 },
            { name: 'Chainlink', value: 10, price: 50 },
            { name: 'Polkadot', value: 12, price: 60 },
            { name: 'Cardano', value: 14, price: 70 },
            { name: 'Stellar', value: 16, price: 80 },
            { name: 'VeChain', value: 18, price: 90 },
            { name: 'Dogecoin', value: 20, price: 100 },
        ]
    },
    realestate: {
        upgrades: [
            { name: 'Квартира', value: 5, price: 50 },
            { name: 'Дом', value: 10, price: 100 },
            { name: 'Отель', value: 20, price: 200 },
            { name: 'Офисное здание', value: 40, price: 400 },
            { name: 'Склад', value: 80, price: 800 },
            { name: 'Торговый центр', value: 160, price: 1600 },
            { name: 'Фабрика', value: 320, price: 3200 },
            { name: 'Завод', value: 640, price: 6400 },
            { name: 'Промышленный комплекс', value: 1280, price: 12800 },
            { name: 'Город', value: 2560, price: 25600 },
        ]
    },
    startup: {
        upgrades: [
            { name: 'Технологический стартап', value: 3, price: 15 },
            { name: 'Медицинский стартап', value: 6, price: 30 },
            { name: 'Финансовый стартап', value: 9, price: 45 },
            { name: 'Образовательный стартап', value: 12, price: 60 },
            { name: 'Агротехнологический стартап', value: 15, price: 75 },
            { name: 'Стартап искусственного интеллекта', value: 18, price: 90 },
            { name: 'Робототехнический стартап', value: 21, price: 105 },
            { name: 'Биотехнологический стартап', value: 24, price: 120 },
            { name: 'Космический стартап', value: 27, price: 135 },
            { name: 'Энергетический стартап', value: 30, price: 150 },
        ]
    }
};

// Отображение улучшений
function renderUpgrades() {
    Object.keys(upgradeCategories).forEach(categoryKey => {
        const category = upgradeCategories[categoryKey];
        const container = document.getElementById(`${categoryKey}-upgrades`);

        category.upgrades.forEach((upgrade, index) => {
            const button = document.createElement('button');
            button.classList.add('upgrade-button');
            button.textContent = `${upgrade.name} - +${upgrade.value} за клик (${upgrade.price} монет)`;
            button.disabled = coins < upgrade.price;

            button.addEventListener('click', () => {
                if (coins >= upgrade.price) {
                    coins -= upgrade.price;
                    coinPerClick += upgrade.value;
                    upgrade.price *= 2; // Удваиваем цену
                    button.textContent = `${upgrade.name} - +${upgrade.value} за клик (${upgrade.price} монет)`;
                    updateProfile();
                    updateUpgradeButtons();  // Обновляем состояние кнопок после покупки
                }
            });

            button.dataset.price = upgrade.price;  // Сохраняем цену в dataset для удобства
            container.appendChild(button);
        });
    });
}

// Функция для обновления доступности кнопок улучшений
function updateUpgradeButtons() {
    document.querySelectorAll('.upgrade-button').forEach(button => {
        const price = parseInt(button.dataset.price);
        button.disabled = coins < price;
    });
}

renderUpgrades();

// Логика аирдропа
let lastAirdropTime = Date.now();

document.getElementById('airdrop-button').addEventListener('click', () => {
    const now = Date.now();
    if (now - lastAirdropTime >= 600000) { // 10 минут
        coins += 50;
        lastAirdropTime = now;
        alert('Вы получили 50 монет!');
        updateProfile();
        updateUpgradeButtons();  // Обновляем состояние кнопок после получения монет
    } else {
        alert('Аирдроп еще не доступен. Подождите.');
    }
});
