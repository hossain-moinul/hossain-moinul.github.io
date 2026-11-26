/* Apply the chosen appearance before the first page paint. */
(() => {
  let preference = 'system';
  try { preference = localStorage.getItem('mh-appearance') || 'system'; } catch (_) {}
  if (!['light', 'dark', 'system'].includes(preference)) preference = 'system';
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  const apply = () => {
    document.documentElement.dataset.theme = preference === 'system' ? (media.matches ? 'dark' : 'light') : preference;
  };
  apply();
  window.mhTheme = {
    get: () => preference,
    set: value => {
      if (!['light', 'dark', 'system'].includes(value)) return;
      preference = value;
      try { localStorage.setItem('mh-appearance', value); } catch (_) {}
      apply();
    }
  };
  media.addEventListener('change', () => { if (preference === 'system') apply(); });
})();
