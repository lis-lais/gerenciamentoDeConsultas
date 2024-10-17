const prompt = require('prompt-sync')();

const { adicionarMedico } = require('./gerenciamentoMedico.js');
const { adicionarPaciente } = require('./gerenciamentoPaciente.js');
const { adicionarConsulta } = require('./gerenciamentoConsultas.js');
const { menuListar } = require('./menuListar.js');
const { menuAtualizar } = require('./menuAtualizar.js');
const { menuDeletar } = require('./menuDeletar.js');




function menuPrincipal() {
    console.log (`
        **********MENU**********
        1. ADICIONAR MÉDICO
        2. ADICIONAR PACIENTE
        3. ADICIONAR CONSULTA
        4. LISTAR
        5. ATUALIZAR
        6. DELETAR
        7. BUSCAR
        8. RELATÓRIOS
        9. SAIR
    `);
};

function menuOptions(opcao) {
    switch (opcao.trim()) {
        case '1':
            adicionarMedico();
            break;
        case '2':
            adicionarPaciente();
            break;
        case '3':
            adicionarConsulta();
            break;
        case '4':
            menuListar();
            break;
        case '5':
            menuAtualizar();
            break;
        case '6':
            menuDeletar();
            break;
        case '7':
            menuBuscar();
            break;
        case '8':
            menuRelatorios();
            break;
        case '9':
            console.log('Saindo do Programa.');
            process.exit();
        default:
            console.log('Opção inválida!');
            menuPrincipal();
            
    }
};

function menuLoop() {
    while (true) {
        menuPrincipal();
        const opcao = prompt('Digite a opção desejada: ').trim();
        menuOptions(opcao);
    }
};

module.exports = { menuPrincipal, menuOptions, menuLoop }