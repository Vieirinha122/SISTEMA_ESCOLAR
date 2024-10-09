// Função para alternar entre as tabelas
function openTable(tableId) {
    const tables = document.getElementsByClassName('table-container');
    for (let i = 0; i < tables.length; i++) {
        tables[i].style.display = 'none';
    }
    document.getElementById(tableId).style.display = 'block';
}

// Função para buscar e listar alunos
async function listarAlunos() {
    const response = await fetch('https://sistema-escolar-two.vercel.app/api/alunos');
    const alunos = await response.json();
    const tableBody = document.getElementById('table-alunos').querySelector('tbody');
    tableBody.innerHTML = ''; // Limpa a tabela antes de preenchê-la novamente

    alunos.forEach(aluno => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${aluno.nome}</td>
            <td>${aluno.matricula}</td>
            <td>${aluno.email}</td>
            <td>${aluno.turno}</td>
            <td>
                <button onclick="editarUsuario('${aluno._id}', 'aluno')">Editar</button>
                <button onclick="excluirUsuario('${aluno._id}', 'aluno')">Excluir</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Função para buscar e listar professores
async function listarProfessores() {
    try {
        // Faz a requisição para obter os professores
        const responseProfessores = await fetch('https://sistema-escolar-two.vercel.app/api/professores');
        const professores = await responseProfessores.json();
        
        // Faz a requisição para obter as disciplinas
        const responseDisciplinas = await fetch('https://sistema-escolar-two.vercel.app/api/disciplinas'); // Supondo que você tenha essa rota
        const disciplinas = await responseDisciplinas.json();
        
        // Seleciona o corpo da tabela
        const tableBody = document.getElementById('table-professores').querySelector('tbody');
        tableBody.innerHTML = ''; // Limpa a tabela antes de preenchê-la novamente

        // Itera sobre os professores para preencher a tabela
        professores.forEach(professor => {
            // Encontra a disciplina correspondente ao professor
            const disciplinaEncontrada = disciplinas.find(disciplina => disciplina._id === professor.disciplina); // Supondo que professor.disciplina seja o ID da disciplina
            const nomeDisciplina = disciplinaEncontrada ? disciplinaEncontrada.nome : 'Sem Disciplina'; // Se não encontrar, exibe 'Sem Disciplina'

            // Cria uma nova linha na tabela
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${professor.nome}</td>
                <td>${professor.email}</td>
                <td>${nomeDisciplina}</td>
                <td>${professor.id_professor}</td>
                <td>
                    <button onclick="editarUsuario('${professor._id}', 'professor')">Editar</button>
                    <button onclick="excluirUsuario('${professor._id}', 'professor')">Excluir</button>
                </td>
            `;

            // Adiciona a linha à tabela
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Erro ao listar professores:', error);
    }
}

// Função para buscar e listar coordenadores
async function listarCoordenadores() {
    const response = await fetch('https://sistema-escolar-two.vercel.app/api/coordenadores');
    const coordenadores = await response.json();
    const tableBody = document.getElementById('table-coordenadores').querySelector('tbody');
    tableBody.innerHTML = ''; // Limpa a tabela antes de preenchê-la novamente

    coordenadores.forEach(coordenador => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${coordenador.nome}</td>
            <td>${coordenador.email}</td>
            <td>${coordenador.id_coordenador}</td>
            <td>
                <button onclick="editarUsuario('${coordenador._id}', 'coordenador')">Editar</button>
                <button onclick="excluirUsuario('${coordenador._id}', 'coordenador')">Excluir</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Função para excluir um usuário
async function excluirUsuario(id, userType) {
    const userTypeMap = {
        aluno: 'alunos',
        professor: 'professores',
        coordenador: 'coordenadores'
    };

    const apiUrl = `https://sistema-escolar-two.vercel.app/api/${userTypeMap[userType]}/${id}`;

    try {
        const response = await fetch(apiUrl, { method: 'DELETE' });
        if (response.ok) {
            alert(`${userType} excluído com sucesso!`);
            // Recarregar a lista após a exclusão
            if (userType === 'aluno') listarAlunos();
            if (userType === 'professor') listarProfessores();
            if (userType === 'coordenador') listarCoordenadores();
        } else {
            alert('Erro ao excluir o usuário.');
        }
    } catch (error) {
        console.error('Erro ao excluir:', error);
    }
}

// Função para editar um usuário (exemplo básico)
async function editarUsuario(id, userType) {
    const novoNome = prompt(`Digite o novo nome para o ${userType}:`);

    if (novoNome) {
        const userTypeMap = {
            aluno: 'alunos',
            professor: 'professores',
            coordenador: 'coordenadores'
        };

        const apiUrl = `https://sistema-escolar-two.vercel.app/api/${userTypeMap[userType]}/${id}`;

        try {
            const response = await fetch(apiUrl, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome: novoNome })
            });

            if (response.ok) {
                alert(`${userType} atualizado com sucesso!`);
                // Recarregar a lista após a edição
                if (userType === 'aluno') listarAlunos();
                if (userType === 'professor') listarProfessores();
                if (userType === 'coordenador') listarCoordenadores();
            } else {
                alert('Erro ao atualizar o usuário.');
            }
        } catch (error) {
            console.error('Erro ao editar:', error);
        }
    }
}

// Carregar as listas automaticamente quando a página for carregada
document.addEventListener('DOMContentLoaded', function () {
    listarAlunos();
    listarProfessores();
    listarCoordenadores();
});
