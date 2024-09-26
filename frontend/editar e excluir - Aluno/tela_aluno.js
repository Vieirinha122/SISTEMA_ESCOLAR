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

  // Função para carregar os alunos do banco de dados
  async function loadStudents() {
      try {
          const response = await fetch('http://localhost:3000/api/alunos'); // Rota atualizada para pegar os alunos
          const students = await response.json();
  
          students.forEach(student => {
              const li = document.createElement('li');
              li.innerHTML = `
                  ${student.nome} - Turma: ${student.turma} - Turno: ${student.turno}
                  <div class="action-buttons">
                      <button class="edit" onclick="editStudent('${student._id}', '${student.nome}', '${student.turma}', '${student.turno}')">Editar</button>
                      <button class="delete" onclick="deleteStudent('${student._id}')">Excluir</button>
                  </div>
              `;
              studentList.appendChild(li);
          });
      } catch (error) {
          console.error('Erro ao carregar alunos:', error);
      }
  }

  loadStudents();
});

// Função para deletar aluno
async function deleteStudent(id) {
  try {
      if (confirm("Tem certeza que deseja excluir este aluno?")) {
          const response = await fetch(`http://localhost:3000/api/alunos/${id}`, { // Corrigido para usar aspas
              method: 'DELETE'
          });
          const result = await response.json();
          alert(result.message);
          location.reload(); // Recarregar a página para atualizar a lista
      }
  } catch (error) {
      console.error('Erro ao excluir aluno:', error);
  }
}

// Função para editar aluno
async function editStudent(id, currentName, currentTurma, currentTurno) {
  try {
      const newName = prompt("Edite o nome do aluno:", currentName);
      const newTurma = prompt("Edite a turma do aluno:", currentTurma);
      const newTurno = prompt("Edite o turno do aluno:", currentTurno);
  
      if (newName && newTurma && newTurno) {
          const response = await fetch(`http://localhost:3000/api/alunos/${id}`, { // Corrigido para usar aspas
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ nome: newName, turma: newTurma, turno: newTurno })
          });
  
          const result = await response.json();
          alert(result.message);
          location.reload(); // Recarregar a página para atualizar a lista
      }
  } catch (error) {
      console.error('Erro ao editar aluno:', error);
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
