// background.js
// BRAIN: Neural Orchestrator (Service Worker V3)

const EXTENSION_VERSION = '1.0.0';

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log(`[Chalamandra Core] Instalación exitosa. Versión ${EXTENSION_VERSION}.`);
  } else if (details.reason === 'update') {
    console.log(`[Chalamandra Core] Actualizado a la versión ${EXTENSION_VERSION}.`);
  }
});

self.addEventListener('error', (e) => {
  console.error('[Chalamandra Core Error]:', e.message);
});

const keepAlive = () => setInterval(chrome.runtime.getPlatformInfo, 20000);
chrome.runtime.onStartup.addListener(keepAlive);
keepAlive();

console.log("[Chalamandra Core] Sistema Neural Online y a la espera.");
