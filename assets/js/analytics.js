/* Optional analytics. Nothing loads until you select a provider and enter its public site ID.
   Do not put passwords, API secrets, or private tokens in this file. */
(() => {
  const config = {
    provider: 'off', // 'off', 'goatcounter', or 'google'
    goatcounterEndpoint: '', // https://YOURCODE.goatcounter.com/count
    googleMeasurementId: '' // G-XXXXXXXXXX, from your GA4 Web data stream
  };
  const localHosts = ['localhost', '127.0.0.1', '::1', '[::1]'];
  if (config.provider === 'off' || !['http:', 'https:'].includes(location.protocol) || localHosts.includes(location.hostname)) return;
  if (config.provider === 'goatcounter' && /^https:\/\/[a-z0-9-]+\.goatcounter\.com\/count$/.test(config.goatcounterEndpoint)) {
    const script = document.createElement('script');
    script.async = true; script.dataset.goatcounter = config.goatcounterEndpoint;
    script.src = 'https://gc.zgo.at/count.js'; document.head.appendChild(script);
  }
  if (config.provider === 'google' && /^G-[A-Z0-9]+$/.test(config.googleMeasurementId)) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', config.googleMeasurementId);
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(config.googleMeasurementId);
    document.head.appendChild(script);
  }
})();
