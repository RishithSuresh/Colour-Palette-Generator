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