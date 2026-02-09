// 1. عند التحميل - تهيئة الموقع
document.addEventListener('DOMContentLoaded', () => {
    navigateTo('password-page');
    createSnowflakes();
    
    // استعادة عدد القلوب من ذاكرة المتصفح
    const savedHearts = localStorage.getItem('heartCount') || 0;
    count = parseInt(savedHearts);
    if(document.getElementById('heart-count')) {
        document.getElementById('heart-count').innerText = count;
    }
});

// 2. كلمة السر مع تأثير الاهتزاز (Shake)
const CORRECT_PASSWORD = "love"; 
const unlockBtn = document.getElementById('unlock-btn');
const passInput = document.getElementById('password-input');

if (unlockBtn) {
    unlockBtn.addEventListener('click', () => {
        const card = passInput.closest('.card');
        if (passInput.value.toLowerCase() === CORRECT_PASSWORD) {
            // تأثير خروج لطيف قبل النقل
            card.style.opacity = '0';
            card.style.transform = 'scale(0.9)';
            setTimeout(() => navigateTo('letter-page'), 300);
        } else {
            // إضافة تأثير الاهتزاز عند الخطأ
            card.animate([
                { transform: 'translateX(0)' },
                { transform: 'translateX(-10px)' },
                { transform: 'translateX(10px)' },
                { transform: 'translateX(0)' }
            ], { duration: 300 });
            
            const errorMsg = document.getElementById('error-msg');
            if (errorMsg) {
                errorMsg.classList.remove('hidden');
                errorMsg.style.animation = 'fadeIn 0.5s';
            }
        }
    });
}

// 3. التنقل الانسيابي بين الصفحات
function navigateTo(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
        page.style.display = 'none'; // لضمان عدم التداخل
    });
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.style.display = 'flex';
        setTimeout(() => targetPage.classList.add('active'), 10);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 4. شجرة الكريسماس (تأثير الاختفاء التدريجي)
const tree = document.getElementById('christmas-tree');
if (tree) {
    tree.addEventListener('click', () => {
        const treeSection = document.getElementById('tree-section');
        treeSection.style.opacity = '0';
        setTimeout(() => {
            treeSection.classList.add('hidden');
            const letterSection = document.getElementById('letter-section');
            letterSection.classList.remove('hidden');
            letterSection.style.animation = 'fadeIn 1s forwards';
        }, 500);
    });
}

// 5. عداد الحب
function updateLoveTimer() {
    const startDate = new Date('2023-01-01'); // التاريخ الخاص بك
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
    const christmas = new Date(`December 25, ${now.getFullYear()} 00:00:00`);
    let diff = christmas - now;
    if (diff < 0) {
        diff = new Date(`December 25, ${now.getFullYear() + 1} 00:00:00`) - now;
    }

    const elements = {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60)
    };

    for (const key in elements) {
        const el = document.getElementById(key);
        if (el) el.innerText = elements[key].toString().padStart(2, '0');
    }
}
setInterval(updateChristmasCountdown, 1000);

// 7. عداد القلوب مع الحفظ (Local Storage)
let count = 0;
const heartBtn = document.getElementById('heart-btn');
if (heartBtn) {
    heartBtn.addEventListener('click', () => {
        count++;
        localStorage.setItem('heartCount', count); // حفظ الرقم
        const display = document.getElementById('heart-count');
        if (display) display.innerText = count;
        
        // تأثير نبض القلب
        heartBtn.animate([
            { transform: 'scale(1)' },
            { transform: 'scale(1.4)' },
            { transform: 'scale(1)' }
        ], { duration: 200 });
    });
}

// 8. تأثير الثلج المحسن (أداء أفضل)
function createSnowflakes() {
    const container = document.getElementById('snowfall');
    if (!container) return;
    
    const count = 40; // عدد مناسب للأداء
    for (let i = 0; i < count; i++) {
        const flake = document.createElement('div');
        flake.className = 'snowflake';
        flake.style.cssText = `
            position: fixed;
            top: -10px;
            left: ${Math.random() * 100}vw;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: white;
            border-radius: 50%;
            opacity: ${Math.random() * 0.7 + 0.3};
            pointer-events: none;
            z-index: 1000;
        `;
        container.appendChild(flake);
        
        animateFlake(flake);
    }
}

function animateFlake(flake) {
    const duration = Math.random() * 5000 + 5000;
    const keyframes = [
        { transform: `translateY(0) translateX(0)` },
        { transform: `translateY(105vh) translateX(${Math.random() * 50 - 25}px)` }
    ];
    
    flake.animate(keyframes, {
        duration: duration,
        delay: Math.random() * 5000
    }).onfinish = () => {
        flake.style.left = Math.random() * 100 + 'vw';
        animateFlake(flake);
    };
}

// 9. وظيفة الإعادة
function replay() {
    localStorage.removeItem('heartCount');
    location.reload();
}
