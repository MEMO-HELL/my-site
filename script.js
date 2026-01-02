// 1. كلمة السر
const CORRECT_PASSWORD = "love"; // 123
const unlockBtn = document.getElementById('unlock-btn');
const passInput = document.getElementById('password-input');

unlockBtn.addEventListener('click', () => {
    if (passInput.value.toLowerCase() === CORRECT_PASSWORD) {
        navigateTo('letter-page');
    } else {
        document.getElementById('error-msg').classList.remove('hidden');
    }
});

// 2. وظيفة التنقل بين الصفحات
function navigateTo(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    window.scrollTo(0,0);
}

// 3. شجرة الكريسماس والرسالة
const tree = document.getElementById('christmas-tree');
if(tree) {
    tree.addEventListener('click', () => {
        document.getElementById('tree-section').classList.add('hidden');
        document.getElementById('letter-section').classList.remove('hidden');
    });
}

// 4. عداد الحب (منذ متى بدأت علاقتكم)
function updateLoveTimer() {
    const startDate = new Date('2023-01-01'); // ضع هنا تاريخ أول مرة تقابلتوا فيها
    const now = new Date();
    const diff = now - startDate;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const loveTimer = document.getElementById('love-timer');
    if(loveTimer) loveTimer.innerText = `بقالنا سوا ${days} يوم 💜`;
}
setInterval(updateLoveTimer, 1000);

// 5. عداد الكريسماس
function updateChristmasCountdown() {
    const now = new Date();
    const currentYear = now.getFullYear();
    let christmas = new Date(`December 25, ${currentYear} 00:00:00`);
    
    if (now > christmas) {
        christmas = new Date(`December 25, ${currentYear + 1} 00:00:00`);
    }

    const diff = christmas - now;
    document.getElementById('days').innerText = Math.floor(diff / (1000 * 60 * 60 * 24));
    document.getElementById('hours').innerText = Math.floor((diff / (1000 * 60 * 60)) % 24);
    document.getElementById('minutes').innerText = Math.floor((diff / 1000 / 60) % 60);
    document.getElementById('seconds').innerText = Math.floor((diff / 1000) % 60);
}
setInterval(updateChristmasCountdown, 1000);

// 6. عداد القلوب
let count = 0;
const heartBtn = document.getElementById('heart-btn');
if(heartBtn) {
    heartBtn.addEventListener('click', () => {
        count++;
        document.getElementById('heart-count').innerText = count;
        heartBtn.style.transform = "scale(1.3)";
        setTimeout(() => heartBtn.style.transform = "scale(1)", 100);
    });
}
