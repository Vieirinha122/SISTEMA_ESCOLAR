const cadastrarUsuarioBtn = document.getElementById('cadastrarUsuario');
const dropdown = document.getElementById('dropdown');

// Exibir o dropdown ao clicar no botão
cadastrarUsuarioBtn.addEventListener('click', () => {
    const dropdownVisible = dropdown.style.display === 'block';
    dropdown.style.display = dropdownVisible ? 'none' : 'block'; // Alterna a visibilidade do dropdown
    dropdown.style.width = `${cadastrarUsuarioBtn.offsetWidth}px`; // Ajusta a largura do dropdown para ser a mesma do botão
});

const dropdownItems = document.querySelectorAll('.dropdown-item');
dropdownItems.forEach(item => {
    item.addEventListener('click', () => {
        const selectedOption = item.textContent;
        // Mudar o texto do botão com a opção selecionada
        cadastrarUsuarioBtn.textContent = `Cadastrar ${selectedOption}`;
        
        // Redirecionar para a tela correspondente
        if (selectedOption === 'Cadastrar Aluno') {
            window.location.href = 'cadastrar_aluno.html'; // Substitua pelo caminho da sua tela de cadastro de aluno
        } else if (selectedOption === 'Cadastrar Professor') {
            window.location.href = 'cadastrar_professor.html'; // Substitua pelo caminho da sua tela de cadastro de professor
        }

        dropdown.style.display = 'none'; // Fecha o dropdown após a seleção
    });
});

// Fecha o dropdown se clicar fora dele
document.addEventListener('click', (event) => {
    if (!cadastrarUsuarioBtn.contains(event.target) && !dropdown.contains(event.target)) {
        dropdown.style.display = 'none';
    }
});

// Exibir animações dos botões
document.querySelectorAll('.menu-button, .custom-button').forEach(button => {
    button.classList.add('show');
});
