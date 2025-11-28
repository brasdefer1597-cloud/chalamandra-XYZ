export class StorageService {
    /**
     * Guarda un valor en el almacenamiento local de la extensión.
     * @param {string} key La clave bajo la cual se guarda el valor.
     * @param {any} value El valor a guardar (debe ser serializable).
     * @returns {Promise<void>}
     */
    static async set(key, value) {
        return new Promise(resolve => {
            chrome.storage.local.set({ [key]: value }, resolve);
        });
    }

    /**
     * Obtiene un valor del almacenamiento local de la extensión.
     * @param {string} key La clave del valor a obtener.
     * @param {any} [defaultValue=null] El valor a devolver si la clave no existe.
     * @returns {Promise<any>}
     */
    static async get(key, defaultValue = null) {
        return new Promise(resolve => {
            chrome.storage.local.get([key], (result) => {
                resolve(result[key] === undefined ? defaultValue : result[key]);
            });
        });
    }

    /**
     * Elimina una clave y su valor del almacenamiento.
     * @param {string} key La clave a eliminar.
     * @returns {Promise<void>}
     */
    static async remove(key) {
        return new Promise(resolve => {
            chrome.storage.local.remove(key, resolve);
        });
    }
}