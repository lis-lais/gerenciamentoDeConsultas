const prompt = require('prompt-sync')();


let pacientes = [];

function novoPaciente(callbacks) {
    const nome = prompt('Nome: ');
    const nascimento = prompt('Data de Nascimento (DD/MM/AAAA): ');

    const paciente = {
        pacienteId: Date.now(),
        nome: nome.trim(),
        nascimento: nascimento.trim(),
    };
    callbacks(paciente);
};

function adicionarPaciente() {
    novoPaciente((paciente) => {
        pacientes.push(paciente);
        console.log('Paciente adicionado com sucesso!');
    });
};

function listarPacientes() {
    if (pacientes.length === 0) {
        console.log('Nenhum paciente cadastrado.');
        return;
    } 

    console.log('--- Lista de Pacientes ---');
    console.log(pacientes);
};

function atualizarPaciente() {

    listarPacientes();
    const pacienteId = parseInt(prompt('ID do Paciente que deseja atualizar: '));
    
    const paciente = pacientes.find(p => p.pacienteId === pacienteId);

    if (paciente) {
        paciente.nome = prompt('Novo Nome do Paciente: ') || paciente.nome;
        paciente.dataNascimento = prompt('Nova Data de Nascimento do Paciente (AAAA-MM-DD): ') || paciente.dataNascimento;
        console.log('Paciente atualizado com sucesso!');
    } else {
        console.log('Paciente não encontrado.');
    }
}

function deletarPaciente() {
    const pacienteId = prompt('ID do Paciente que deseja remover: ');
    const index = pacientes.findIndex(p => p.pacienteId === parseInt(pacienteId));

    if (index !== -1) {
        pacientes.splice(index, 1);
        console.log('Paciente removido com sucesso!');

        consultas = consultas.filter(consulta => consulta.pacienteId !== parseInt(pacienteId));
        console.log('Consultas associadas ao paciente também foram removidas.');
    } else {
        console.log('Paciente não encontrado.');
    }
}

function buscarPaciente() {
    listarPacientes();  
    mostrarMenuBuscarPaciente();  

    const opcao = prompt('Digite a opção desejada para buscar paciente: ').trim();

    if (opcao === null || opcao === '') { 
        console.log('Busca cancelada ou entrada inválida.');
        return;
    }

    const resultados = menuOptionsBuscarPaciente(opcao, pacientes);  

    console.log('Pacientes encontrados:');
    if (resultados.length > 0) {
        resultados.forEach((paciente, index) => {
            console.log(`${index + 1}. Nome: ${paciente.nome} - Idade: ${paciente.dataNascimento}`);
        });
    } else {
        console.log('Nenhum paciente encontrado.');
    }
}

function mostrarMenuBuscarPaciente() {
    console.log(`
        1. Buscar por Nome
        2. Buscar por Data de Nascimento
    `);
}

function menuOptionsBuscarPaciente(opcao, pacientes) {
    switch (opcao) {
        case '1':
            const nome = prompt('Digite o nome do paciente: ').trim().toLowerCase();
            return pacientes.filter(paciente => paciente.nome.toLowerCase().includes(nome));
        case '2':
            const dataNascimento = prompt('Digite a idade do paciente: ').trim();
            return pacientes.filter(paciente => paciente.dataNascimento == dataNascimento);
        default:
            console.log('Opção inválida!');
            return [];
    }
}


module.exports = { adicionarPaciente, listarPacientes, atualizarPaciente, deletarPaciente, buscarPaciente };