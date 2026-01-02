// إنشاء نجوم متحركة
function createStars() {
    const starsContainer = document.querySelector('.stars');
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.width = star.style.height = (Math.random() * 3 + 1) + 'px';
        star.style.animationDelay = Math.random() * 2 + 's';
        starsContainer.appendChild(star);
    }
}

// حركة الزر
document.getElementById('join-btn').addEventListener('click', function() {
    this.textContent = 'جاري الانضمام...';
    setTimeout(() => {
        alert('تم الانضمام! شكراً لك 🎉');
        this.textContent = 'انضم الآن';
    }, 1500);
});

// تشغيل النجوم عند التحميل
window.addEventListener('load', createStars);
