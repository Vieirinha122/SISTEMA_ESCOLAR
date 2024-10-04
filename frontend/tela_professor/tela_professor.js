document.addEventListener('DOMContentLoaded', () => {
    const nomeProfessorElem = document.getElementById('nome-professor');
    const idProfessorElem = document.getElementById('id-professor');
    const menuButtons = document.querySelectorAll('.menu-button');
    const customButton = document.querySelector('.custom-button');
    const senacLogo = document.querySelector('.senac-logo');

    document.querySelector('.dropdown-button').addEventListener('click', function() {
        var dropdownContent = document.querySelector('.dropdown-content');
        
        // Alterna entre adicionar e remover a classe que controla a exibição do dropdown
        if (dropdownContent.classList.contains('show-dropdown')) {
            dropdownContent.classList.remove('show-dropdown');
        } else {
            dropdownContent.classList.add('show-dropdown');
        }
    });

    // Obtém as informações do professor do localStorage
    const professorInfo = JSON.parse(localStorage.getItem('professorInfo'));

    if (professorInfo) {
        nomeProfessorElem.textContent = professorInfo.nome;
        idProfessorElem.textContent = professorInfo.id_professor; 
    } else {
        console.error('Informações do professor não encontradas.');
    }

    
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
