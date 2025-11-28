// types.ts

// --- Core Models and Configs ---
export enum ModelType {
    FLASH = 'gemini-2.5-flash',
    PRO = 'gemini-3-pro-preview', 
}

export interface ThinkingConfig {
    thinkingBudget: number;
}

export interface ModelConfig {
    model: ModelType;
    systemInstruction?: string;
    thinkingConfig?: ThinkingConfig;
}

// --- Chat State and UI ---
export enum ChatMode {
    STANDARD = 'STANDARD',
    THINKING = 'THINKING',
}

export interface ChatMessage {
    id: string;
    text: string;
    role: 'user' | 'model';
    timestamp: number;
    mode: ChatMode;
    attachments?: UploadedFile[]; // Keep track of files attached to a message
}

export interface TelemetryEvent {
    id: string;
    type: string; 
    payload: any;
    timestamp: number;
}

// --- File Handling ---
/**
 * Represents a file that has been successfully uploaded to the Gemini API
 * and is ready for use in prompts. This is a serializable, state-friendly version.
 */
export interface UploadedFile {
    uri: string;
    name: string;
    mimeType: string;
}
