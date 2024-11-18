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

// Função para calcular a média e o resultado automaticamente
function calcularMedia() {
    const AV1 = parseFloat(document.getElementById('AV1').value);
    const AV2 = parseFloat(document.getElementById('AV2').value);
    const MU = parseFloat(document.getElementById('MU').value);
    const NOA = parseFloat(document.getElementById('NOA').value);

    // Verifica se as notas estão todas preenchidas
    if (isNaN(AV1) || isNaN(AV2) || isNaN(MU) || isNaN(NOA)) {
        document.getElementById('MF').value = '';
        document.getElementById('resultado').value = '';
        return;
    }

    // Calcula a Média Final (MF)
    const mediaFinal = (AV1 + AV2 + MU + NOA) / 4;
    document.getElementById('MF').value = mediaFinal.toFixed(2); // Exibe a média final

    // Determina o resultado (Aprovado/Reprovado)
    const resultado = mediaFinal >= 6 ? 'Aprovado' : 'Reprovado';
    document.getElementById('resultado').value = resultado;

    // Exibe a cor de acordo com o resultado
    const resultadoInput = document.getElementById('resultado');
    if (resultado === 'Aprovado') {
        resultadoInput.style.backgroundColor = 'lightgreen';
    } else {
        resultadoInput.style.backgroundColor = 'lightcoral';
    }
}

// Função para enviar os dados do conceito
async function cadastrarConceito(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const AV1 = parseFloat(document.getElementById('AV1').value);
    const AV2 = parseFloat(document.getElementById('AV2').value);
    const MU = parseFloat(document.getElementById('MU').value);
    const NOA = parseFloat(document.getElementById('NOA').value);
    const alunoId = document.getElementById('aluno').value;
    const disciplinaId = document.getElementById('disciplina').value;

    // Calcula a Média Final e o Resultado
    const resultadoCalculo = calcularMedia();
    if (!resultadoCalculo) {
        alert("Preencha todas as notas corretamente.");
        return;
    }

    const { mediaFinal, resultado } = resultadoCalculo;

    const dados = {
        AV1: AV1,
        AV2: AV2,
        MU: MU,
        NOA: NOA,
        MF: mediaFinal,
        resultado: resultado,
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

        const resultadoResposta = await resposta.json();
        const messageDiv = document.getElementById('mensagem-sucesso');
        const errorDiv = document.getElementById('mensagem-error');

        // Limpa mensagens anteriores
        messageDiv.style.display = 'none';
        errorDiv.style.display = 'none';

        if (resposta.ok) {
            messageDiv.textContent = 'Conceito cadastrado com sucesso!';
            messageDiv.className = 'mensagem-sucesso';
            messageDiv.style.display = 'block';
        } else {
            errorDiv.textContent = `Erro: ${resultadoResposta.error}`;
            errorDiv.className = 'mensagem-error';
            errorDiv.style.display = 'block';
        }
    } catch (error) {
        console.error('Erro ao cadastrar conceito:', error);
        const errorDiv = document.getElementById('mensagem-error');
        errorDiv.textContent = 'Erro ao cadastrar conceito';
        errorDiv.className = 'mensagem-error';
        errorDiv.style.display = 'block';
    }
}

// Adicionar evento ao formulário
document.getElementById('cadastro-conceito').addEventListener('submit', cadastrarConceito);

// Adicionar evento para calcular a média automaticamente
document.getElementById('AV1').addEventListener('input', calcularMedia);
document.getElementById('AV2').addEventListener('input', calcularMedia);
document.getElementById('MU').addEventListener('input', calcularMedia);
document.getElementById('NOA').addEventListener('input', calcularMedia);

// Carregar os dados dos alunos e disciplinas ao carregar a página
window.onload = carregarDados;
