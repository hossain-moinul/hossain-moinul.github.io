document.body.classList.add('has-js');
/* Optional enhancements only. The content and links work without JavaScript. */
const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
menu?.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('is-open', open);
});
navigation?.addEventListener('click', event => {
  if (event.target.closest('a')) {
    menu?.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('is-open');
  }
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu?.getAttribute('aria-expanded') === 'true') {
    navigation.classList.remove('is-open'); menu.setAttribute('aria-expanded', 'false'); menu.focus();
  }
});
// Add assets/img/moinul.jpg. This detects it without showing a broken-image icon.
const portrait = document.querySelector('#portrait-image');
if (portrait) {
  const revealPortrait = () => {
    if (portrait.naturalWidth > 0) {
      portrait.hidden = false;
      document.querySelector('#portrait-fallback').hidden = true;
    }
  };
  portrait.addEventListener('load', revealPortrait);
  if (portrait.complete) revealPortrait();
}

const themeButtons = [...document.querySelectorAll('[data-theme-choice]')];
const reflectTheme = () => themeButtons.forEach(button => {
  button.setAttribute('aria-pressed', String(button.dataset.themeChoice === window.mhTheme?.get()));
});
if (window.mhTheme) {
  reflectTheme();
  themeButtons.forEach(button => button.addEventListener('click', () => {
    window.mhTheme.set(button.dataset.themeChoice); reflectTheme();
  }));
}

// Only expose the CV when the actual PDF is available. Do not cache missing-file responses.
(async () => {
  const status = document.querySelector('[data-cv-status]');
  try {
    const response = await fetch('assets/docs/Moinul_Hossain_CV.pdf', {cache: 'no-store'});
    if (!response.ok) throw new Error('CV unavailable');
    const reader = response.body?.getReader();
    let signature = '';
    if (reader) {
      while (signature.length < 5) {
        const {value, done} = await reader.read();
        if (done) break;
        signature += new TextDecoder().decode(value);
      }
      await reader.cancel();
    } else {
      signature = await response.text();
    }
    if (!signature.startsWith('%PDF-')) throw new Error('Not a PDF');
    document.querySelectorAll('[data-cv-nav], [data-cv-content]').forEach(el => {el.hidden = false;});
    document.querySelectorAll('[data-cv-src]').forEach(el => {el.data = el.dataset.cvSrc;});
    if (status) status.hidden = true;
  } catch (_) {
    if (status) status.textContent = 'The CV is not currently available.';
  }
})();
// Closing the project media also stops its video.
document.querySelectorAll('.rc-expand').forEach(details => {
  details.addEventListener('toggle', () => {
    if (!details.open) details.querySelectorAll('video').forEach(video => video.pause());
  });
});
