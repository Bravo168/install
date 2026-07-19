(function () {
  const STORAGE_KEY = "promo-banner-dismissed-date";
  const banner = document.getElementById("promo-banner");
  const closeBtn = document.getElementById("promo-close");
  const dismissBtn = document.getElementById("promo-dismiss");
  const downloadBtn = document.getElementById("promo-download");

  function todayKey() {
    return new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  }

  function hideBanner() {
    if (banner) banner.classList.add("promo-banner--hidden");
  }

  if (banner) {
    if (localStorage.getItem(STORAGE_KEY) === todayKey()) {
      hideBanner();
    }

    closeBtn?.addEventListener("click", hideBanner);

    dismissBtn?.addEventListener("click", () => {
      localStorage.setItem(STORAGE_KEY, todayKey());
      hideBanner();
    });
  }

  // ---- install prompt wiring ----
  let deferredPrompt = null;

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredPrompt = event;
    if (downloadBtn) downloadBtn.hidden = false;
  });

  downloadBtn?.addEventListener("click", async () => {
    if (!deferredPrompt) {
      // Browsers without beforeinstallprompt (e.g. iOS Safari) never reach
      // here with a real prompt — swap this for your own instructions,
      // or point it at an APK / store link instead.
      alert('Buka menu browser lalu pilih "Add to Home Screen" untuk install.');
      return;
    }
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    hideBanner();
  });

  window.addEventListener("appinstalled", hideBanner);

  // ---- service worker ----
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./service-worker.js");
    });
  }
})();
