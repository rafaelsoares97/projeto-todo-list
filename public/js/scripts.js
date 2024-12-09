// Seleciona os elementos necessários
const toggleBtn = document.querySelector('.toggle');
const body = document.body;

// Adiciona o evento de clique no botão de toggle
toggleBtn.addEventListener('click', () => {
    // Alterna a classe dark-mode no body
    body.classList.toggle('darkmode');
});
