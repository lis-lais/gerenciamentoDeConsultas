const prompt = require('prompt-sync')();

const { atualizarMedico } = require('./gerenciamentoMedico.js');
const { atualizarPaciente } = require('./gerenciamentoPaciente.js');
const { atualizarConsulta } = require('./gerenciamentoConsultas.js');
const { menuPrincipal } = require('./menu.js');

function menuAtualizar() {
    console.log (`
        **********MENU ATUALIZAR**********
        1. ATUALIZAR MÉDICO
        2. ATUALIZAR PACIENTE
        3. ATUALIZAR CONSULTA
        4. VOLTAR
    `);
    const opcao = prompt('Digite a opção desejada: ').trim();

    menuOptions(opcao);
};

function menuOptions(opcao) {
    switch (opcao) {
        case '1':
            atualizarMedico();
            break;
        case '2':
            atualizarPaciente();
            break;
        case '3':
            atualizarConsulta();
            break;
        case '4':
            console.log('Busca cancelada.');
            menuPrincipal(); 
            break;            
        default:
            console.log('Opção inválida!');
            menuPrincipal();            
    }
};

module.exports = { menuAtualizar }