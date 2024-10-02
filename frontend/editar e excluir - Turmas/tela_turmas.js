document.addEventListener('DOMContentLoaded', () => {
  const nomeAlunoElem = document.getElementById('nome-aluno');
  const turmaTurnoElem = document.getElementById('turma-turno');
  const matriculaElem = document.getElementById('matricula');
  const menuButtons = document.querySelectorAll('.menu-button');
  const customButton = document.querySelector('.custom-button');
  const senacLogo = document.querySelector('.senac-logo');
  const studentList = document.getElementById('student-list');

  // Obtém as informações do aluno do localStorage
  const alunoInfo = JSON.parse(localStorage.getItem('alunoInfo'));


  const turmaList = document.getElementById('turma-list');
  async function loadTurmas() {
    try {
        const response = await fetch('http://localhost:3000/api/turmas');
        const turmas = await response.json();

        turmas.forEach(turma => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${turma.nome} - Ano: ${turma.ano} - Semestre: ${turma.semestre}
                <div class="action-buttons">
                    <button class="edit" onclick="editTurma('${turma._id}', '${turma.nome}', '${turma.ano}', '${turma.semestre}')">Editar</button>
                    <button class="delete" onclick="deleteTurma('${turma._id}')">Excluir</button>
                </div>
            `;
            turmaList.appendChild(li);
        });
    } catch (error) {
        console.error('Erro ao carregar turmas:', error);
    }
}

loadTurmas();
});

// Função para deletar uma turma
async function deleteTurma(id) {
try {
    if (confirm("Tem certeza que deseja excluir esta turma?")) {
        const response = await fetch(`http://localhost:3000/api/turmas/${id}`, {
            method: 'DELETE'
        });
        const result = await response.json();
        alert(result.message);
        location.reload(); // Recarregar a página para atualizar a lista
    }
} catch (error) {
    console.error('Erro ao excluir turma:', error);
}
}

// Função para editar uma turma
async function editTurma(id, currentName, currentAno, currentSemestre) {
try {
    const newName = prompt("Edite o nome da turma:", currentName);
    const newAno = prompt("Edite o ano da turma:", currentAno);
    const newSemestre = prompt("Edite o semestre da turma:", currentSemestre);

    if (newName && newAno && newSemestre) {
        const response = await fetch(`http://localhost:3000/api/turmas/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome: newName, ano: newAno, semestre: newSemestre })
        });

        const result = await response.json();
        alert(result.message);
        location.reload(); // Recarregar a página para atualizar a lista
    }
} catch (error) {
    console.error('Erro ao editar turma:', error);
}
}

// Animação dos botões de menu e logotipo
setTimeout(() => {
  menuButtons.forEach((button, index) => {
      setTimeout(() => {
          button.classList.add('show');
      }, index * 100); 
  });

  setTimeout(() => {
      customButton.classList.add('show');
  }, menuButtons.length * 100 + 500); 
}, 100);

setTimeout(() => {
  senacLogo.classList.add('show');
}, menuButtons.length * 100 + 1000);
