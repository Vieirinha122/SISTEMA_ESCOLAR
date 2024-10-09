// Função para buscar alunos e disciplinas
async function carregarDados() {
    try {
        // Fetch Alunos
        const respostaAlunos = await fetch('https://sistema-escolar-two.vercel.app/api/alunos');
        const alunos = await respostaAlunos.json();
        const selectAluno = document.getElementById('aluno');
        alunos.forEach(aluno => {
            const option = document.createElement('option');
            option.value = aluno._id; // Valor será o ID do aluno
            option.textContent = aluno.nome; // Mostra o nome no dropdown
            selectAluno.appendChild(option);
        });

        // Fetch Disciplinas
        const respostaDisciplinas = await fetch('https://sistema-escolar-two.vercel.app/api/disciplinas');
        const disciplinas = await respostaDisciplinas.json();
        const selectDisciplina = document.getElementById('disciplina');
        disciplinas.forEach(disciplina => {
            const option = document.createElement('option');
            option.value = disciplina._id; // Valor será o ID da disciplina
            option.textContent = disciplina.nome; // Mostra o nome no dropdown
            selectDisciplina.appendChild(option);
        });
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
    }
}

// Função para enviar os dados do conceito
async function cadastrarConceito(event) {
    event.preventDefault(); // Impede o envio padrão do formulário
    const conceito = document.getElementById('conceito').value;
    const alunoId = document.getElementById('aluno').value;
    const disciplinaId = document.getElementById('disciplina').value;

    const dados = {
        conceito: conceito,
        aluno: alunoId,
        disciplina: disciplinaId
    };

    try {
        const resposta = await fetch('https://sistema-escolar-two.vercel.app/api/conceitos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });

        const resultado = await resposta.json();
        const messageDiv = document.getElementById('mensagem-sucesso'); // Atualizado para o ID correto
        const errorDiv = document.getElementById('mensagem-error'); // Mensagem de erro

        // Limpa mensagens anteriores
        messageDiv.style.display = 'none';
        errorDiv.style.display = 'none';

        if (resposta.ok) {
            messageDiv.textContent = 'Conceito cadastrado com sucesso!';
            messageDiv.className = 'mensagem-sucesso'; // Aplica estilo de sucesso
            messageDiv.style.display = 'block'; // Exibe a mensagem
        } else {
            errorDiv.textContent = `Erro: ${resultado.error}`;
            errorDiv.className = 'mensagem-error'; // Aplica estilo de erro
            errorDiv.style.display = 'block'; // Exibe a mensagem
        }
    } catch (error) {
        console.error('Erro ao cadastrar conceito:', error);
        const errorDiv = document.getElementById('mensagem-error');
        errorDiv.textContent = 'Erro ao cadastrar conceito';
        errorDiv.className = 'mensagem-error'; // Aplica estilo de erro
        errorDiv.style.display = 'block'; // Exibe a mensagem
    }
}

// Adicionar evento ao formulário
document.getElementById('cadastro-conceito').addEventListener('submit', cadastrarConceito);

// Carregar os dados dos alunos e disciplinas ao carregar a página
window.onload = carregarDados;
