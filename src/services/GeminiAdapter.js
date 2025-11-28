
import { Client, GenerateContentParameters, GenerateContentResponse, Content, Part, File as GenaiFile } from '@google/genai';
import { ModelConfig } from '../types';
import { getApiKey } from './gemini';
import type { UploadedFile } from './gemini'; // Import the new interface

export class GeminiAdapter {
    private client: Client | null = null;
    private apiKey: string | null = null;

    constructor() {
        console.log('GeminiAdapter inicializado (Lazy Loading).');
    }

    private async ensureClient(): Promise<Client> {
        if (!this.client) {
            console.log("Inicializando cliente Gemini...");
            const key = await getApiKey();
            if (!key) {
                throw new Error("API Key no encontrada. Por favor, configura tu API Key.");
            }
            this.apiKey = key;
            this.client = new Client({ apiKey: this.apiKey });
        }
        return this.client;
    }

    /**
     * Uploads a file to the Gemini API.
     * @param {File} file The browser File object to upload.
     * @returns {Promise<GenaiFile>} The response object from the API.
     */
    async uploadFile(file: File): Promise<GenaiFile> {
        const client = await this.ensureClient();
        // The new client.files().upload() method handles the file object directly
        const response = await client.files().upload({ file });
        return response.file;
    }

    /**
     * Generates content with a given prompt and model configuration, including file attachments.
     * @param {string} prompt The text prompt.
     * @param {ModelConfig} config The model configuration.
     * @param {UploadedFile[]} [attachments] Optional array of uploaded files.
     * @returns {Promise<GenerateContentResponse>}
     */
    async generateContent(
        prompt: string,
        config: ModelConfig,
        attachments?: UploadedFile[]
    ): Promise<GenerateContentResponse> {
        const client = await this.ensureClient();
        const model = client.getGenerativeModel(config);

        const contents: Content[] = [];
        const parts: Part[] = [{ text: prompt }];

        // If there are attachments, add them to the parts array
        if (attachments && attachments.length > 0) {
            attachments.forEach(file => {
                parts.push({
                    fileData: {
                        mimeType: file.mimeType,
                        fileUri: file.uri
                    }
                });
            });
        }

        contents.push({ role: 'user', parts });

        const params: GenerateContentParameters = { contents };
        return model.generateContent(params);
    }
}
