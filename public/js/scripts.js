// Mantém o código do darkmode
const toggleBtn = document.querySelector('.toggle');
const body = document.body;

// Adiciona seletor para o link de reset
const resetLink = document.querySelector('a[href="#reset"]');

// Adiciona seletor para o contador
const contadorItens = document.querySelector('.contador');

// Adiciona seletores para os filtros
const filtroTodos = document.querySelector('#todos');
const filtroAtivos = document.querySelector('#ativos');
const filtroConcluidos = document.querySelector('#concluidos');

// Adiciona evento de click no link de reset
resetLink.addEventListener('click', (e) => {
    e.preventDefault(); // Previne o comportamento padrão do link
    resetTodos();
});

// Função para atualizar o contador
function atualizaContador() {
    const totalItens = document.querySelectorAll('.item').length;
    const itensCompletos = document.querySelectorAll('.item-checked').length;
    const itensRestantes = totalItens - itensCompletos;
    
    // Atualiza o texto do contador
    contadorItens.textContent = `${itensRestantes} ${itensRestantes === 1 ? 'item restante' : 'itens restantes'}`;
}

// Nova função para limpar todos
function resetTodos() {
    // Limpa o localStorage
    localStorage.removeItem('todos');
    
    // Limpa a lista na tela
    listaTarefas.innerHTML = '';
    atualizaContador(); // Atualiza contador ao resetar
    aplicarFiltro('todos');
}

toggleBtn.addEventListener('click', () => {
    body.classList.toggle('darkmode');
});

// Seletores
const todoInput = document.querySelector('.input-tarefa');
const listaTarefas = document.querySelector('.lista-tarefas');

// Carrega os todos salvos ao iniciar a página
document.addEventListener('DOMContentLoaded', loadTodos);

// Adiciona novo todo quando pressionar Enter
todoInput.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.keyCode === 13 || e.code === 'Enter') && todoInput.value.trim() !== '') {
        addTodo(todoInput.value);
        todoInput.value = '';
        e.preventDefault();
    }
});

function addTodo(text) {
    const div = document.createElement('div');
    div.className = 'item';
    div.innerHTML = `
        <input type="checkbox">
        <div>${text}</div>
    `;
    
    // Adiciona evento de change no checkbox
    const checkbox = div.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('change', handleCheckbox);
    
    listaTarefas.appendChild(div);
    saveTodos();
    atualizaContador(); // Atualiza contador ao adicionar item
}

// Nova função para lidar com o evento de checkbox
function handleCheckbox(e) {
    const item = e.target.closest('.item');
    if (e.target.checked) {
        item.classList.add('item-checked');
    } else {
        item.classList.remove('item-checked');
    }
    saveTodos();
    atualizaContador(); // Atualiza contador ao marcar/desmarcar item
}

function saveTodos() {
    const todos = [];
    document.querySelectorAll('.item').forEach(item => {
        todos.push({
            text: item.querySelector('div').textContent,
            completed: item.querySelector('input[type="checkbox"]').checked
        });
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(todo => {
        const div = document.createElement('div');
        div.className = `item ${todo.completed ? 'item-checked' : ''}`;
        div.innerHTML = `
            <input type="checkbox" ${todo.completed ? 'checked' : ''}>
            <div>${todo.text}</div>
        `;
        
        // Adiciona evento de change no checkbox
        const checkbox = div.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', handleCheckbox);
        
        listaTarefas.appendChild(div);
    });
    atualizaContador(); // Atualiza contador ao carregar itens
    
    // Aplica o filtro atual
    const filtroAtual = document.querySelector('.filter a.active').id;
    aplicarFiltro(filtroAtual);
}

// Função para aplicar filtros
function aplicarFiltro(filtro) {
    // Remove classe active de todos os filtros
    filtroTodos.classList.remove('active');
    filtroAtivos.classList.remove('active');
    filtroConcluidos.classList.remove('active');
    
    // Adiciona classe active ao filtro selecionado
    document.querySelector(`#${filtro}`).classList.add('active');
    
    // Aplica o filtro aos itens
    const itens = document.querySelectorAll('.item');
    itens.forEach(item => {
        switch(filtro) {
            case 'todos':
                item.style.display = 'flex';
                break;
            case 'ativos':
                item.style.display = item.classList.contains('item-checked') ? 'none' : 'flex';
                break;
            case 'concluidos':
                item.style.display = item.classList.contains('item-checked') ? 'flex' : 'none';
                break;
        }
    });
}

// Adiciona eventos de click para os filtros
filtroTodos.addEventListener('click', (e) => {
    e.preventDefault();
    aplicarFiltro('todos');
});

filtroAtivos.addEventListener('click', (e) => {
    e.preventDefault();
    aplicarFiltro('ativos');
});

filtroConcluidos.addEventListener('click', (e) => {
    e.preventDefault();
    aplicarFiltro('concluidos');
});
