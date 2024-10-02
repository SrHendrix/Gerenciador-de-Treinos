document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('training-form');
    const schedule = document.getElementById('schedule');
    let trainings = JSON.parse(localStorage.getItem('trainings')) || []; // Carregar treinos do LocalStorage

    // Função para renderizar os treinos no cronograma
    function renderTrainings() {
        schedule.innerHTML = ''; // Limpa o cronograma antes de adicionar

        trainings.forEach((training, index) => {
            const trainingDiv = document.createElement('div');
            trainingDiv.classList.add('training');

            // Exibe o nome do treino
            const workoutName = document.createElement('p');
            workoutName.textContent = `${training.workout} (${training.day}) - Status: ${training.status || 'Pendente'}`;
            trainingDiv.appendChild(workoutName);

            // Botão para visualizar detalhes
            const detailsButton = document.createElement('button');
            detailsButton.textContent = 'Ver Detalhes';
            detailsButton.addEventListener('click', () => {
                alert(`Dia: ${training.day}\nTreino: ${training.workout}\nDescrição: ${training.description}\nCategoria: ${training.category}`);
            });
            trainingDiv.appendChild(detailsButton);

            // Botão para modificar treino
            const modifyButton = document.createElement('button');
            modifyButton.textContent = 'Modificar';
            modifyButton.addEventListener('click', () => {
                modifyTraining(index);
            });
            trainingDiv.appendChild(modifyButton);

            // Botão para marcar como concluído
            const completeButton = document.createElement('button');
            completeButton.textContent = 'Concluir';
            completeButton.addEventListener('click', () => {
                training.status = 'Concluído';
                trainingDiv.style.backgroundColor = 'green'; // Marca como concluído
                saveTrainings();
                renderTrainings();
            });
            trainingDiv.appendChild(completeButton);

            // Botão para marcar como não feito
            const notDoneButton = document.createElement('button');
            notDoneButton.textContent = 'Não feito';
            notDoneButton.addEventListener('click', () => {
                training.status = 'Não feito';
                trainingDiv.style.backgroundColor = 'red'; // Marca como não feito
                saveTrainings();
                renderTrainings();
            });
            trainingDiv.appendChild(notDoneButton);

            // Botão para deletar treino
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Deletar';
            deleteButton.addEventListener('click', () => {
                deleteTraining(index);
            });
            trainingDiv.appendChild(deleteButton);

            detailsButton.style.margin = '5px';
            modifyButton.style.margin = '5px';
            completeButton.style.margin = '5px';
            notDoneButton.style.margin = '5px';
            deleteButton.style.margin = '5px';

            // Define a cor de fundo de acordo com o status salvo
            if (training.status === 'Concluído') {
                trainingDiv.style.backgroundColor = 'green';
            } else if (training.status === 'Não feito') {
                trainingDiv.style.backgroundColor = 'red';
            }

            schedule.appendChild(trainingDiv);
        });
    }

    // Função para salvar os treinos no LocalStorage
    function saveTrainings() {
        localStorage.setItem('trainings', JSON.stringify(trainings));
    }

    // Função para adicionar treino
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const day = document.getElementById('day').value;
        const workout = document.getElementById('workout').value;
        const description = document.getElementById('description').value;
        const category = document.getElementById('category').value;

        const newTraining = {
            day,
            workout,
            description,
            category,
            status: 'Pendente' // Status inicial
        };

        trainings.push(newTraining);
        saveTrainings();
        form.reset(); // Limpa o formulário
        renderTrainings(); // Re-renderiza os treinos
    });

    // Função para modificar treino
    function modifyTraining(index) {
        const training = trainings[index];

        document.getElementById('day').value = training.day;
        document.getElementById('workout').value = training.workout;
        document.getElementById('description').value = training.description;
        document.getElementById('category').value = training.category;

        // Remove o treino antigo
        deleteTraining(index);
    }

    // Função para deletar treino
    function deleteTraining(index) {
        trainings.splice(index, 1);
        saveTrainings(); // Atualiza o LocalStorage
        renderTrainings(); // Re-renderiza a lista de treinos
    }

    // Renderiza os treinos carregados do LocalStorage ao abrir a página
    renderTrainings();
});
