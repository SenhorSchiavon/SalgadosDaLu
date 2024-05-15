const botaoCadastro = document.getElementById("button-cadastrar");

// Adiciona um ouvinte de eventos ao botão de cadastro
botaoCadastro.addEventListener('click', adicionarUsuario);

// Função para buscar todos os cadastros do Firebase e atualizar a tabela
function buscarCadastrosNoFirebase() {
    // Consultar os dados do Firebase
    firebase.firestore().collection('clientes').get().then(snapshot => {
        const tbody = document.getElementById('lista-usuarios');
        tbody.innerHTML = ''; // Limpar os dados existentes na tabela

        snapshot.docs.forEach(doc => {
            const userData = doc.data();
            const newRow = `
    <tr>
        <td><span>${userData.nomeCompleto}</span></td>
        <td><span>${userData.celular}</span></td>
        <td>${userData.endereco}</td>
        <td class="icons-table">
            <span><img src="assets/img/delete-logo.svg" alt="" class="delete" data-id="${doc.id}"></span>
            <span><img src="assets/img/edit-logo.svg" alt="" class="edit" data-id="${doc.id}"></span>
        </td>
    </tr>
`;

            tbody.innerHTML += newRow;
        });

        // Adiciona um ouvinte de eventos a todos os ícones de exclusão
        const iconsDelete = document.querySelectorAll('.delete');
        iconsDelete.forEach(icon => {
            icon.addEventListener('click', () => {
                const userId = icon.dataset.id; // Obtém o ID do usuário associado ao ícone de exclusão
                deletarCadastro(userId); // Chama a função para deletar o usuário com o ID correspondente
            });
        });
    }).catch(error => {
        console.error("Erro ao recuperar documentos:", error);
    });
}

// Função para adicionar um novo usuário
function adicionarUsuario(e) {
    e.preventDefault();

    // Captura os valores dos campos de entrada
    const nomeCompleto = document.getElementById('input-nome').value;
    const celular = document.getElementById('input-number').value;
    const endereco = document.getElementById('input-endereco').value;

    // Adiciona o usuário ao Firestore
    firebase.firestore().collection('clientes').add({
        nomeCompleto: nomeCompleto,
        endereco: endereco,
        celular: celular,
    })
    .then(() => {
        console.log("Usuário adicionado com sucesso");
        // Limpa os campos de entrada após adicionar o usuário
        document.getElementById('input-nome').value = '';
        document.getElementById('input-number').value = '';
        document.getElementById('input-endereco').value = '';

        // Atualiza a tabela com os novos dados do Firebase
        buscarCadastrosNoFirebase();
    })
    .catch((error) => {
        console.error("Erro ao adicionar usuário: ", error);
        // Trate o erro adequadamente
    });
}

// Função para deletar um cadastro do Firebase e da tabela
function deletarCadastro(id) {
    firebase.firestore().collection('clientes').doc(id).delete()
    .then(() => {
        console.log("Cadastro deletado com sucesso");
        // Atualiza a tabela com os novos dados do Firebase após a exclusão
        buscarCadastrosNoFirebase();
    })
    .catch(error => {
        console.error("Erro ao deletar cadastro:", error);
    });
}

// Chama a função para buscar e exibir os cadastros do Firebase ao carregar a página
buscarCadastrosNoFirebase();

// Função para buscar os dados de um usuário específico no Firebase
function buscarUsuario(id) {
    return firebase.firestore().collection('clientes').doc(id).get();
}

// Função para preencher os campos do modal com os dados do usuário
function preencherCamposModal(userData) {
    document.getElementById('input-nome').value = userData.nomeCompleto;
    document.getElementById('input-number').value = userData.celular;
    document.getElementById('input-endereco').value = userData.endereco;
}

// Função para abrir o modal com as informações do usuário para edição
function abrirModalEditar(id) {
    console.log("Abrindo modal de edição para o usuário com ID:", id);

    // Buscar os dados do usuário no Firebase
    buscarUsuario(id).then(snapshot => {
        const userData = snapshot.data();
        // Preencher os campos do modal com os dados do usuário
        preencherCamposModal(userData);
    }).catch(error => {
        console.error("Erro ao buscar usuário:", error);
    });
}

const modalEditares = document.querySelectorAll(".edit");

modalEditares.forEach(modalEditar => {
    modalEditar.addEventListener('click', () => {
        const userId = modalEditar.dataset.id;
        abrirModalEditar(userId);
    });
});


// Adiciona um ouvinte de eventos aos ícones de edição
const iconsEdit = document.querySelectorAll('.edit');
iconsEdit.forEach(icon => {
    icon.addEventListener('click', () => {
        const userId = icon.dataset.id; // Obtém o ID do usuário associado ao ícone de edição
        abrirModalEditar(userId); // Chama a função para abrir o modal com as informações do usuário
    });
});
