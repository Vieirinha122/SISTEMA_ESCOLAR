document.addEventListener('DOMContentLoaded', () => {
    // Função para carregar professores
    async function carregarProfessores() {
        const response = await fetch('https://sistema-escolar-two.vercel.app/api/professores');
        const professores = await response.json();
        
        const selectProfessores = document.getElementById('professores');
        selectProfessores.innerHTML = '<option value="">Selecione um professor</option>'; // Placeholder

        professores.forEach(professor => {
            const option = document.createElement('option');
            option.value = professor.id; 
            option.textContent = professor.nome; 
            selectProfessores.appendChild(option);
        });
    }

    // Função para carregar turmas e disciplinas
    async function carregarTurmasEDisciplinas(professorId) {
        const response = await fetch(`https://sistema-escolar-two.vercel.app/api/turmas?professorId=${professorId}`);
        const turmas = await response.json();
        
        const selectTurmas = document.getElementById('turmas');
        selectTurmas.innerHTML = '<option value="">Selecione uma turma</option>'; // Placeholder

        if (turmas.length === 0) {
            selectTurmas.innerHTML = '<option value="">Nenhuma turma disponível</option>';
            return;
        }

        turmas.forEach(turma => {
            const option = document.createElement('option');
            option.value = turma.id; 
            option.textContent = turma.nome;
            selectTurmas.appendChild(option);
        });
    }

    // Função para carregar disciplinas
    async function carregarDisciplinas(turmaId) {
        const response = await fetch(`https://sistema-escolar-two.vercel.app/api/disciplinas?turmaId=${turmaId}`);
        const disciplinas = await response.json();
        
        const selectDisciplinas = document.getElementById('disciplinas');
        selectDisciplinas.innerHTML = '<option value="">Selecione uma disciplina</option>'; // Placeholder

        if (disciplinas.length === 0) {
            selectDisciplinas.innerHTML = '<option value="">Nenhuma disciplina disponível</option>';
            return;
        }

        disciplinas.forEach(disciplina => {
            const option = document.createElement('option');
            option.value = disciplina.id; 
            option.textContent = disciplina.nome;
            selectDisciplinas.appendChild(option);
        });
    }

    // Função para carregar alunos da turma selecionada
    async function carregarAlunos(turmaId) {
        const response = await fetch(`https://sistema-escolar-two.vercel.app/api/alunos?turmaId=${turmaId}`);
        const alunos = await response.json();
        
        const tableBody = document.getElementById('notas-table').getElementsByTagName('tbody')[0];
        tableBody.innerHTML = ''; // Limpar a tabela de alunos anterior

        alunos.forEach(aluno => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${aluno.nome}</td>
                <td contenteditable="true"></td>
                <td contenteditable="true"></td>
                <td contenteditable="true"></td>
                <td contenteditable="true"></td>
                <td contenteditable="true"></td>
                <td contenteditable="true"></td>
                <td contenteditable="true"></td>
                <td contenteditable="true"></td>
                <td contenteditable="true"></td>
                <td contenteditable="true"></td>
                <td contenteditable="true"></td>
                <td contenteditable="true"></td>
                <td id="mf-${aluno.id}"></td>
                <td id="mf-noa-${aluno.id}"></td>
                <td id="resultado-${aluno.id}"></td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Função para calcular as notas
    function calcularNotas() {
        const table = document.getElementById('notas-table');
        const rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
        
        for (let i = 0; i < rows.length; i++) {
            const cells = rows[i].getElementsByTagName('td');
            
            let somaNotas = 0;
            let quantidadeNotas = 0;
            
            // Itera pelas colunas de notas (sem contar a coluna de aluno e as últimas colunas de resultado)
            for (let j = 1; j < cells.length - 3; j++) {
                const nota = parseFloat(cells[j].innerText);
                
                if (!isNaN(nota)) {
                    somaNotas += nota; // Soma as notas
                    quantidadeNotas++;
                }
            }
            
            // Cálculo da média final (MF)
            const mediaFinal = (quantidadeNotas > 0) ? (somaNotas / 12).toFixed(2) : ''; // Divide a soma total por 12
            cells[cells.length - 3].innerText = mediaFinal;
            
            // Cálculo de MF/NOA (neste caso, só copiando a média para a coluna)
            cells[cells.length - 2].innerText = mediaFinal;
            
            // Definindo o resultado (Aprovado/Reprovado)
            if (mediaFinal) {
                cells[cells.length - 1].innerText = mediaFinal >= 7 ? 'Aprovado' : 'Reprovado';
            }
        }
    }

    // Eventos ao selecionar um professor
    document.getElementById('professores').addEventListener('change', (event) => {
        const professorId = event.target.value;
        
        // Limpar turmas e disciplinas
        document.getElementById('turmas').innerHTML = '<option value="">Selecione uma turma</option>';
        document.getElementById('disciplinas').innerHTML = '<option value="">Selecione uma disciplina</option>';
        document.getElementById('notas-table').getElementsByTagName('tbody')[0].innerHTML = ''; // Limpar alunos e notas
        
        if (professorId) {
            carregarTurmasEDisciplinas(professorId);
        }
    });

    // Evento ao selecionar uma turma
    document.getElementById('turmas').addEventListener('change', (event) => {
        const turmaId = event.target.value;
        
        // Limpar disciplinas e alunos
        document.getElementById('disciplinas').innerHTML = '<option value="">Selecione uma disciplina</option>';
        document.getElementById('notas-table').getElementsByTagName('tbody')[0].innerHTML = ''; // Limpar alunos e notas
        
        if (turmaId) {
            carregarDisciplinas(turmaId);
            carregarAlunos(turmaId); // Carregar os alunos da turma selecionada
        }
    });

    // Cálculo das notas
    document.getElementById('calcular-notas').addEventListener('click', calcularNotas);

    // Carregar professores quando a página carregar
    carregarProfessores();
});
