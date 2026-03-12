// i18n.js - 處理語言切換邏輯

function setLanguage(lang) {
    localStorage.setItem('fnet_lock_lang', lang);
    updateContent(lang);

    // 切換語言後，如果是手機版則關閉選單
    const headerNav = document.querySelector('.HeaderNav');
    const menuToggle = document.querySelector('.MenuToggle');
    if (headerNav && headerNav.classList.contains('active')) {
        headerNav.classList.remove('active');
        if (menuToggle) menuToggle.classList.remove('active');
    }
}

function getLanguage() {
    return localStorage.getItem('fnet_lock_lang') || 'zh';
}

function updateContent(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            // 如果包含 HTML 標籤（如 <br>），使用 innerHTML
            if (translations[lang][key].includes('<')) {
                el.innerHTML = translations[lang][key];
            } else {
                el.textContent = translations[lang][key];
            }
        }
    });

    // 更新頁面 Lang 屬性
    let htmlLang = 'zh-TW';
    if (lang === 'en') htmlLang = 'en';
    if (lang === 'cn') htmlLang = 'zh-CN';
    document.documentElement.lang = htmlLang;
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    const lang = getLanguage();
    updateContent(lang);
});

