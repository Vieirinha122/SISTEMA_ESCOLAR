// Função para exibir alerta ao enviar o formulário de recuperação de senha
document.getElementById("resetPasswordForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Impede o envio do formulário

    const email = document.getElementById("email").value; // Pega o valor do campo de email

    if (email) {
        alert(`Instruções foram enviadas para o email: ${email}`);
    } else {
        alert("Por favor, insira um email válido.");
    }
});

// Função para alternar entre campos de matrícula e email dependendo do cargo selecionado
document.getElementById('cargo').addEventListener('change', function () {
    const cargo = this.value;
    const matriculaContainer = document.getElementById('matriculaContainer');
    const emailContainer = document.getElementById('emailContainer');

    if (cargo === 'professor' || cargo === 'coordenador') {
        matriculaContainer.style.display = 'none';
        emailContainer.style.display = 'block';
    } else {
        matriculaContainer.style.display = 'block';
        emailContainer.style.display = 'none';
    }
});

// Função para login baseado no cargo
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
    
    const cargo = document.getElementById('cargo').value;
    const identifier = cargo === 'aluno' ? document.getElementById('matricula').value : document.getElementById('email').value;
    const password = document.getElementById('senha').value;
    const errorMessage = document.getElementById('message');

    let apiUrl;
    if (cargo === 'aluno') {
        apiUrl = 'https://sistema-escolar-two.vercel.app/api/alunos';
    } else if (cargo === 'professor') {
        apiUrl = 'https://sistema-escolar-two.vercel.app/api/professores';
    } else if (cargo === 'coordenador') {
        apiUrl = 'https://sistema-escolar-two.vercel.app/api/coordenadores';
    }

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data); // Verifique a estrutura do dado retornado
            const user = data.find(user => user.matricula === identifier || user.email === identifier);
            if (user && user.senha === password) {
                alert('Login bem-sucedido!');
                
                // Salvar as informações no localStorage dependendo do cargo
                if (cargo === 'aluno') {
                    const alunoInfo = {
                        nome: user.nome,
                        turma: user.turma,
                        turno: user.turno,
                        matricula: user.matricula
                    };
                    localStorage.setItem('alunoInfo', JSON.stringify(alunoInfo));
                    window.location.href = '/frontend/tela_aluno/tela_aluno.html';
                } else if (cargo === 'professor') {
                    const professorInfo = {
                        nome: user.nome,
                        email: user.email,
                        disciplina: user.disciplina,
                        matricula: user.matricula // Se necessário
                    };
                    localStorage.setItem('professorInfo', JSON.stringify(professorInfo));
                    window.location.href = '/frontend/tela_professor/tela_professor.html';
                } else if (cargo === 'coordenador') {
                    const coordenadorInfo = {
                        nome: user.nome,
                        email: user.email,
                        setor: user.setor
                    };
                    localStorage.setItem('coordenadorInfo', JSON.stringify(coordenadorInfo));
                    window.location.href = '/frontend/tela_coordenador/tela_coordenador.html';
                }
            } else {
                console.log('Usuário ou senha incorretos.'); // Log para debug
                alert('Usuário ou senha incorretos.');
                errorMessage.textContent = 'Usuário ou senha incorretos.';
                errorMessage.classList.remove('hidden');
            }
        })
        .catch(error => {
            console.error('Erro ao realizar o login:', error);
            errorMessage.textContent = 'Erro ao realizar o login. Tente novamente mais tarde.';
            errorMessage.classList.remove('hidden');
        });
});
