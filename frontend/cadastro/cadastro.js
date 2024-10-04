async function registerUser(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const matricula = document.getElementById('matricula').value;
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const turno = document.getElementById('turno').value;
    const turma = document.getElementById('turma').value;

    try {
        const response = await fetch('https://sistema-escolar-two.vercel.app/api/alunos', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ matricula, nome, email, senha, turno, turma })
        });

        const result = await response.json();

        if (response.ok) {
            alert('Usuário criado com sucesso');
        } else {
            alert(`Erro: ${result.error}`);
        }
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        alert('Erro ao registrar usuário');
    }
}