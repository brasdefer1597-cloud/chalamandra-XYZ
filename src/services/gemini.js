
import { GeminiAdapter } from './GeminiAdapter';
import { TelemetryClient } from './TelemetryClient';
import { ModelConfig } from '../types';
import type { GenerateContentResponse, File as GenaiFile } from '@google/genai';

// --- Declarations & Initializations ---

declare global {
    interface Window {
        aistudio: {
            getApiKey: () => Promise<string | null>;
        };
    }
}

const telemetryClient = new TelemetryClient();

export const getApiKey = async (): Promise<string | null> => {
    if (window.aistudio) {
        return window.aistudio.getApiKey();
    }
    console.warn('aistudio.getApiKey() not found.');
    return null;
};

// --- File Uploading ---

/**
 * Represents a file that has been uploaded to the Gemini API and is ready to be used.
 */
export interface UploadedFile {
    uri: string;
    name: string;
    mimeType: string;
}

/**
 * Uploads a file to the Gemini API for use in multimodal prompts.
 * This function orchestrates the call to the GeminiAdapter.
 * @param {File} file The native browser File object to upload.
 * @returns {Promise<UploadedFile>} An object containing the URI and metadata of the uploaded file.
 */
export const uploadFile = async (file: File): Promise<UploadedFile> => {
    console.log(`[Omni-Tool] Iniciando carga de archivo: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`);
    try {
        const adapter = new GeminiAdapter();
        const genaiFile: GenaiFile = await adapter.uploadFile(file);

        console.log(`[Omni-Tool] Archivo cargado con éxito. URI: ${genaiFile.uri}`);
        telemetryClient.logEvent('file_upload_success', { fileName: genaiFile.name, size: file.size, uri: genaiFile.uri });

        // Return a clean, serializable object for the app's state
        return {
            uri: genaiFile.uri,
            name: genaiFile.name,
            mimeType: genaiFile.mimeType,
        };
    } catch (error) {
        console.error('[Omni-Tool] Error catastrófico durante la carga del archivo:', error);
        telemetryClient.logEvent('file_upload_failed', { fileName: file.name, error: (error as Error).message });
        throw new Error(`Failed to upload file: ${(error as Error).message}`);
    }
};

// --- Content Generation ---

/**
 * Generates content using the Gemini model, optionally with file attachments.
 * @param {string} prompt The user's text prompt.
 * @param {ModelConfig} config The model configuration.
 * @param {UploadedFile[]} [attachments] Optional array of uploaded file objects from uploadFile().
 * @returns {Promise<GenerateContentResponse>}
 */
export const generateText = async (
    prompt: string,
    config: ModelConfig,
    attachments?: UploadedFile[]
): Promise<GenerateContentResponse> => {
    console.log(`[Omni-Tool] Generando contenido con modelo ${config.model}...`);
    try {
        const adapter = new GeminiAdapter();
        const response = await adapter.generateContent(prompt, config, attachments);
        telemetryClient.logEvent('generate_text_success', { model: config.model, hasAttachments: !!attachments?.length });
        return response;
    } catch (error) {
        console.error('[Omni-Tool] Error generating content:', error);
        telemetryClient.logEvent('generate_text_failed', { model: config.model, error: (error as Error).message });
        throw error;
    }
};
