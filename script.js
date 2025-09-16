// Recommended palettes by mood/situation/environment
const recommendedPalettes = {
    calm: ['#A7C7E7', '#B4DFE5', '#E2F0CB', '#F6D6AD', '#FFE5D9'],
    energetic: ['#FF6F61', '#FFB400', '#FFD700', '#00B8A9', '#6A0572'],
    romantic: ['#F67280', '#C06C84', '#6C5B7B', '#355C7D', '#F8B195'],
    nature: ['#355C7D', '#6C5B7B', '#C06C84', '#F8B195', '#F67280'],
    business: ['#232931', '#393E46', '#4ECCA3', '#EEEEEE', '#232931'],
    night: ['#22223B', '#4A4E69', '#9A8C98', '#C9ADA7', '#F2E9E4']
};

const moodSelect = document.getElementById('palette-mood');
const applyBtn = document.getElementById('apply-recommended');
const previewContainer = document.getElementById('recommended-preview');

moodSelect.addEventListener('change', function() {
    const mood = moodSelect.value;
    previewContainer.innerHTML = '';
    applyBtn.disabled = !mood;
    if (mood && recommendedPalettes[mood]) {
        // Show preview
        const colors = recommendedPalettes[mood];
        colors.forEach(color => {
            const box = document.createElement('div');
            box.className = 'color-box';
            box.innerHTML = `<div class="color" style="background-color: ${color}; height: 60px;"></div>
                <div class="color-info">
                    <span class="hex-value">${color}</span>
                </div>`;
            previewContainer.appendChild(box);
        });
    }
});

applyBtn.addEventListener('click', function() {
    const mood = moodSelect.value;
    if (mood && recommendedPalettes[mood]) {
        updatePalette(recommendedPalettes[mood]);
    }
});
const btn = document.getElementById('btn');
const paletteContainer = document.querySelector('.palette-container');

btn.addEventListener('click', generatePalette);

paletteContainer.addEventListener('click', function(e) {
    // Copy color
    if (e.target.classList.contains('copy-btn')) {
        const colorInfo = e.target.closest('.color-info');
        const hexValue = colorInfo.querySelector('.hex-value').textContent.trim();
        navigator.clipboard.writeText(hexValue)
            .then(() => showCopySuccess(e.target))
            .catch(err => console.error('Failed to copy: ', err));
    }
    // Lock/unlock color
    if (e.target.classList.contains('lock-btn')) {
        e.target.classList.toggle('locked');
        if (e.target.classList.contains('locked')) {
            e.target.classList.remove('fa-lock-open');
            e.target.classList.add('fa-lock');
            e.target.title = 'Unlock color';
        } else {
            e.target.classList.remove('fa-lock');
            e.target.classList.add('fa-lock-open');
            e.target.title = 'Lock color';
        }
    }
});
function generatePalette() {
    const colorBoxes = document.querySelectorAll('.color-box');
    const colors = [];
    colorBoxes.forEach((box, i) => {
        const lockBtn = box.querySelector('.lock-btn');
        const hexValue = box.querySelector('.hex-value').textContent.trim();
        if (lockBtn.classList.contains('locked')) {
            colors.push(hexValue);
        } else {
            colors.push(generateRandomColor());
        }
    });
    updatePalette(colors);
}

function generateRandomColor() 
{
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) 
    {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function updatePalette(colors) 
{
    const colorBoxes = document.querySelectorAll('.color-box');
    colorBoxes.forEach((box, index) => {
        const color = colors[index];
        const colorDiv = box.querySelector('.color');
        const hexValue = box.querySelector('.hex-value');
        colorDiv.style.backgroundColor = color;
        hexValue.textContent = color;
    });
}

function showCopySuccess(copyBtn) {
    // Change icon to check
    copyBtn.classList.remove("fa-copy");
    copyBtn.classList.add("fa-check");
    copyBtn.style.color = "#48bb78";
    copyBtn.title = "Copied!";
    // Revert after 1s
    setTimeout(() => {
        copyBtn.classList.remove("fa-check");
        copyBtn.classList.add("fa-copy");
        copyBtn.style.color = "#8296ef";
        copyBtn.title = "Copy to clipboard";
    }, 1000);
}