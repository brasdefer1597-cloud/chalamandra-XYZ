import { StorageService } from './storage/StorageService.js';

document.getElementById('save-btn').addEventListener('click', async () => {
    const keyInput = document.getElementById('api-key');
    const status = document.getElementById('save-status');
    const key = keyInput.value.trim();

    if (key && key.length > 5) { // Simple validation
        await StorageService.set('GEMINI_API_KEY', key);
        status.textContent = '¡Llave guardada de forma segura!';
        status.className = 'status-message success';
        status.style.display = 'block';
        keyInput.value = '****************';
    } else {
        status.textContent = 'Por favor, introduce una clave válida.';
        status.className = 'status-message error';
        status.style.display = 'block';
    }
});

// Cargar y mostrar si ya existe una llave (de forma ofuscada)
document.addEventListener('DOMContentLoaded', async () => {
    const currentKey = await StorageService.get('GEMINI_API_KEY', '');
    if (currentKey) {
        document.getElementById('api-key').value = '****************';
    }
});