(function () {
  const cta = document.getElementById("install-cta");
  let deferredPrompt = null;

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
    await deferredPrompt.userChoice;
    deferredPrompt = null;
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
