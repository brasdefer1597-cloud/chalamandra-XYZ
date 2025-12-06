import {
    CHOLA_SYSTEM_PROMPT,
    MALANDRA_SYSTEM_PROMPT,
    BASE_SYSTEM_PROMPT,
    EVOLUTION_PROMPTS
} from './ai_prompts_config.js';

const canUseAI = async () => {
    try {
        // Check for Gemini Nano availability
        return window.ai && (await window.ai.languageModel.capabilities()).available === 'readily';
    } catch (e) {
        console.warn("AI check failed:", e);
        return false;
    }
};

const runPrompt = async (userPrompt, systemPrompt) => {
    if (!(await canUseAI())) {
        // FALLBACK DE SIMULACIÓN (Para que funcione si no tienes Nano activo)
        console.warn("Gemini Nano no disponible. Usando modo Simulación.");
        return new Promise(resolve => setTimeout(() => resolve("[SIMULACIÓN] La IA respondió: " + userPrompt.substring(0, 50) + "..."), 1000));
    }

    const session = await window.ai.languageModel.create({ systemPrompt });
    try {
        const result = await session.prompt(userPrompt);
        return result;
    } finally {
        session.destroy();
    }
};

export const getDialecticalAnalysis = async (problem) => {
    console.log("CHALAMANDRA: Starting Level 3 Analysis...");

    const cholaPrompt = `As CHOLA, generate a thesis. Problem: "${problem}"`;
    const cholaResult = await runPrompt(cholaPrompt, CHOLA_SYSTEM_PROMPT);

    const malandraPrompt = `As MALANDRA, critique this thesis. Thesis: "${cholaResult}"`;
    const malandraResult = await runPrompt(malandraPrompt, MALANDRA_SYSTEM_PROMPT);

    const fresaPrompt = `Synthesize: Thesis: "${cholaResult}" Antithesis: "${malandraResult}"`;
    const fresaSystemPrompt = `${BASE_SYSTEM_PROMPT}\n${EVOLUTION_PROMPTS['3']}`;
    const fresaResult = await runPrompt(fresaPrompt, fresaSystemPrompt);

    return {
        chola: cholaResult,
        malandra: malandraResult,
        fresa: fresaResult,
        evolutionLevel: 3,
    };
};

export const evolveAnalysis = async (problem, currentAnalysis, targetLevel) => {
    const targetPromptStructure = EVOLUTION_PROMPTS[targetLevel];
    
    let prompt = `You are FRESA. Evolve strategy to Level ${targetLevel}.
    Original Problem: "${problem}"
    Thesis: "${currentAnalysis.chola}"
    Antithesis: "${currentAnalysis.malandra}"
    Current Synthesis: "${currentAnalysis.fresa}"
    Provide evolved synthesis following Level ${targetLevel} structure.`;

    const systemPrompt = `${BASE_SYSTEM_PROMPT}\n${targetPromptStructure}`;
    const newFresaResult = await runPrompt(prompt, systemPrompt);

    return {
        chola: currentAnalysis.chola,
        malandra: currentAnalysis.malandra,
        fresa: newFresaResult,
        evolutionLevel: targetLevel,
    };
};
