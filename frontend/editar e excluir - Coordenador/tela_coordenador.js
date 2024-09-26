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

  const coordinatorList = document.getElementById('coordinator-list');

  // Função para carregar os coordenadores do banco de dados
  async function loadCoordinators() {
      try {
          const response = await fetch('http://localhost:3000/api/coordenadores');
          const coordinators = await response.json();

          coordinators.forEach(coordinator => {
              const li = document.createElement('li');
              li.innerHTML = `
                  ${coordinator.nome} - ID: ${coordinator.id_coordenador} - Email: ${coordinator.email}
                  <div class="action-buttons">
                      <button class="edit" onclick="editCoordinator('${coordinator._id}', '${coordinator.nome}', '${coordinator.id_coordenador}', '${coordinator.email}')">Editar</button>
                      <button class="delete" onclick="deleteCoordinator('${coordinator._id}')">Excluir</button>
                  </div>
              `;
              coordinatorList.appendChild(li);
          });
      } catch (error) {
          console.error('Erro ao carregar coordenadores:', error);
      }
  }

  loadCoordinators();
});

// Função para deletar coordenador
async function deleteCoordinator(id) {
  try {
      if (confirm("Tem certeza que deseja excluir este coordenador?")) {
          const response = await fetch(`http://localhost:3000/api/coordenadores/${id}`, {
              method: 'DELETE'
          });
          const result = await response.json();
          alert(result.message);
          location.reload(); // Recarregar a página para atualizar a lista
      }
  } catch (error) {
      console.error('Erro ao excluir coordenador:', error);
  }
}

// Função para editar coordenador
async function editCoordinator(id, currentName, currentId, currentEmail) {
  try {
      const newName = prompt("Edite o nome do coordenador:", currentName);
      const newId = prompt("Edite o ID do coordenador:", currentId);
      const newEmail = prompt("Edite o email do coordenador:", currentEmail);

      if (newName && newId && newEmail) {
          const response = await fetch(`http://localhost:3000/api/coordenadores/${id}`, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ nome: newName, id_coordenador: newId, email: newEmail })
          });

          const result = await response.json();
          alert(result.message);
          location.reload(); // Recarregar a página para atualizar a lista
      }
  } catch (error) {
      console.error('Erro ao editar coordenador:', error);
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
