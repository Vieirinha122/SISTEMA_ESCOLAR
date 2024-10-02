document.addEventListener('DOMContentLoaded', () => {
    const nomeAlunoElem = document.getElementById('nome-aluno');
    const turmaTurnoElem = document.getElementById('turma-turno');
    const matriculaElem = document.getElementById('matricula');
    const menuButtons = document.querySelectorAll('.menu-button');
    const customButton = document.querySelector('.custom-button');
    const senacLogo = document.querySelector('.senac-logo');
    const studentList = document.getElementById('student-list');
    const professorList = document.getElementById('professor-list');
  
    // Obtém as informações do aluno do localStorage
    const alunoInfo = JSON.parse(localStorage.getItem('alunoInfo'));
    if (alunoInfo) {
      nomeAlunoElem.textContent = alunoInfo.nome;
      turmaTurnoElem.textContent = alunoInfo.turma;
      matriculaElem.textContent = alunoInfo.matricula;
    }
  
    // Função para carregar os professores do banco de dados
    async function loadProfessores() {
      try {
        const response = await fetch('http://localhost:3000/api/professores'); // Rota para pegar os professores
        const professores = await response.json();
  
        professores.forEach(professor => {
          const li = document.createElement('li');
          li.innerHTML = `
            ${professor.nome} - ID: ${professor.id_professor}
            <div class="action-buttons">
              <button class="edit" onclick="editProfessor('${professor._id}', '${professor.nome}', '${professor.id_professor}')">Editar</button>
              <button class="delete" onclick="deleteProfessor('${professor._id}')">Excluir</button>
            </div>
          `;
          professorList.appendChild(li);
        });
      } catch (error) {
        console.error('Erro ao carregar professores:', error);
      }
    }
  
    loadProfessores();
  
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
  });
  
  // Função para deletar professor
  async function deleteProfessor(id) {
    try {
      if (confirm("Tem certeza que deseja excluir este professor?")) {
        const response = await fetch(`http://localhost:3000/api/professores/${id}`, {
          method: 'DELETE'
        });
        const result = await response.json();
        alert(result.message);
        location.reload(); // Recarregar a página para atualizar a lista
      }
    } catch (error) {
      console.error('Erro ao excluir professor:', error);
    }
  }
  
  // Função para editar professor
  async function editProfessor(id, currentName, currentIdProfessor) {
    try {
      const newName = prompt("Edite o nome do professor:", currentName);
      const newIdProfessor = prompt("Edite o ID do professor:", currentIdProfessor);
  
      if (newName && newIdProfessor) {
        const response = await fetch(`http://localhost:3000/api/professores/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ nome: newName, id_professor: newIdProfessor })
        });
  
        const result = await response.json();
        alert(result.message);
        location.reload(); // Recarregar a página para atualizar a lista
      }
    } catch (error) {
      console.error('Erro ao editar professor:', error);
    }
  }
  