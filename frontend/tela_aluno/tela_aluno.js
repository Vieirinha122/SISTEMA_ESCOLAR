document.addEventListener('DOMContentLoaded', () => {
    const nomeAlunoElem = document.getElementById('nome-aluno');
    const turmaTurnoElem = document.getElementById('turma-turno');
    const matriculaElem = document.getElementById('matricula');
    const menuButtons = document.querySelectorAll('.menu-button');
    const customButton = document.querySelector('.custom-button');
    const senacLogo = document.querySelector('.senac-logo');

    // Obtém as informações do aluno do localStorage
    const alunoInfo = JSON.parse(localStorage.getItem('alunoInfo'));

    if (alunoInfo) {
        nomeAlunoElem.textContent = alunoInfo.nome;
        // Substitui "manha" por "manhã" no valor de turno
        const turno = alunoInfo.turno.replace('manha', 'manhã');
        turmaTurnoElem.textContent = `${alunoInfo.turma} - ${turno} - Ensino Médio`;
        matriculaElem.textContent = alunoInfo.matricula;
    } else {
        console.error('Informações do aluno não encontradas.');
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