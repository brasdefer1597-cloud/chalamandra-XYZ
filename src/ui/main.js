// popup.js (Lógica de Interacción del Quantum Portal)

// Elementos del DOM
const ideaInput = document.getElementById('idea-input');
const analyzeButton = document.getElementById('analyze-btn');
const statusDisplay = document.getElementById('status-display');
const systemReadyIndicator = document.getElementById('system-ready-indicator');
const resultArea = document.getElementById('result-area');
const cholaInsight = document.getElementById('chola-insight')?.querySelector('.insight-text'); // Usar optional chaining
const malandraInsight = document.getElementById('malandra-insight')?.querySelector('.insight-text');
const fresaSynthesis = document.getElementById('fresa-synthesis')?.querySelector('.synthesis-text');
const acceptButton = document.getElementById('accept-btn');
const rejectButton = document.getElementById('reject-btn');
const uploadMultimodalBtn = document.getElementById('upload-multimodal-btn');

// CONSTANTES
const USER_LEVEL_STORAGE_KEY = 'user_evolution_level';
const DEFAULT_USER_LEVEL = 3; 

// --- Inicialización del Sistema ---
document.addEventListener('DOMContentLoaded', async () => {
    updateStatus('Iniciando el Quantum Portal...', 'info');
    analyzeButton.disabled = true;

    try {
        const response = await chrome.runtime.sendMessage({ cmd: 'CMD_GET_STATE' });
        if (response && response.state === 'READY') {
            updateStatus('Chalamandra listo para la Síntesis Cuántica.', 'success');
            systemReadyIndicator.textContent = '🟢 Online';
            systemReadyIndicator.classList.add('online');
            analyzeButton.disabled = false;
        } else {
            updateStatus('Error al iniciar el núcleo. Puede que la función offline esté limitada.', 'error');
            systemReadyIndicator.textContent = '🔴 Offline / Error';
            systemReadyIndicator.classList.add('offline');
        }
    } catch (error) {
        ErrorHandler.handleError(error, 'popup.js - DOMContentLoaded', true);
        updateStatus('Error de comunicación crítica con el Service Worker.', 'critical-error');
        systemReadyIndicator.textContent = '🔴 Fallo de Comunicación';
        systemReadyIndicator.classList.add('offline');
    }

    // PING de prueba para verificar comunicación
    try {
        const pingResponse = await chrome.runtime.sendMessage({ cmd: 'PING_TEST' });
        if (pingResponse && pingResponse.status === 'PONG_TEST') {
            console.log('Comunicación con Service Worker confirmada: PONG_TEST');
        }
    } catch (pingError) {
        console.warn('Fallo el PING de prueba al Service Worker:', pingError);
    }
});

// --- Manejo de Eventos (simplificado para prueba) ---
analyzeButton.addEventListener('click', async () => {
    const inputText = ideaInput.value.trim();
    if (!inputText) {
        updateStatus('Por favor, ingresa tu dilema creativo.', 'info');
        return;
    }

    updateStatus('Analizando en superposición cuántica...', 'loading');
    analyzeButton.disabled = true;
    resultArea.classList.add('hidden'); 

    try {
        const userLevel = await StorageService.get(USER_LEVEL_STORAGE_KEY, DEFAULT_USER_LEVEL);
        const requestPayload = { text: inputText, type: 'text', userLevel: userLevel };

        // Aquí se envía la solicitud real, la respuesta llegará por el listener
        await chrome.runtime.sendMessage({ cmd: 'CMD_START_ANALYSIS', payload: requestPayload });
    } catch (error) {
        ErrorHandler.handleError(error, 'popup.js - analyzeButton click', true);
        updateStatus('Fallo en el envío del análisis. Inténtalo de nuevo.', 'error');
        analyzeButton.disabled = false;
    }
});

// Los listeners de chrome.runtime.onMessage permanecen como los últimos que te di,
// manejando CMD_ANALYSIS_COMPLETE, CMD_ANALYSIS_ERROR, etc.
// Asegúrate de que los elementos cholaInsight, malandraInsight, fresaSynthesis sean accesibles.

chrome.runtime.onMessage.addListener((request) => {
    switch (request.cmd) {
        case 'CMD_ANALYSIS_COMPLETE':
            const { chola, malandra, fresa } = request.payload.result; // Ajustar a la estructura real del payload

            if (cholaInsight) cholaInsight.textContent = chola || 'No hay insights de Chola.';
            if (malandraInsight) malandraInsight.textContent = malandra || 'No hay disrupciones de Malandra.';
            if (fresaSynthesis) fresaSynthesis.textContent = fresa || 'Síntesis de Fresa pendiente.';

            updateStatus('Análisis Cuántico Completo!', 'success');
            resultArea.classList.remove('hidden'); 
            analyzeButton.disabled = false;
            if (acceptButton) acceptButton.disabled = false;
            if (rejectButton) rejectButton.disabled = false;
            break;

        case 'CMD_ANALYSIS_ERROR':
            updateStatus(`Error en el análisis: ${request.payload}`, 'error');
            analyzeButton.disabled = false;
            resultArea.classList.add('hidden');
            if (acceptButton) acceptButton.disabled = true;
            if (rejectButton) rejectButton.disabled = true;
            break;

        case 'CMD_FEEDBACK_RECEIVED':
            updateStatus(request.payload, 'info');
            analyzeButton.disabled = false; 
            break;
            
        case 'CMD_CRITICAL_ERROR':
            updateStatus(request.payload, 'critical-error');
            analyzeButton.disabled = true;
            resultArea.classList.add('hidden');
            systemReadyIndicator.textContent = '🔴 Fallo Crítico';
            systemReadyIndicator.classList.add('offline');
            break;
    }
});


// --- Funciones Utilitarias de UI ---
function updateStatus(message, type) {
    statusDisplay.textContent = message;
    statusDisplay.className = `status-message ${type}`; 
}
