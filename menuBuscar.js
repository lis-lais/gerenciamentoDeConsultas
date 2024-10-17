const prompt = require('prompt-sync')();

const { buscarMedico } = require('./gerenciamentoMedico.js');
const { buscarPaciente } = require('./gerenciamentoPaciente.js');
const { buscarConsulta } = require('./gerenciamentoConsultas.js');
const { menuPrincipal } = require('./menu.js');

function menuDeletar() {
    console.log (`
        **********MENU BUSCAR**********
        1. BUSCAR MÉDICO
        2. BUSCAR PACIENTE
        3. BUSCAR CONSULTA
        4. VOLTAR
    `);
    const opcao = prompt('Digite a opção desejada: ').trim();

    menuOptions(opcao);
};

function menuOptions(opcao) {
    switch (opcao) {
        case '1':
            buscarMedico();
            break;
        case '2':
            buscarPaciente();
            break;
        case '3':
            buscarConsulta();
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

module.exports = { menuBuscar }