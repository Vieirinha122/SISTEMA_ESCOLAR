const conceitosTableBody = document.getElementById('conceitos-table-body');
        // Função para carregar conceitos
        async function carregarConceitos() {
            try {
                const response = await fetch('https://sistema-escolar-two.vercel.app/api/conceitos'); // Altere para o seu endpoint de conceitos
                const conceitos = await response.json();

                // Limpa a tabela antes de preencher
                conceitosTableBody.innerHTML = '';

                conceitos.forEach(conceito => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${conceito.aluno.nome}</td>
                        <td>${conceito.disciplina.nome}</td>
                        <td>${conceito.conceito}</td>
                        <td>
                            <button onclick="editarConceito('${conceito._id}')">Editar</button>
                            <button onclick="excluirConceito('${conceito._id}')">Excluir</button>
                        </td>
                    `;
                    conceitosTableBody.appendChild(row);
                });
            } catch (error) {
                console.error('Erro ao carregar conceitos:', error);
            }
        }

        // Função para editar conceito
        function editarConceito(id) {
            const novoConceito = prompt("Digite o novo conceito:");
            if (novoConceito !== null) {
                atualizarConceito(id, novoConceito);
            }
        }

        // Função para atualizar conceito no backend
        async function atualizarConceito(id, novoConceito) {
            try {
                const response = await fetch(`https://sistema-escolar-two.vercel.app/api/conceitos/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ conceito: Number(novoConceito) }),
                });

                if (response.ok) {
                    alert('Conceito atualizado com sucesso!');
                    carregarConceitos(); // Atualiza a lista
                } else {
                    alert('Erro ao atualizar conceito.');
                }
            } catch (error) {
                console.error('Erro:', error);
            }
        }

        // Função para excluir conceito
        async function excluirConceito(id) {
            const confirmacao = confirm("Tem certeza que deseja excluir este conceito?");
            if (confirmacao) {
                try {
                    const response = await fetch(`https://sistema-escolar-two.vercel.app/api/conceitos${id}`, {
                        method: 'DELETE',
                    });

                    if (response.ok) {
                        alert('Conceito excluído com sucesso!');
                        carregarConceitos(); // Atualiza a lista
                    } else {
                        alert('Erro ao excluir conceito.');
                    }
                } catch (error) {
                    console.error('Erro:', error);
                }
            }
        }

        // Carregar conceitos ao iniciar
        carregarConceitos();