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
        const messageDiv = document.getElementById('message');

        if (resposta.ok) {
            messageDiv.textContent = 'Conceito cadastrado com sucesso!';
            messageDiv.className = 'message success'; // Aplica estilo de sucesso
            messageDiv.style.display = 'block'; // Exibe a mensagem
        } else {
            messageDiv.textContent = `Erro: ${resultado.error}`;
            messageDiv.className = 'message error'; // Aplica estilo de erro
            messageDiv.style.display = 'block'; // Exibe a mensagem
        }
    } catch (error) {
        console.error('Erro ao cadastrar conceito:', error);
        document.getElementById('message').textContent = 'Erro ao cadastrar conceito';
        document.getElementById('message').style.color = 'red';
    }
}

// Adicionar evento ao formulário
document.getElementById('conceito-form').addEventListener('submit', cadastrarConceito);

// Carregar os dados dos alunos e disciplinas ao carregar a página
window.onload = carregarDados;