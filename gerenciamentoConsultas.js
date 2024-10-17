const prompt = require('prompt-sync')();
const {listarMedicos} = require('./gerenciamentoMedico'); 
const {listarPacientes} = require('./gerenciamentoPaciente');

let consultas = [];

function novaConsulta(callbacks) {
    listarMedicos();

    const medicoId = prompt('Digite o ID do Médico: ').trim();

    listarPacientes();
    const pacienteId = prompt('ID do Paciente: ').trim(); 

    const data = prompt('Data da Consulta (DD/MM/AAAA): ').trim(); 
    const hora = prompt('Hora da Consulta (HH:MM): ').trim(); 
    const descricao = prompt('Descrição: ').trim(); 

    const consulta = {
        consultaId: Date.now(), 
        pacienteId: parseInt(pacienteId), 
        medicoId: parseInt(medicoId), 
        data: data,
        hora: hora, 
        descricao: descricao.trim(), 
    };

    callbacks(consulta);
};

function adicionarConsulta() {
    novaConsulta((consulta) => {
        consultas.push(consulta); 
        console.log('Consulta adicionada com sucesso!');
    });
};

function listarConsultas() {
    if (consultas.length === 0) {
        console.log('Nenhuma consulta cadastrada.');
        return;
    } 

    console.log('--- Lista de Consultas ---');
    consultas.forEach((consulta) => {
        console.log(consulta);
    });
};

function atualizarConsulta() {
    listarConsultas();

    const consultaId = parseInt(prompt('ID da Consulta que deseja atualizar: '));
    const consulta = consultas.find(c => c.consultaId === parseInt(consultaId));

    if (consulta) {
        consulta.pacienteId = parseInt(prompt('Novo ID do Paciente: ') || consulta.pacienteId);
        consulta.medicoId = parseInt(prompt('Novo ID do Médico: ') || consulta.medicoId);
        consulta.data = prompt('Nova Data da Consulta: ') || consulta.data;
        consulta.hora = prompt('Nova Hora da Consulta: ') || consulta.hora;
        consulta.descricao = prompt('Nova Descrição: ') || consulta.descricao;

        console.log('Consulta atualizada com sucesso!');
    } else {
        console.log('Consulta não encontrada.');
    }
};

function deletarConsulta() {
    listarConsultas();

    const consultaId = prompt('ID da Consulta que deseja remover: ').trim();
    const index = consultas.findIndex(c => c.consultaId === parseInt(consultaId));

    if (index !== -1) {
        consultas.splice(index, 1);
        console.log('Consulta removida com sucesso!');
    } else {
        console.log('Consulta não encontrada.');
    }
}

function buscarConsulta() {
    listarConsultas();  
    mostrarMenuBuscarConsulta();  

    const opcao = prompt('Digite a opção desejada para buscar consulta: ').trim();

    if (opcao === null || opcao === '') { 
        console.log('Busca cancelada ou entrada inválida.');
        return;
    }

    const resultados = menuOptionsBuscarConsulta(opcao, consultas);  

    console.log('Consultas encontradas:');
    if (resultados.length > 0) {
        resultados.forEach((consulta, index) => {
            console.log(`${index + 1}. ID Médico: ${consulta.medicoId} - ID Paciente: ${consulta.pacienteId} - Data: ${consulta.data}`);
        });
    } else {
        console.log('Nenhuma consulta encontrada.');
    }
}

function mostrarMenuBuscarConsulta() {
    console.log(`
        1. Buscar por ID do Médico
        2. Buscar por ID do Paciente
        3. Buscar por Data
    `);
}

function menuOptionsBuscarConsulta(opcao, consultas) {
    switch (opcao) {
        case '1':
            const medicoId = prompt('Digite o ID do médico: ').trim();
            return consultas.filter(consulta => consulta.medicoId == medicoId);
        case '2':
            const pacienteId = prompt('Digite o ID do paciente: ').trim();
            return consultas.filter(consulta => consulta.pacienteId == pacienteId);
        case '3':
            const data = prompt('Digite a data da consulta (DD/MM/AAAA): ').trim();
            return consultas.filter(consulta => consulta.data === data);
        default:
            console.log('Opção inválida!');
            return [];
    }
}


module.exports = { adicionarConsulta, listarConsultas, atualizarConsulta, deletarConsulta, buscarConsulta };
