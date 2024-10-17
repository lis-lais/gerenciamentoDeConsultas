const prompt = require('prompt-sync')();

const { deletarMedico } = require('./gerenciamentoMedico.js');
const { deletarPaciente } = require('./gerenciamentoPaciente.js');
const { deletarConsulta } = require('./gerenciamentoConsultas.js');
const { menuPrincipal } = require('./menu.js');

function menuDeletar() {
    console.log (`
        **********MENU DELETAR**********
        1. DELETAR MÉDICO
        2. DELETAR PACIENTE
        3. DELETAR CONSULTA
        4. VOLTAR
    `);
    const opcao = prompt('Digite a opção desejada: ').trim();

    menuOptions(opcao);
};

function menuOptions(opcao) {
    switch (opcao) {
        case '1':
            deletarMedico();
            break;
        case '2':
            deletarPaciente();
            break;
        case '3':
            deletarConsulta();
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

module.exports = { menuDeletar }