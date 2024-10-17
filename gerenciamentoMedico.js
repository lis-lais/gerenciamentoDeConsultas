const prompt = require('prompt-sync')();

let medicos = [];

function novoMedico(callbacks) {
    const nome = prompt('Nome: ');
    const especialidade = prompt('Especialidade: ');

    const medico = {
        medicoId: Date.now(),
        nome: nome.trim(),
        especialidade: especialidade.trim(),
    };
    callbacks(medico);
};

function adicionarMedico() {
    novoMedico((medico) => {
        const existe = medicos.some(m => m.nome === medico.nome);

        if (existe) {
            console.log('Médico já cadastrado.');
            return;
        } else {
        medicos.push(medico);
        console.log('Médico adicionado com sucesso!');
        }
    });
};

function listarMedicos() {
    if (medicos.length === 0) {
        console.log('Nenhum médico cadastrado.');
        return;
    } 

    console.log('--- Lista de Médicos ---');
    console.log(medicos);
};

function atualizarMedico() {

    listarMedicos();
    const medicoId = parseInt(prompt('ID do Médico que deseja atualizar: '));
    
    const medico = medicos.find(m => m.medicoId === medicoId); 
    
    if (medico) {
        const novoNome = prompt('Novo Nome do Médico: ').trim();
        const novaEspecialidade = prompt('Nova Especialidade do Médico: ').trim();
        
        if (novoNome) medico.nome = novoNome;
        if (novaEspecialidade) medico.especialidade = novaEspecialidade;

        console.log('Médico atualizado com sucesso!');
    } else {
        console.log('Médico não encontrado.');
    }
}

function deletarMedico() {
    const medicoId = prompt('ID do Médico que deseja remover: ');
    const index = medicos.findIndex(m => m.medicoId === parseInt(medicoId));

    if (index !== -1) {
        medicos.splice(index, 1);
        console.log('Médico removido com sucesso!');

        consultas = consultas.filter(consulta => consulta.medicoId !== parseInt(medicoId));
        console.log('Consultas associadas ao médico também foram removidas.');
    } else {
        console.log('Médico não encontrado.');
    }   
}

function buscarMedico() {
    listarMedicos();  
    mostrarMenuBuscarMedico();  

    const opcao = prompt('Digite a opção desejada para buscar médico: ').trim();

    if (opcao === null || opcao === '') { 
        console.log('Busca cancelada ou entrada inválida.');
        return;
    }

    const resultados = menuOptionsBuscarMedico(opcao, medicos);  

    console.log('Médicos encontrados:');
    if (resultados.length > 0) {
        resultados.forEach((medico, index) => {
            console.log(`${index + 1}. Nome: ${medico.nome} - Especialidade: ${medico.especialidade}`);
        });
    } else {
        console.log('Nenhum médico encontrado.');
    }
}

function mostrarMenuBuscarMedico() {
    console.log(`
        1. Buscar por Nome
        2. Buscar por Especialidade
    `);
}

function menuOptionsBuscarMedico(opcao, medicos) {
    switch (opcao) {
        case '1':
            const nome = prompt('Digite o nome do médico: ').trim().toLowerCase();
            return medicos.filter(medico => medico.nome.toLowerCase().includes(nome));
        case '2':
            const especialidade = prompt('Digite a especialidade do médico: ').trim().toLowerCase();
            return medicos.filter(medico => medico.especialidade.toLowerCase().includes(especialidade));
        default:
            console.log('Opção inválida!');
            return [];
    }
}

module.exports = { adicionarMedico, listarMedicos, atualizarMedico, deletarMedico, buscarMedico };
