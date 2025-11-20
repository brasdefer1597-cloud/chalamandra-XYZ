import aiClient from '../utils/apiClient.js';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    
    const handleRequest = async () => {
        try {
            if (request.action === 'getApiStatus') {
                const caps = await aiClient.checkNanoCapabilities();
                const { apiKey } = await chrome.storage.sync.get('apiKey');
                
                if (caps.available) return { status: 'NANO_READY' };
                if (apiKey) return { status: 'CLOUD_READY' };
                return { status: 'NEEDS_CONFIG' };
            }

            if (request.action === 'getPageMetadata') {
                const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
                if (!tab?.id) throw new Error("No active tab");
                return await chrome.tabs.sendMessage(tab.id, { action: 'getContent' });
            }

            if (request.action === 'analyzePage') {
                const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
                const pageData = await chrome.tabs.sendMessage(tab.id, { action: 'getContent' });
                return await aiClient.processDialecticFlow(pageData.content);
            }

            if (request.action === 'summarizePage') {
                const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
                const pageData = await chrome.tabs.sendMessage(tab.id, { action: 'getContent' });
                return await aiClient.summarize(pageData.content);
            }

            throw new Error(`Unknown action: ${request.action}`);
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    handleRequest()
        .then(data => sendResponse({ success: true, data }))
        .catch(err => sendResponse({ success: false, error: err.message }));

    return true;
});
