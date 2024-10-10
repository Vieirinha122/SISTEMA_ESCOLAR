document.addEventListener('DOMContentLoaded', () => {
    const turmaSelect = document.getElementById('turma');
    const alunoSelect = document.getElementById('aluno');
    const disciplinaSelect = document.getElementById('disciplina');
    const conceitoInput = document.getElementById('conceito');
    const mensagemErro = document.getElementById('mensagem-erro');
    const alunosContainer = document.getElementById('alunos-container');
    const confirmarBtn = document.getElementById('confirmar-btn');

    // Função para exibir erro
    function mostrarErro(mensagem) {
        mensagemErro.textContent = mensagem;
        mensagemErro.style.display = 'block';
    }

    // Função para esconder erro
    function esconderErro() {
        mensagemErro.style.display = 'none';
    }

    // Função para buscar turmas
    function carregarTurmas() {
        fetch('https://sistema-escolar-two.vercel.app/api/turmas')
            .then(response => response.json())
            .then(data => {
                turmaSelect.innerHTML = '<option value="">Selecione uma turma</option>';
                data.forEach(turma => {
                    turmaSelect.innerHTML += `<option value="${turma._id}">${turma.nome}</option>`;
                });
            })
            .catch(error => {
                mostrarErro('Erro ao carregar as turmas.');
            });
    }

    // Função para buscar alunos da turma
    function carregarAlunos(turmaId) {
        fetch(`https://sistema-escolar-two.vercel.app/api/alunos?turma=${turmaId}`)
            .then(response => response.json())
            .then(data => {
                alunoSelect.innerHTML = '<option value="">Selecione um aluno</option>';
                data.forEach(aluno => {
                    alunoSelect.innerHTML += `<option value="${aluno._id}">${aluno.nome}</option>`;
                });
                alunosContainer.style.display = 'block';
            })
            .catch(error => {
                mostrarErro('Erro ao carregar os alunos.');
            });
    }

    // Função para buscar disciplinas da turma
    function carregarDisciplinas(turmaId) {
        fetch(`https://sistema-escolar-two.vercel.app/api/turmas/${turmaId}`)
            .then(response => response.json())
            .then(turma => {
                disciplinaSelect.innerHTML = '<option value="">Selecione uma disciplina</option>';
                turma.disciplinas.forEach(disciplinaId => {
                    fetch(`https://sistema-escolar-two.vercel.app/api/disciplinas/${disciplinaId}`)
                        .then(response => response.json())
                        .then(disciplina => {
                            disciplinaSelect.innerHTML += `<option value="${disciplina._id}">${disciplina.nome}</option>`;
                        })
                        .catch(error => {
                            mostrarErro('Erro ao carregar as disciplinas.');
                        });
                });
            })
            .catch(error => {
                mostrarErro('Erro ao carregar as disciplinas da turma.');
            });
    }

    // Função para enviar o conceito
    function enviarConceito() {
        esconderErro();

        const alunoId = alunoSelect.value;
        const disciplinaId = disciplinaSelect.value;
        const conceito = conceitoInput.value;

        // Verificar se todas as informações foram preenchidas
        if (!alunoId || !disciplinaId || !conceito) {
            mostrarErro('Por favor, preencha todas as informações.');
            return;
        }

        // Enviar os dados para a API
        fetch('https://sistema-escolar-two.vercel.app/api/conceitos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                conceito: conceito,
                aluno: alunoId,
                disciplina: disciplinaId,
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao salvar o conceito.');
            }
            return response.json();
        })
        .then(data => {
            alert('Conceito cadastrado com sucesso!');
            // Limpar os campos após o envio
            alunoSelect.value = '';
            disciplinaSelect.value = '';
            conceitoInput.value = '';
        })
        .catch(error => {
            mostrarErro('Erro ao salvar o conceito.');
        });
    }

    // Evento ao selecionar uma turma
    turmaSelect.addEventListener('change', () => {
        const turmaId = turmaSelect.value;
        if (turmaId) {
            carregarAlunos(turmaId);
            carregarDisciplinas(turmaId);
        } else {
            alunoSelect.innerHTML = '<option value="">Selecione um aluno</option>';
            disciplinaSelect.innerHTML = '<option value="">Selecione uma disciplina</option>';
            alunosContainer.style.display = 'none';
        }
    });

    // Evento de clique no botão confirmar
    confirmarBtn.addEventListener('click', enviarConceito);

    // Carregar as turmas ao carregar a página
    carregarTurmas();
});
