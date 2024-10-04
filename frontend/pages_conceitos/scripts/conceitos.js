fetch('https://sistema-escolar-two.vercel.app/api/conceitos')
.then(response => response.json())
.then(data => {
  console.log('Dados da API:', data); 
  displayData(data); 
})
.catch(error => {
  console.error('Erro ao buscar os dados:', error);
  document.getElementById('data-container').innerHTML = 'Erro ao carregar dados.';
});

function displayData(data) {
const container = document.getElementById('data-container');
container.innerHTML = ''; // Limpa o container

data.forEach(aluno => {
  const alunoId = aluno.id; // Supondo que cada aluno tem um 'id' único
  container.innerHTML += `
    <div class="card" id="aluno-${alunoId}">
      <p><strong>Nome do Aluno:</strong> ${aluno.nome ?? 'N/A'}</p>
      <p><strong>Disciplina:</strong> ${aluno.disciplina ?? 'N/A'}</p>
      <p><strong>Conceito:</strong> ${aluno.conceito ?? 'N/A'}</p>
      <button onclick="deleteConceito('${alunoId}')">Excluir Conceito</button>
    </div>`;
});
}

function deleteConceito(id) {
fetch(`https://sistema-escolar-two.vercel.app/api/conceitos/${id}`, {
  method: 'DELETE',
})
.then(response => {
  if (response.ok) {
    document.getElementById(`aluno-${id}`).remove(); // Remove o elemento HTML
    console.log(`Conceito do aluno ${id} excluído com sucesso.`);
  } else {
    console.error(`Erro ao excluir conceito do aluno ${id}`);
  }
})
.catch(error => {
  console.error('Erro ao excluir conceito:', error);
});
}