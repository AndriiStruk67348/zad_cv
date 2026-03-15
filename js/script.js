document.addEventListener("DOMContentLoaded", function () {
  // Get wrapper first
  const wrapper = document.querySelector('.selectWrapper');
  const select = wrapper.querySelector('.custom-select');
  const selected = wrapper.querySelector('.selected');
  const options = select.querySelectorAll('.options li');

  // Show dropdown on hover
  select.addEventListener('mouseenter', () => {
    select.classList.add('open');
  });

  select.addEventListener('mouseleave', () => {
    select.classList.remove('open');
  });

  // Handle option clicks
  options.forEach(opt => {
    opt.addEventListener('click', () => {
      const lang = opt.getAttribute('data-value') || opt.innerText.toLowerCase(); // fallback
      selected.innerText = opt.innerText; // Update displayed selected value
      select.classList.remove('open');
      loadLanguage(lang);
    });
  });

  // Load language translations
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

  // Initial language load
  loadLanguage('pl');
});