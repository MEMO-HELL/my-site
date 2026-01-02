// 1. كود البداية - يضمن تشغيل الموقع على صفحة الباسورد فقط عند الفتح
document.addEventListener('DOMContentLoaded', () => {
    navigateTo('password-page');
    createSnowflakes(); // تشغيل تأثير الثلج
});

// 2. كلمة السر
const CORRECT_PASSWORD = "love"; // يمكنك تغييرها من هنا
const unlockBtn = document.getElementById('unlock-btn');
const passInput = document.getElementById('password-input');

if (unlockBtn) {
    unlockBtn.addEventListener('click', () => {
        if (passInput.value.toLowerCase() === CORRECT_PASSWORD) {
            navigateTo('letter-page');
        } else {
            const errorMsg = document.getElementById('error-msg');
            if (errorMsg) errorMsg.classList.remove('hidden');
        }
    });
}

// 3. وظيفة التنقل بين الصفحات
function navigateTo(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    window.scrollTo(0, 0);
}

// 4. شجرة الكريسماس والرسالة
const tree = document.getElementById('christmas-tree');
if (tree) {
    tree.addEventListener('click', () => {
        document.getElementById('tree-section').classList.add('hidden');
        document.getElementById('letter-section').classList.remove('hidden');
    });
}

// 5. عداد الحب (منذ متى بدأت علاقتكم)
function updateLoveTimer() {
    const startDate = new Date('2023-01-01'); // عدل التاريخ هنا (سنة-شهر-يوم)
    const now = new Date();
    const diff = now - startDate;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const loveTimer = document.getElementById('love-timer');
    if (loveTimer) loveTimer.innerText = `بقالنا سوا ${days} يوم 💜`;
}
setInterval(updateLoveTimer, 1000);

// 6. عداد الكريسماس
function updateChristmasCountdown() {
    const now = new Date();
    const currentYear = now.getFullYear();
    let christmas = new Date(`December 25, ${currentYear} 00:00:00`);
    
    if (now > christmas) {
        christmas = new Date(`December 25, ${currentYear + 1} 00:00:00`);
    }

    const diff = christmas - now;
    if (document.getElementById('days')) {
        document.getElementById('days').innerText = Math.floor(diff / (1000 * 60 * 60 * 24));
        document.getElementById('hours').innerText = Math.floor((diff / (1000 * 60 * 60)) % 24);
        document.getElementById('minutes').innerText = Math.floor((diff / 1000 / 60) % 60);
        document.getElementById('seconds').innerText = Math.floor((diff / 1000) % 60);
    }
}
setInterval(updateChristmasCountdown, 1000);

// 7. عداد القلوب
let count = 0;
const heartBtn = document.getElementById('heart-btn');
if (heartBtn) {
    heartBtn.addEventListener('click', () => {
        count++;
        document.getElementById('heart-count').innerText = count;
        heartBtn.style.transform = "scale(1.3)";
        setTimeout(() => heartBtn.style.transform = "scale(1)", 100);
    });
}

// 8. تأثير تساقط الثلج (Snowfall Effect)
function createSnowflakes() {
    const container = document.getElementById('snowfall');
    if (!container) return;
    
    for (let i = 0; i < 50; i++) {
        const snowflake = document.createElement('div');
        snowflake.style.position = 'fixed';
        snowflake.style.backgroundColor = 'white';
        snowflake.style.borderRadius = '50%';
        snowflake.style.opacity = Math.random();
        snowflake.style.width = snowflake.style.height = Math.random() * 5 + 'px';
        snowflake.style.left = Math.random() * 100 + 'vw';
        snowflake.style.top = '-10px';
        snowflake.style.zIndex = '999';
        snowflake.style.pointerEvents = 'none';
        
        container.appendChild(snowflake);
        
        const duration = Math.random() * 3 + 2;
        snowflake.animate([
            { transform: `translateY(0)` },
            { transform: `translateY(100vh)` }
        ], {
            duration: duration * 1000,
            iterations: Infinity,
            delay: Math.random() * 5000
        });
    }
}
