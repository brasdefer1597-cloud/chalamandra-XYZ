// utils/ErrorHandler.js (El Guardián Silencioso de la Estabilidad)

export class ErrorHandler {
    /**
     * @description Captura y procesa errores de forma centralizada.
     * Analogía: Es el sistema de seguridad que detecta fallas y activa protocolos de contención.
     * @param {Error} error - El objeto de error.
     * @param {string} context - Descripción del contexto donde ocurrió el error.
     * @param {boolean} shouldNotifyUser - Si el error debe ser comunicado al usuario.
     * @returns {void}
     */
    static handleError(error, context = 'Unknown Context', shouldNotifyUser = false) {
        console.error(`[CRÍTICO] Error en ${context}:`, error);

        // 1. Logging Avanzado (Telemetría para Depuración a Ciegas)
        // En un entorno real, enviaríamos esto a un servicio de telemetría (ej. Sentry, DataDog).
        this.logToTelemetry({
            message: error.message,
            stack: error.stack,
            context: context,
            timestamp: new Date().toISOString()
        });

        // 2. Notificación al Usuario (Flujo Inverso Consistente)
        if (shouldNotifyUser) {
            // Se envía un mensaje al popup de forma consistente.
            chrome.runtime.sendMessage({ 
                cmd: 'CMD_CRITICAL_ERROR', 
                payload: `Un problema inesperado ocurrió: ${error.message}. Contacta soporte.` 
            });
        }
    }

    /**
     * @description (Placeholder) Envía logs a un servicio de telemetría.
     */
    static logToTelemetry(errorDetails) {
        // Implementación real: fetch('https://your-telemetry-service.com/log', { method: 'POST', body: JSON.stringify(errorDetails) });
        console.warn('[TELEMETRY] Logging error details (in production, this goes to cloud monitoring).', errorDetails);
    }
}