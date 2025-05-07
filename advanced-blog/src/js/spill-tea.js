document.addEventListener('DOMContentLoaded', () => {
    const teaForm = document.getElementById('tea-form');
    const teaFeed = document.querySelector('.tea-feed');

    teaForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const teaContent = teaForm.querySelector('textarea').value;
        
        if (teaContent.trim()) {
            const newTea = document.createElement('article');
            newTea.className = 'tea-card';
            newTea.innerHTML = `
                <p>${teaContent}</p>
                <span class="tea-time">just now</span>
            `;
            
            teaFeed.insertBefore(newTea, teaFeed.firstChild);
            teaForm.reset();
        }
    });
});