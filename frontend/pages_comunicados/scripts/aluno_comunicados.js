document.addEventListener('DOMContentLoaded', async () => {
    const messageDiv = document.getElementById('message');
    const tableBody = document.querySelector('#comunicados-table tbody');

    // Simulação de requisição de comunicados (substituir pela URL real do backend)
    const url = 'https://sistema-escolar-two.vercel.app/api/comunicados'; // URL da API de comunicados

    try {
        const response = await fetch(url);
        const comunicados = await response.json();

        if (comunicados.length === 0) {
            messageDiv.textContent = 'Nenhum comunicado encontrado.';
            return;
        }

        messageDiv.style.display = 'none';

        comunicados.forEach(comunicado => {
            const row = document.createElement('tr');

            const tituloCell = document.createElement('td');
            tituloCell.textContent = comunicado.titulo;
            row.appendChild(tituloCell);

            const turmaCell = document.createElement('td');
            turmaCell.textContent = comunicado.id_turma ? comunicado.id_turma.nome : 'N/A';
            row.appendChild(turmaCell);

            const professorCell = document.createElement('td');
            professorCell.textContent = comunicado.id_professor ? comunicado.id_professor.nome : 'N/A';
            row.appendChild(professorCell);

            const descricaoCell = document.createElement('td');
            descricaoCell.textContent = comunicado.descricao;
            row.appendChild(descricaoCell);

            const dataCell = document.createElement('td');
            dataCell.textContent = new Date(comunicado.data).toLocaleDateString();
            row.appendChild(dataCell);

            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Erro ao buscar comunicados:', error);
        messageDiv.textContent = 'Erro ao carregar os comunicados.';
        messageDiv.style.color = 'red';
    }
});
