
const paragraph = document.getElementById('aboutText');

const text = paragraph.textContent;
paragraph.innerHTML = '';  


text.split('').forEach((char, index) => {
    const span = document.createElement('span');
    span.textContent = char;
    span.style.animationDelay = `${index * 0.05}s`; 
    paragraph.appendChild(span);
});
