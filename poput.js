import { getDialecticalAnalysis, evolveAnalysis } from './ai/engine.js';

const DOMElements = {
    problemInput: document.getElementById('problem-input'),
    analyzeButton: document.getElementById('analyze-button'),
    cholaCard: document.getElementById('chola-card'),
    malandraCard: document.getElementById('malandra-card'),
    fresaCard: document.getElementById('fresa-card'),
    loadingIndicator: document.getElementById('loading-indicator'),
    statusMessage: document.getElementById('status-message'),
    levelButtons: document.querySelectorAll('.level-button'),
    resultsContainer: document.getElementById('results-container')
};

let currentAnalysis = null;
let currentLevel = '3';

const updateUI = (analysis) => {
    DOMElements.cholaCard.querySelector('.card-content').innerText = analysis.chola || 'Pendiente...';
    DOMElements.malandraCard.querySelector('.card-content').innerText = analysis.malandra || 'Pendiente...';
    DOMElements.fresaCard.querySelector('.card-content').innerText = analysis.fresa || 'Pendiente...';
    
    currentAnalysis = analysis;
    DOMElements.fresaCard.querySelector('h3').innerText = `FRESA – Síntesis (Nivel ${analysis.evolutionLevel})`;
    DOMElements.resultsContainer.style.display = 'flex';
};

const setLoading = (isLoading, targetCard = null) => {
    DOMElements.loadingIndicator.style.display = isLoading ? 'block' : 'none';
    DOMElements.analyzeButton.disabled = isLoading;

    if (targetCard) {
        if (isLoading) targetCard.classList.add('analyzing');
        else targetCard.classList.remove('analyzing');
    } else {
        if (isLoading) {
            DOMElements.resultsContainer.style.display = 'none';
        }
    }
};

const showStatus = (message, duration = 2000) => {
    DOMElements.statusMessage.innerText = message;
    DOMElements.statusMessage.classList.add('visible');
    setTimeout(() => DOMElements.statusMessage.classList.remove('visible'), duration);
};

const handleAnalysis = async () => {
    const problem = DOMElements.problemInput.value.trim();
    if (!problem) {
        showStatus("¡Escribe un problema primero!", 1500);
        return;
    }

    try {
        setLoading(true);
        const analysis = await getDialecticalAnalysis(problem);
        updateUI(analysis);
        currentLevel = '3';
        
        DOMElements.levelButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.level === '3'));
        
    } catch (e) {
        console.error("Error:", e);
        showStatus(`Error: ${e.message}`, 4000);
    } finally {
        setLoading(false);
    }
};

const handleEvolution = async (targetLevel) => {
    if (!currentAnalysis) {
        showStatus("Inicia un análisis primero.", 1500);
        return;
    }
    if (currentLevel === targetLevel) return;

    const problem = DOMElements.problemInput.value.trim();

    try {
        setLoading(true, DOMElements.fresaCard);
        const evolvedAnalysis = await evolveAnalysis(problem, currentAnalysis, targetLevel);
        updateUI(evolvedAnalysis);
        currentLevel = targetLevel;

        DOMElements.levelButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.level === targetLevel));

    } catch (e) {
        console.error("Evolution Error:", e);
        showStatus(`Error: ${e.message}`, 4000);
    } finally {
        setLoading(false, DOMElements.fresaCard);
    }
};

const handleCopy = (event) => {
    let card = event.target.closest('.card');
    if (!card) return;
    if (card.id === 'fresa-card' && card.classList.contains('analyzing')) return;

    const content = card.querySelector('.card-content').innerText;
    navigator.clipboard.writeText(content).then(() => {
        showStatus(`Copiado: ${card.querySelector('h3').innerText.split('–')[0].trim()}`);
        card.style.borderColor = '#1f883d';
        setTimeout(() => card.style.borderColor = '#30363d', 500);
    });
};

document.addEventListener('DOMContentLoaded', () => {
    DOMElements.analyzeButton.addEventListener('click', handleAnalysis);
    
    DOMElements.levelButtons.forEach(button => {
        button.addEventListener('click', () => {
            const level = button.dataset.level;
            if (level === '3') handleAnalysis();
            else handleEvolution(level);
        });
    });

    DOMElements.resultsContainer.addEventListener('click', handleCopy);
});
