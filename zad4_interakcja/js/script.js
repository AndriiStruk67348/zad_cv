document.addEventListener("DOMContentLoaded", function () {
  const wrapper = document.querySelector('.selectWrapper');
  const customSelect = document.querySelector('.custom-select');
  const selected = wrapper.querySelector('.selected');
  const options = wrapper.querySelectorAll('.options li');

  customSelect.addEventListener('click', (e) => {
    customSelect.classList.toggle('active');
  });

  options.forEach(opt => {
    opt.addEventListener('click', (e) => {
      e.stopPropagation();
      const lang = opt.getAttribute('data-value') || opt.innerText.toLowerCase();
      selected.innerText = opt.innerText;
      loadLanguage(lang);
      customSelect.classList.remove('active');
    });
  });

  document.addEventListener('click', (e) => {
    if (!customSelect.contains(e.target)) {
      customSelect.classList.remove('active');
    }
  });

  function loadLanguage(lang) {
    fetch(`./locales/${lang}.json`)
      .then(res => res.json())
      .then(translations => {
        document.querySelectorAll("[data-i18n]").forEach(el => {
          const key = el.getAttribute("data-i18n");
          el.innerHTML = translations[key] || key;
        });
      })
      .catch(err => console.error("Error loading language file:", err));
  }

  loadLanguage('pl');
});

const checkbox = document.querySelector('.switch input');
const theme = document.getElementById('theme-style');
const metaTheme = document.getElementById('meta-theme');
const favicon = document.getElementById('favicon');

checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
        theme.href = 'css/green.css';
        metaTheme.setAttribute('content', '#242107');
        favicon.href = 'img/Green_favicon.ico';
    } else {
        theme.href = 'css/red.css';
        metaTheme.setAttribute('content', '#18161C');
        favicon.href = 'img/Red_favicon.ico';
    }
});

const projectSection = document.querySelector('.projects');
const toggleBtn = document.getElementById('toggle-projects');

if (toggleBtn && projectSection) {
    toggleBtn.addEventListener('click', () => {
        projectSection.classList.toggle('collapsed');
    });
}