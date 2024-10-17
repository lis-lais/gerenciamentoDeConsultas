const prompt = require('prompt-sync')();

const { listarMedicos } = require('./gerenciamentoMedico.js');
const { listarPacientes } = require('./gerenciamentoPaciente.js');
const { listarConsultas } = require('./gerenciamentoConsultas.js');
const { menuPrincipal } = require('./menu.js');

function menuListar() {
    console.log (`
        **********MENU LISTAR**********
        1. LISTAR MÉDICO
        2. LISTAR PACIENTE
        3. LISTAR CONSULTA
        4. VOLTAR
    `);
    const opcao = prompt('Digite a opção desejada: ').trim();

    menuOptions(opcao);
};

function menuOptions(opcao) {
    switch (opcao.trim()) {
        case '1':
            listarMedicos();
            break;
        case '2':
            listarPacientes();
            break;
        case '3':
            listarConsultas();
            break;
        case '4':
            console.log('Busca cancelada.');
            menuPrincipal();
            return;
        default:
            console.log('Opção inválida!');
            menuPrincipal();
            
    }
};

module.exports = { menuListar, menuOptions }