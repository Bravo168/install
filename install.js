(function () {
  const cta = document.getElementById("install-cta");
  const REDIRECT_URL = "https://calculator.com/";
  let deferredPrompt = null;

  function isStandalone() {
    return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
  }

  // If this page is opened from the installed home-screen app, redirect immediately.
  if (isStandalone()) {
    window.location.href = REDIRECT_URL;
  }

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredPrompt = event;
  });

  cta?.addEventListener("click", async () => {
    if (!deferredPrompt) {
      // Browsers without beforeinstallprompt (e.g. iOS Safari) never reach
      // here with a real prompt — swap this for your own instructions,
      // or point it at an APK / store link instead.
      alert('Buka menu browser lalu pilih "Add to Home Screen" untuk install.');
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    deferredPrompt = null;
    if (outcome === "accepted") {
      window.location.href = REDIRECT_URL;
    }
  });

  window.addEventListener("appinstalled", () => {
    if (cta) cta.textContent = "Terinstall";
  });

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./service-worker.js");
    });
  }
})();
