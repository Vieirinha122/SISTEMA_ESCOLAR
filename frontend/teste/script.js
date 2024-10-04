document.getElementById('cargo').addEventListener('change', function () {
    const selectedValue = this.value;
    const matriculaContainer = document.getElementById('matriculaContainer');
    const emailContainer = document.getElementById('emailContainer');
    
    if (selectedValue === 'estudante') {
        matriculaContainer.style.display = 'block';
        emailContainer.style.display = 'none';
    } else {
        matriculaContainer.style.display = 'none';
        emailContainer.style.display = 'block';
    }
});

document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Impede o envio padrão do formulário

    const matricula = document.getElementById('matricula').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const message = document.getElementById('message');
    const cargo = document.getElementById('cargo').value;

    try {
        const response = await fetch(cargo === 'estudante' 
            ? 'https://sistema-escolar-two.vercel.app/api/alunos' 
            : 'https://sistema-escolar-two.vercel.app/api/professores');
        const dados = await response.json();

        let user;
        if (cargo === 'estudante') {
            user = dados.find(aluno => aluno.matricula === matricula && aluno.senha === senha);
        } else {
            user = dados.find(professor => professor.email === email && professor.senha === senha);
        }

        if (user) {
            localStorage.setItem(cargo === 'estudante' ? 'alunoInfo' : 'professorInfo', JSON.stringify(user));
            window.location.href = cargo === 'estudante' ? '/frontend/tela_aluno/tela_aluno.html' : '/frontend/tela_professor/tela_professor.html';
        } else {
            message.textContent = 'O nome de usuário ou a senha está incorreto. Tente novamente.';
            message.classList.add('error-message');
        }
    } catch (error) {
        message.textContent = 'Erro ao acessar a API.';
        message.classList.add('error-message');
        console.error('Erro:', error);
    }
});
