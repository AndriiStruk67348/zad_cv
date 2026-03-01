
document.addEventListener("DOMContentLoaded", function () {
  const select = document.querySelector('.custom-select');
  const selected = select.querySelector('.selected');
  const options = select.querySelectorAll('.options li');

  select.addEventListener('mouseenter', () => {
    select.classList.add('open');
  });

  select.addEventListener('mouseleave', () => {
    select.classList.remove('open');
  });

  options.forEach(opt => {
    opt.addEventListener('click', () => {
      const lang = opt.getAttribute('data-value');
      selected.innerText = opt.innerText;
      select.classList.remove('open');
      loadLanguage(lang); 
    });
  });

  function loadLanguage(lang) {
    fetch(`./locales/${lang}.json`)
      .then(res => res.json())
      .then(translations => {
        document.querySelectorAll("[data-i18n]").forEach(el => {
          const key = el.getAttribute("data-i18n");
          el.innerHTML = translations[key] || key; 
        });
      });
  }

  loadLanguage('pl');

});
