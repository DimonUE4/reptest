let coins = 0;
let coinPerClick = 1;
let coinPerSecond = 0;

// ��������� �� ���������
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
    updateProfile(); // ��������� ������� ��� ��������
});

airdropPage.addEventListener('click', () => {
    showPage(airdropSection, airdropPage);
});

// ������� ��� ����������� ������ ��������
function showPage(section, link) {
    document.querySelectorAll('.page').forEach(page => page.classList.add('hidden'));
    section.classList.remove('hidden');

    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    link.classList.add('active');
}

// ������� ��� ���������� �������
function updateProfile() {
    document.getElementById('user-balance').textContent = coins;
}

// ������ ��� �������
const coinElem = document.getElementById('coin');
const coinCountElem = document.getElementById('coin-count');

coinElem.addEventListener('click', () => {
    coins += coinPerClick;
    coinCountElem.textContent = coins;
    updateProfile();
    updateUpgradeButtons();  // ��������� ��������� ������ ����� �����
});

// ��������� ���������
const upgradeCategories = {
    crypto: {
        upgrades: [
            { name: '�������', value: 2, price: 10 },
            { name: '�������', value: 4, price: 20 },
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
            { name: '��������', value: 5, price: 50 },
            { name: '���', value: 10, price: 100 },
            { name: '�����', value: 20, price: 200 },
            { name: '������� ������', value: 40, price: 400 },
            { name: '�����', value: 80, price: 800 },
            { name: '�������� �����', value: 160, price: 1600 },
            { name: '�������', value: 320, price: 3200 },
            { name: '�����', value: 640, price: 6400 },
            { name: '������������ ��������', value: 1280, price: 12800 },
            { name: '�����', value: 2560, price: 25600 },
        ]
    },
    startup: {
        upgrades: [
            { name: '��������������� �������', value: 3, price: 15 },
            { name: '����������� �������', value: 6, price: 30 },
            { name: '���������� �������', value: 9, price: 45 },
            { name: '��������������� �������', value: 12, price: 60 },
            { name: '������������������� �������', value: 15, price: 75 },
            { name: '������� �������������� ����������', value: 18, price: 90 },
            { name: '����������������� �������', value: 21, price: 105 },
            { name: '������������������ �������', value: 24, price: 120 },
            { name: '����������� �������', value: 27, price: 135 },
            { name: '�������������� �������', value: 30, price: 150 },
        ]
    }
};

// ����������� ���������
function renderUpgrades() {
    Object.keys(upgradeCategories).forEach(categoryKey => {
        const category = upgradeCategories[categoryKey];
        const container = document.getElementById(`${categoryKey}-upgrades`);

        category.upgrades.forEach((upgrade, index) => {
            const button = document.createElement('button');
            button.classList.add('upgrade-button');
            button.textContent = `${upgrade.name} - +${upgrade.value} �� ���� (${upgrade.price} �����)`;
            button.disabled = coins < upgrade.price;

            button.addEventListener('click', () => {
                if (coins >= upgrade.price) {
                    coins -= upgrade.price;
                    coinPerClick += upgrade.value;
                    upgrade.price *= 2; // ��������� ����
                    button.textContent = `${upgrade.name} - +${upgrade.value} �� ���� (${upgrade.price} �����)`;
                    updateProfile();
                    updateUpgradeButtons();  // ��������� ��������� ������ ����� �������
                }
            });

            button.dataset.price = upgrade.price;  // ��������� ���� � dataset ��� ��������
            container.appendChild(button);
        });
    });
}

// ������� ��� ���������� ����������� ������ ���������
function updateUpgradeButtons() {
    document.querySelectorAll('.upgrade-button').forEach(button => {
        const price = parseInt(button.dataset.price);
        button.disabled = coins < price;
    });
}

renderUpgrades();

// ������ ��������
let lastAirdropTime = Date.now();

document.getElementById('airdrop-button').addEventListener('click', () => {
    const now = Date.now();
    if (now - lastAirdropTime >= 600000) { // 10 �����
        coins += 50;
        lastAirdropTime = now;
        alert('�� �������� 50 �����!');
        updateProfile();
        updateUpgradeButtons();  // ��������� ��������� ������ ����� ��������� �����
    } else {
        alert('������� ��� �� ��������. ���������.');
    }
});
