const apiUrl = 'https://sistema-escolar-two.vercel.app/api'; // Ajuste conforme necessário

// Função para listar comunicados
// Função para listar comunicados
function listarComunicados() {
    fetch(`${apiUrl}/comunicados`)
        .then(response => response.json())
        .then(data => {
            const comunicadosBody = document.getElementById('comunicados-body');
            comunicadosBody.innerHTML = ''; // Limpa a tabela antes de preencher

            data.forEach(comunicado => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${comunicado.titulo}</td>
                    <td>${comunicado.descricao}</td>
                    <td>${comunicado.data}</td>
                    <td>
                        <button class="btn-editar" onclick="editarComunicado('${comunicado._id}')">Editar</button>
                        <button class="btn-excluir" onclick="excluirComunicado('${comunicado._id}')">Excluir</button>
                    </td>
                `;
                comunicadosBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Erro ao listar comunicados:', error);
            document.getElementById('message').textContent = 'Erro ao carregar comunicados';
        });
};

// Função para editar um comunicado
function editarComunicado(id) {
    const novoTitulo = prompt("Novo Título:");
    const novaDescricao = prompt("Nova Descrição:");
    const novaData = prompt("Nova Data (DD/MM/AAAA):");

    if (novoTitulo && novaDescricao && novaData) {
        const comunicadoEditado = {
            titulo: novoTitulo,
            descricao: novaDescricao,
            data: novaData,
        };

        fetch(`${apiUrl}/comunicados/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(comunicadoEditado),
        })
        .then(response => {
            if (response.ok) {
                alert('Comunicado atualizado com sucesso!');
                listarComunicados(); // Atualiza a lista após edição
            } else {
                alert('Erro ao atualizar comunicado');
            }
        })
        .catch(error => {
            console.error('Erro:', error);
        });
    }
}

// Função para excluir um comunicado
function excluirComunicado(id) {
    if (confirm('Tem certeza que deseja excluir este comunicado?')) {
        fetch(`${apiUrl}/comunicados/${id}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                alert('Comunicado excluído com sucesso!');
                listarComunicados(); // Atualiza a lista após exclusão
            } else {
                alert('Erro ao excluir comunicado');
            }
        })
        .catch(error => {
            console.error('Erro:', error);
        });
    }
}

// Chama a função para listar comunicados ao carregar a página
window.onload = listarComunicados;

const menuToggle = document.querySelector('.menu-toggle'); // Altere para a classe correta do seu botão
const sidebar = document.querySelector('.sidebar'); // Altere para a classe correta da sua sidebar

// Adiciona um listener de evento para o clique
menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open'); // Adiciona ou remove a classe 'open'
});