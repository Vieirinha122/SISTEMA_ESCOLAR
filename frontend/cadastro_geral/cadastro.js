function openForm(formId) {
    const forms = document.querySelectorAll('.form-container');
    const buttons = document.querySelectorAll('.tab-button');

    forms.forEach(form => {
        form.style.display = 'none';
    });

    buttons.forEach(button => {
        button.classList.remove('active');
    });

    document.getElementById(formId).style.display = 'block';
    event.target.classList.add('active');
}

// Exibe o formulário de alunos por padrão
document.getElementById('aluno-form').style.display = 'block';

const turmaSelect = document.getElementById('turma-aluno');

// Função para carregar as turmas e preencher o campo de seleção
async function loadTurmas() {
    try {
        const response = await fetch('https://sistema-escolar-two.vercel.app/api/turmas');
        const turmas = await response.json();

        // Limpar opções existentes no select antes de adicionar novas
        turmaSelect.innerHTML = ''; 

        // Adiciona uma opção padrão
        const defaultOption = document.createElement('option');
        defaultOption.value = ''; // Valor vazio para a opção padrão
        defaultOption.textContent = 'Selecione uma turma';
        turmaSelect.appendChild(defaultOption);

        turmas.forEach(turma => {
            const option = document.createElement('option');
            option.value = turma._id; // O valor que será enviado na requisição
            option.textContent = turma.nome; // Apenas o nome da turma
            turmaSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Erro ao carregar turmas:', error);
    }
}



// Função para adicionar um aluno
function adicionarAluno(event) {
    event.preventDefault();

    const nome = document.getElementById('nome-aluno').value;
    const matricula = document.getElementById('matricula-aluno').value;
    const email = document.getElementById('email-aluno').value;
    const turma = document.getElementById('turma-aluno').value;  // O ObjectId da turma será o valor selecionado
    const turno = document.getElementById('turno-aluno').value;  // O ObjectId da turma será o valor selecionado
    const senha = document.getElementById('senha-aluno').value;  // O ObjectId da turma será o valor selecionado

    const alunoData = {
        nome: nome,
        matricula: matricula,
        email: email,
        turma: turma,  
        turno: turno,  
        senha: senha  
    };

    fetch('https://sistema-escolar-two.vercel.app/api/alunos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(alunoData)
    })
    .then(response => response.json())
    .then(data => {
        alert('Aluno cadastrado com sucesso!');
        console.log(data);
    })
    .catch(error => {
        console.error('Erro ao cadastrar aluno:', error);
    });
}

// Função para adicionar um professor
function adicionarProfessor(event) {
    event.preventDefault();

    const nome = document.getElementById('nome-professor').value;
    const email = document.getElementById('email-professor').value;
    const senha = document.getElementById('senha-professor').value;
    const disciplina = document.getElementById('disciplina-professor').value;
    const id_professor = document.getElementById('id_professor').value;

    const professorData = {
        nome: nome,
        email: email,
        senha: senha,
        disciplinas: disciplina,
        id_professor: id_professor
    };

    fetch('https://sistema-escolar-two.vercel.app/api/professores', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(professorData)
    })
    .then(response => response.json())
    .then(data => {
        alert('Professor cadastrado com sucesso!');
        console.log(data);
    })
    .catch(error => {
        console.error('Erro ao cadastrar professor:', error);
    });
}

// Função para adicionar um coordenador
function adicionarCoordenador(event) {
    event.preventDefault();

    const nome = document.getElementById('nome_coordenador').value;
    const email = document.getElementById('email-coordenador').value;
    const senha = document.getElementById('senha-coordenador').value;
    const id_coordenador = document.getElementById('id_coordenador').value;

    // Verifique os valores capturados
    console.log({ nome, email, senha, id_coordenador });

    const coordenadorData = {
        nome: nome,
        email: email,
        senha: senha,
        id_coordenador: id_coordenador
    };

    fetch('https://sistema-escolar-two.vercel.app/api/coordenadores', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(coordenadorData)
    })
    .then(response => response.json())
    .then(data => {
        alert('Coordenador cadastrado com sucesso!');
        console.log(data);
    })
    .catch(error => {
        console.error('Erro ao cadastrar coordenador:', error);
    });
}
// Ligar os formulários às suas funções de submit
document.querySelector('#aluno-form form').addEventListener('submit', adicionarAluno);
document.querySelector('#professor-form form').addEventListener('submit', adicionarProfessor);
document.querySelector('#coordenador-form form').addEventListener('submit', adicionarCoordenador);
// Chame a função para carregar as turmas ao carregar a página ou quando necessário
loadTurmas();
// Lógica para abrir e fechar a sidebar
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('active');
}

// Seleciona os elementos do DOM
const menuToggle = document.querySelector('.menu-toggle'); // Altere para a classe correta do seu botão
const sidebar = document.querySelector('.sidebar'); // Altere para a classe correta da sua sidebar

// Adiciona um listener de evento para o clique
menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open'); // Adiciona ou remove a classe 'open'
});

