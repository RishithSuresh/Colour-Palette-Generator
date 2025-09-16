// Enhanced mood-based palettes with multiple variations
const recommendedPalettes = {
    calm: [
        ['#E8F4FD', '#B8E6B8', '#A8D8EA', '#AA96DA', '#FCBAD3'],
        ['#F0F8FF', '#E6E6FA', '#F5F5DC', '#FFF8DC', '#F0FFFF'],
        ['#B0E0E6', '#AFEEEE', '#E0FFFF', '#F0F8FF', '#F5FFFA']
    ],
    energetic: [
        ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'],
        ['#FF5722', '#FF9800', '#FFC107', '#8BC34A', '#00BCD4'],
        ['#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3']
    ],
    romantic: [
        ['#FFB6C1', '#FFC0CB', '#FFCCCB', '#FFE4E1', '#FFF0F5'],
        ['#F8BBD9', '#E4C1F9', '#D0A9F5', '#C589E8', '#B19CD9'],
        ['#FF69B4', '#DA70D6', '#DDA0DD', '#EE82EE', '#F0E68C']
    ],
    nature: [
        ['#228B22', '#32CD32', '#90EE90', '#98FB98', '#F0FFF0'],
        ['#8FBC8F', '#9ACD32', '#ADFF2F', '#7CFC00', '#7FFF00'],
        ['#006400', '#008000', '#00FF00', '#00FF7F', '#00FA9A']
    ],
    business: [
        ['#2C3E50', '#34495E', '#7F8C8D', '#BDC3C7', '#ECF0F1'],
        ['#1A252F', '#2C3E50', '#34495E', '#5D6D7E', '#85929E'],
        ['#212529', '#343A40', '#495057', '#6C757D', '#ADB5BD']
    ],
    night: [
        ['#191970', '#483D8B', '#6A5ACD', '#7B68EE', '#9370DB'],
        ['#2F1B69', '#44318D', '#A239CA', '#E4007C', '#F5A623'],
        ['#0C0C0C', '#1C1C1C', '#2D2D2D', '#3E3E3E', '#4F4F4F']
    ],
    ocean: [
        ['#006994', '#13A3D1', '#71C5E8', '#A8DADC', '#F1FAEE'],
        ['#003F5C', '#2F4B7C', '#665191', '#A05195', '#D45087'],
        ['#1E3A8A', '#3B82F6', '#60A5FA', '#93C5FD', '#DBEAFE']
    ],
    sunset: [
        ['#FF6B35', '#F7931E', '#FFD23F', '#06FFA5', '#4D9DE0'],
        ['#FF8C42', '#FF3C38', '#FF006E', '#8338EC', '#3A86FF'],
        ['#FFBE0B', '#FB5607', '#FF006E', '#8338EC', '#3A86FF']
    ],
    forest: [
        ['#2D5016', '#3E6B1F', '#4F7942', '#7BA05B', '#A8C686'],
        ['#355E3B', '#228B22', '#32CD32', '#9ACD32', '#ADFF2F'],
        ['#013220', '#2D5016', '#4F7942', '#8FBC8F', '#98FB98']
    ],
    vintage: [
        ['#8B4513', '#CD853F', '#DEB887', '#F5DEB3', '#FFF8DC'],
        ['#A0522D', '#D2691E', '#F4A460', '#FFDAB9', '#FFE4B5'],
        ['#800000', '#B22222', '#DC143C', '#FF6347', '#FFA07A']
    ],
    modern: [
        ['#000000', '#333333', '#666666', '#999999', '#CCCCCC'],
        ['#1A1A1A', '#4A4A4A', '#7A7A7A', '#AAAAAA', '#DADADA'],
        ['#0F0F0F', '#2F2F2F', '#4F4F4F', '#6F6F6F', '#8F8F8F']
    ],
    autumn: [
        ['#8B4513', '#A0522D', '#CD853F', '#D2691E', '#F4A460'],
        ['#800000', '#B22222', '#DC143C', '#FF4500', '#FF6347'],
        ['#654321', '#8B4513', '#A0522D', '#CD853F', '#DEB887']
    ],
    spring: [
        ['#98FB98', '#90EE90', '#00FF7F', '#00FA9A', '#AFEEEE'],
        ['#F0FFF0', '#HONEYDEW', '#MINTCREAM', '#AZURE', '#GHOSTWHITE'],
        ['#7CFC00', '#ADFF2F', '#32CD32', '#00FF00', '#00FF7F']
    ],
    winter: [
        ['#B0E0E6', '#ADD8E6', '#87CEEB', '#87CEFA', '#00BFFF'],
        ['#F0F8FF', '#F5F5F5', '#DCDCDC', '#D3D3D3', '#C0C0C0'],
        ['#4682B4', '#5F9EA0', '#6495ED', '#7B68EE', '#9370DB']
    ],
    tropical: [
        ['#FF6B35', '#F7931E', '#FFD23F', '#06FFA5', '#4D9DE0'],
        ['#FF1744', '#FF5722', '#FF9800', '#FFC107', '#CDDC39'],
        ['#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#00BCD4']
    ]
};

// Global variables
let currentMoodVariation = 0;
let savedPalettes = JSON.parse(localStorage.getItem('savedPalettes')) || [];

// DOM elements
const moodSelect = document.getElementById('palette-mood');
const applyBtn = document.getElementById('apply-recommended');
const shuffleBtn = document.getElementById('shuffle-mood');
const previewContainer = document.getElementById('recommended-preview');
const mainPalette = document.getElementById('main-palette');

// Mood palette functionality
moodSelect.addEventListener('change', function() {
    const mood = moodSelect.value;
    currentMoodVariation = 0;
    previewContainer.innerHTML = '';
    applyBtn.disabled = !mood;
    shuffleBtn.disabled = !mood;

    if (mood && recommendedPalettes[mood]) {
        showMoodPreview(mood, currentMoodVariation);
    }
});

applyBtn.addEventListener('click', function() {
    const mood = moodSelect.value;
    if (mood && recommendedPalettes[mood]) {
        updatePaletteWithHistory(recommendedPalettes[mood][currentMoodVariation]);
    }
});

shuffleBtn.addEventListener('click', function() {
    const mood = moodSelect.value;
    if (mood && recommendedPalettes[mood]) {
        currentMoodVariation = (currentMoodVariation + 1) % recommendedPalettes[mood].length;
        showMoodPreview(mood, currentMoodVariation);
    }
});

function showMoodPreview(mood, variation) {
    previewContainer.innerHTML = '';
    const colors = recommendedPalettes[mood][variation];
    colors.forEach(color => {
        const box = document.createElement('div');
        box.className = 'color-box';
        box.innerHTML = `
            <div class="color" style="background-color: ${color}; height: 80px;"></div>
            <div class="color-info">
                <span class="hex-value">${color}</span>
            </div>`;
        previewContainer.appendChild(box);
    });
}
// Color harmony generator
const baseColorInput = document.getElementById('base-color');
const harmonyTypeSelect = document.getElementById('harmony-type');
const generateHarmonyBtn = document.getElementById('generate-harmony');

generateHarmonyBtn.addEventListener('click', function() {
    const baseColor = baseColorInput.value;
    const harmonyType = harmonyTypeSelect.value;
    const harmonyColors = generateColorHarmony(baseColor, harmonyType);
    updatePaletteWithHistory(harmonyColors);
});

// Main palette event listeners
mainPalette.addEventListener('click', function(e) {
    // Copy color
    if (e.target.classList.contains('copy-btn') || e.target.closest('.copy-btn')) {
        const btn = e.target.closest('.copy-btn');
        const colorInfo = btn.closest('.color-info');
        const hexValue = colorInfo.querySelector('.hex-value').textContent.trim();
        navigator.clipboard.writeText(hexValue)
            .then(() => showCopySuccess(btn))
            .catch(err => console.error('Failed to copy: ', err));
    }

    // Lock/unlock color
    if (e.target.classList.contains('lock-btn') || e.target.closest('.lock-btn')) {
        const btn = e.target.closest('.lock-btn');
        const icon = btn.querySelector('i');
        btn.classList.toggle('locked');

        if (btn.classList.contains('locked')) {
            icon.classList.remove('fa-lock-open');
            icon.classList.add('fa-lock');
            btn.title = 'Unlock color';
        } else {
            icon.classList.remove('fa-lock');
            icon.classList.add('fa-lock-open');
            btn.title = 'Lock color';
        }
    }
});

// Control buttons
document.getElementById('generate-random').addEventListener('click', generateRandomPalette);
document.getElementById('generate-gradient').addEventListener('click', generateGradientPalette);
document.getElementById('adjust-brightness').addEventListener('click', adjustBrightness);

function generateRandomPalette() {
    const colorBoxes = mainPalette.querySelectorAll('.color-box');
    const colors = [];
    colorBoxes.forEach((box) => {
        const lockBtn = box.querySelector('.lock-btn');
        const hexValue = box.querySelector('.hex-value').textContent.trim();
        if (lockBtn && lockBtn.classList.contains('locked')) {
            colors.push(hexValue);
        } else {
            colors.push(generateRandomColor());
        }
    });
    updatePaletteWithHistory(colors);
}

// Color generation functions
function generateRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function generateColorHarmony(baseColor, harmonyType) {
    const hsl = hexToHsl(baseColor);
    const colors = [baseColor];

    switch (harmonyType) {
        case 'complementary':
            colors.push(hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l));
            colors.push(hslToHex(hsl.h, Math.max(0, hsl.s - 20), Math.min(100, hsl.l + 20)));
            colors.push(hslToHex((hsl.h + 180) % 360, Math.max(0, hsl.s - 20), Math.min(100, hsl.l + 20)));
            colors.push(hslToHex(hsl.h, hsl.s, Math.max(0, hsl.l - 30)));
            break;
        case 'triadic':
            colors.push(hslToHex((hsl.h + 120) % 360, hsl.s, hsl.l));
            colors.push(hslToHex((hsl.h + 240) % 360, hsl.s, hsl.l));
            colors.push(hslToHex(hsl.h, Math.max(0, hsl.s - 30), Math.min(100, hsl.l + 30)));
            colors.push(hslToHex((hsl.h + 120) % 360, Math.max(0, hsl.s - 30), Math.min(100, hsl.l + 30)));
            break;
        case 'analogous':
            colors.push(hslToHex((hsl.h + 30) % 360, hsl.s, hsl.l));
            colors.push(hslToHex((hsl.h - 30 + 360) % 360, hsl.s, hsl.l));
            colors.push(hslToHex((hsl.h + 60) % 360, hsl.s, hsl.l));
            colors.push(hslToHex((hsl.h - 60 + 360) % 360, hsl.s, hsl.l));
            break;
        case 'split-complementary':
            colors.push(hslToHex((hsl.h + 150) % 360, hsl.s, hsl.l));
            colors.push(hslToHex((hsl.h + 210) % 360, hsl.s, hsl.l));
            colors.push(hslToHex(hsl.h, Math.max(0, hsl.s - 20), Math.min(100, hsl.l + 20)));
            colors.push(hslToHex((hsl.h + 180) % 360, Math.max(0, hsl.s - 40), Math.min(100, hsl.l + 40)));
            break;
        case 'tetradic':
            colors.push(hslToHex((hsl.h + 90) % 360, hsl.s, hsl.l));
            colors.push(hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l));
            colors.push(hslToHex((hsl.h + 270) % 360, hsl.s, hsl.l));
            colors.push(hslToHex(hsl.h, Math.max(0, hsl.s - 20), Math.min(100, hsl.l + 20)));
            break;
        case 'monochromatic':
            colors.push(hslToHex(hsl.h, hsl.s, Math.min(100, hsl.l + 20)));
            colors.push(hslToHex(hsl.h, hsl.s, Math.max(0, hsl.l - 20)));
            colors.push(hslToHex(hsl.h, Math.max(0, hsl.s - 30), hsl.l));
            colors.push(hslToHex(hsl.h, Math.min(100, hsl.s + 20), Math.max(0, hsl.l - 40)));
            break;
    }

    return colors.slice(0, 5);
}

function generateGradientPalette() {
    const startColor = generateRandomColor();
    const endColor = generateRandomColor();
    const colors = [];

    for (let i = 0; i < 5; i++) {
        const ratio = i / 4;
        colors.push(interpolateColor(startColor, endColor, ratio));
    }

    updatePaletteWithHistory(colors);
}

function adjustBrightness() {
    const colorBoxes = mainPalette.querySelectorAll('.color-box');
    const colors = [];

    colorBoxes.forEach((box) => {
        const lockBtn = box.querySelector('.lock-btn');
        const hexValue = box.querySelector('.hex-value').textContent.trim();

        if (lockBtn && lockBtn.classList.contains('locked')) {
            colors.push(hexValue);
        } else {
            const hsl = hexToHsl(hexValue);
            const newLightness = Math.min(100, Math.max(0, hsl.l + (Math.random() - 0.5) * 40));
            colors.push(hslToHex(hsl.h, hsl.s, newLightness));
        }
    });

    updatePaletteWithHistory(colors);
}

// Color utility functions
function hexToHsl(hex) {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return { h: h * 360, s: s * 100, l: l * 100 };
}

function hslToHex(h, s, l) {
    h = h / 360;
    s = s / 100;
    l = l / 100;

    const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
    };

    let r, g, b;
    if (s === 0) {
        r = g = b = l;
    } else {
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    const toHex = (c) => {
        const hex = Math.round(c * 255).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function interpolateColor(color1, color2, ratio) {
    const hex1 = color1.replace('#', '');
    const hex2 = color2.replace('#', '');

    const r1 = parseInt(hex1.slice(0, 2), 16);
    const g1 = parseInt(hex1.slice(2, 4), 16);
    const b1 = parseInt(hex1.slice(4, 6), 16);

    const r2 = parseInt(hex2.slice(0, 2), 16);
    const g2 = parseInt(hex2.slice(2, 4), 16);
    const b2 = parseInt(hex2.slice(4, 6), 16);

    const r = Math.round(r1 + (r2 - r1) * ratio);
    const g = Math.round(g1 + (g2 - g1) * ratio);
    const b = Math.round(b1 + (b2 - b1) * ratio);

    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

function updatePalette(colors) {
    const colorBoxes = mainPalette.querySelectorAll('.color-box');
    colorBoxes.forEach((box, index) => {
        if (colors[index]) {
            const colorDiv = box.querySelector('.color');
            const hexValue = box.querySelector('.hex-value');
            colorDiv.style.backgroundColor = colors[index];
            hexValue.textContent = colors[index].toUpperCase();
        }
    });
}

function showCopySuccess(copyBtn) {
    const icon = copyBtn.querySelector('i');
    const originalClass = icon.className;

    icon.className = 'fas fa-check';
    copyBtn.classList.add('copied');
    copyBtn.title = 'Copied!';

    setTimeout(() => {
        icon.className = originalClass;
        copyBtn.classList.remove('copied');
        copyBtn.title = 'Copy to clipboard';
    }, 1000);
}

// Export/Import functionality
document.getElementById('save-palette').addEventListener('click', savePalette);
document.getElementById('export-palette').addEventListener('click', exportPalette);
document.getElementById('import-file').addEventListener('change', importPalette);
document.getElementById('clear-saved').addEventListener('click', clearSavedPalettes);

function savePalette() {
    const colors = getCurrentPalette();
    const timestamp = new Date().toLocaleString();
    const palette = {
        id: Date.now(),
        colors: colors,
        timestamp: timestamp,
        name: `Palette ${savedPalettes.length + 1}`
    };

    savedPalettes.push(palette);
    localStorage.setItem('savedPalettes', JSON.stringify(savedPalettes));
    displaySavedPalettes();

    // Show success message
    const btn = document.getElementById('save-palette');
    const originalText = btn.innerHTML;
    btn.innerHTML = '✅ Saved!';
    setTimeout(() => {
        btn.innerHTML = originalText;
    }, 2000);
}

function exportPalette() {
    const colors = getCurrentPalette();
    const data = {
        palette: colors,
        timestamp: new Date().toISOString(),
        generator: 'Advanced Colour Palette Generator'
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `palette-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

function importPalette(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            const colors = data.palette || data.colors || data;

            if (Array.isArray(colors) && colors.length >= 5) {
                updatePalette(colors.slice(0, 5));
            } else {
                alert('Invalid palette file format');
            }
        } catch (error) {
            alert('Error reading palette file');
        }
    };
    reader.readAsText(file);
}

function clearSavedPalettes() {
    if (confirm('Are you sure you want to clear all saved palettes?')) {
        savedPalettes = [];
        localStorage.removeItem('savedPalettes');
        displaySavedPalettes();
    }
}

function getCurrentPalette() {
    const colorBoxes = mainPalette.querySelectorAll('.color-box');
    return Array.from(colorBoxes).map(box =>
        box.querySelector('.hex-value').textContent.trim()
    );
}

function displaySavedPalettes() {
    const container = document.getElementById('saved-palettes');
    container.innerHTML = '';

    if (savedPalettes.length === 0) {
        container.innerHTML = '<p style="color: #666; font-style: italic;">No saved palettes</p>';
        return;
    }

    savedPalettes.forEach(palette => {
        const paletteDiv = document.createElement('div');
        paletteDiv.className = 'saved-palette';
        paletteDiv.style.cssText = `
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1rem;
            margin: 0.5rem 0;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        `;

        const colorsPreview = document.createElement('div');
        colorsPreview.style.cssText = 'display: flex; gap: 2px;';
        palette.colors.forEach(color => {
            const colorDiv = document.createElement('div');
            colorDiv.style.cssText = `
                width: 20px;
                height: 20px;
                background-color: ${color};
                border-radius: 3px;
            `;
            colorsPreview.appendChild(colorDiv);
        });

        const info = document.createElement('div');
        info.innerHTML = `
            <strong>${palette.name}</strong><br>
            <small>${palette.timestamp}</small>
        `;

        const loadBtn = document.createElement('button');
        loadBtn.textContent = 'Load';
        loadBtn.className = 'btn';
        loadBtn.style.cssText = 'padding: 0.3rem 0.8rem; font-size: 0.8rem;';
        loadBtn.onclick = () => updatePalette(palette.colors);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '🗑️';
        deleteBtn.className = 'btn';
        deleteBtn.style.cssText = 'padding: 0.3rem 0.5rem; font-size: 0.8rem; background: #ff4757;';
        deleteBtn.onclick = () => {
            savedPalettes = savedPalettes.filter(p => p.id !== palette.id);
            localStorage.setItem('savedPalettes', JSON.stringify(savedPalettes));
            displaySavedPalettes();
        };

        paletteDiv.appendChild(colorsPreview);
        paletteDiv.appendChild(info);
        paletteDiv.appendChild(loadBtn);
        paletteDiv.appendChild(deleteBtn);
        container.appendChild(paletteDiv);
    });
}

// AI Color Name Generator
const colorNames = {
    prefixes: ['Mystic', 'Cosmic', 'Ethereal', 'Velvet', 'Crystal', 'Shadow', 'Neon', 'Electric', 'Dreamy', 'Vintage', 'Royal', 'Ocean', 'Forest', 'Desert', 'Arctic', 'Tropical', 'Urban', 'Retro', 'Futuristic', 'Enchanted'],
    bases: ['Azure', 'Crimson', 'Emerald', 'Amber', 'Violet', 'Coral', 'Indigo', 'Scarlet', 'Turquoise', 'Magenta', 'Chartreuse', 'Burgundy', 'Teal', 'Lavender', 'Peach', 'Mint', 'Rose', 'Gold', 'Silver', 'Bronze'],
    suffixes: ['Mist', 'Glow', 'Shimmer', 'Whisper', 'Dream', 'Burst', 'Flame', 'Frost', 'Storm', 'Breeze', 'Dawn', 'Dusk', 'Echo', 'Pulse', 'Vibe', 'Aura', 'Spark', 'Bloom', 'Tide', 'Haze']
};

function generateColorName(hexColor) {
    const hsl = hexToHsl(hexColor);
    const prefix = colorNames.prefixes[Math.floor(Math.random() * colorNames.prefixes.length)];
    const base = colorNames.bases[Math.floor(Math.random() * colorNames.bases.length)];
    const suffix = colorNames.suffixes[Math.floor(Math.random() * colorNames.suffixes.length)];

    // Add some logic based on color properties
    let name = '';
    if (hsl.l > 80) {
        name = `Light ${base} ${suffix}`;
    } else if (hsl.l < 20) {
        name = `Dark ${base} ${suffix}`;
    } else if (hsl.s > 80) {
        name = `Vibrant ${base} ${suffix}`;
    } else if (hsl.s < 30) {
        name = `Muted ${base} ${suffix}`;
    } else {
        name = `${prefix} ${base} ${suffix}`;
    }

    return name;
}

// Palette History Feature
let paletteHistory = JSON.parse(localStorage.getItem('paletteHistory')) || [];
const maxHistoryItems = 10;

function addToHistory(colors) {
    const timestamp = new Date().toLocaleString();
    const historyItem = {
        id: Date.now(),
        colors: [...colors],
        timestamp: timestamp
    };

    // Remove duplicates and add to beginning
    paletteHistory = paletteHistory.filter(item =>
        !arraysEqual(item.colors, colors)
    );
    paletteHistory.unshift(historyItem);

    // Keep only the last maxHistoryItems
    if (paletteHistory.length > maxHistoryItems) {
        paletteHistory = paletteHistory.slice(0, maxHistoryItems);
    }

    localStorage.setItem('paletteHistory', JSON.stringify(paletteHistory));
    displayPaletteHistory();
}

function arraysEqual(a, b) {
    return a.length === b.length && a.every((val, i) => val === b[i]);
}

function displayPaletteHistory() {
    const container = document.getElementById('palette-history');
    container.innerHTML = '';

    if (paletteHistory.length === 0) {
        container.innerHTML = '<p style="color: var(--text-secondary); font-style: italic; text-align: center; padding: 2rem;">No palette history yet. Generate some palettes to see them here!</p>';
        return;
    }

    paletteHistory.forEach(item => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.style.cssText = `
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1rem;
            margin: 0.8rem 0;
            background: var(--glass-bg);
            border: 1px solid var(--glass-border);
            border-radius: 10px;
            cursor: pointer;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
        `;

        const colorsPreview = document.createElement('div');
        colorsPreview.style.cssText = 'display: flex; gap: 3px; flex-shrink: 0;';
        item.colors.forEach(color => {
            const colorDiv = document.createElement('div');
            colorDiv.style.cssText = `
                width: 25px;
                height: 25px;
                background-color: ${color};
                border-radius: 4px;
                border: 1px solid var(--glass-border);
            `;
            colorsPreview.appendChild(colorDiv);
        });

        const info = document.createElement('div');
        info.style.cssText = 'flex-grow: 1; color: var(--text-primary);';
        info.innerHTML = `
            <div style="font-weight: 600; color: var(--neon-cyan); font-family: 'Rajdhani', sans-serif;">
                Palette #${paletteHistory.indexOf(item) + 1}
            </div>
            <div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.2rem;">
                ${item.timestamp}
            </div>
        `;

        const loadBtn = document.createElement('button');
        loadBtn.textContent = 'Load';
        loadBtn.className = 'btn';
        loadBtn.style.cssText = 'padding: 0.4rem 1rem; font-size: 0.9rem; flex-shrink: 0;';
        loadBtn.onclick = (e) => {
            e.stopPropagation();
            updatePalette(item.colors);
        };

        historyItem.appendChild(colorsPreview);
        historyItem.appendChild(info);
        historyItem.appendChild(loadBtn);

        // Add hover effects
        historyItem.addEventListener('mouseenter', () => {
            historyItem.style.borderColor = 'var(--neon-cyan)';
            historyItem.style.transform = 'translateY(-2px)';
            historyItem.style.boxShadow = '0 8px 25px rgba(0, 255, 255, 0.2)';
        });

        historyItem.addEventListener('mouseleave', () => {
            historyItem.style.borderColor = 'var(--glass-border)';
            historyItem.style.transform = 'translateY(0)';
            historyItem.style.boxShadow = 'none';
        });

        // Click to load palette
        historyItem.addEventListener('click', () => {
            updatePalette(item.colors);
        });

        container.appendChild(historyItem);
    });
}

function clearPaletteHistory() {
    if (confirm('Are you sure you want to clear your palette history?')) {
        paletteHistory = [];
        localStorage.removeItem('paletteHistory');
        displayPaletteHistory();
    }
}

// Add event listeners for new features
document.addEventListener('DOMContentLoaded', function() {
    displaySavedPalettes();
    displayPaletteHistory();
    generateRandomPalette();

    // Add color name generation toggle
    document.getElementById('toggle-names').addEventListener('click', toggleColorNames);
    document.getElementById('clear-history').addEventListener('click', clearPaletteHistory);
});

function toggleColorNames() {
    const colorBoxes = mainPalette.querySelectorAll('.color-box');
    const toggleBtn = document.getElementById('toggle-names');

    colorBoxes.forEach(box => {
        const hexValue = box.querySelector('.hex-value').textContent.trim();
        const nameElement = box.querySelector('.color-name');

        if (nameElement) {
            nameElement.remove();
            toggleBtn.innerHTML = '🎯 Generate Creative Names';
        } else {
            const colorName = generateColorName(hexValue);
            const nameDiv = document.createElement('div');
            nameDiv.className = 'color-name';
            nameDiv.textContent = colorName;
            nameDiv.style.cssText = `
                font-family: 'Rajdhani', sans-serif;
                font-size: 0.85rem;
                color: var(--neon-pink);
                font-weight: 500;
                text-transform: uppercase;
                letter-spacing: 1px;
                margin-top: 0.5rem;
                text-align: center;
                text-shadow: 0 0 10px rgba(255, 0, 128, 0.5);
            `;
            box.querySelector('.color-info').appendChild(nameDiv);
            toggleBtn.innerHTML = '❌ Hide Names';
        }
    });
}

// Update palette function to add to history
function updatePaletteWithHistory(colors) {
    updatePalette(colors);
    addToHistory(colors);
}