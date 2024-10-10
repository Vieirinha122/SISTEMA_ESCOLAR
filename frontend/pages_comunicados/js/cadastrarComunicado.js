// URL da sua API (ajuste conforme necessário)
const apiUrl = 'https://sistema-escolar-two.vercel.app/api'; // Ajuste a URL conforme a configuração da sua API

// Função para publicar um novo comunicado
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Obtenha a data diretamente do campo de entrada
    const dataInput = document.getElementById('data').value;

    // Prepare o objeto do comunicado com os dados do formulário
    const comunicado = {
        titulo: document.getElementById('titulo').value,
        descricao: document.getElementById('descricao').value,
        data: dataInput, // Utilize a data como está
    };

    // Faça a requisição para sua API
    fetch(`${apiUrl}/comunicados`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(comunicado),
    }).then(response => {
        if (response.ok) {
            alert('Comunicado enviado com sucesso!');
            document.querySelector('form').reset(); // Limpa o formulário após o envio
        } else {
            alert('Erro ao enviar comunicado');
        }
    }).catch(error => {
        console.error('Erro:', error);
        alert('Erro ao enviar comunicado');
    });
});
const menuToggle = document.querySelector('.menu-toggle'); // Altere para a classe correta do seu botão
const sidebar = document.querySelector('.sidebar'); // Altere para a classe correta da sua sidebar

// Adiciona um listener de evento para o clique
menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open'); // Adiciona ou remove a classe 'open'
});