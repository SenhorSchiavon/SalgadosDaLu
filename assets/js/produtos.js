const botaoCadastro = document.getElementById("salvar-produto");

// Adiciona um ouvinte de eventos ao botão de cadastro
botaoCadastro.addEventListener('click', adicionarVenda);

// Função para buscar todas as vendas do Firebase e atualizar a tabela
function buscarVendasNoFirebase() {
    // Consultar os dados do Firebase
    firebase.firestore().collection('produtos').get().then(snapshot => {
        const tbody = document.getElementById('tabela-produtos').getElementsByTagName('tbody')[0];
        tbody.innerHTML = ''; // Limpar os dados existentes na tabela

        snapshot.docs.forEach(doc => {
            const vendaData = doc.data();
            const newRow = `
    <tr>
        <td><span>${vendaData.nomeProduto}</span></td>
        <td>${vendaData.preco}</td>
        <td>${vendaData.descricao}</td>
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
                const vendaId = icon.dataset.id; // Obtém o ID da venda associada ao ícone de exclusão
                deletarVenda(vendaId); // Chama a função para deletar a venda com o ID correspondente
            });
        });
    }).catch(error => {
        console.error("Erro ao recuperar documentos:", error);
    });
}

// Função para adicionar uma nova venda
function adicionarVenda(e) {
    e.preventDefault();

    // Captura os valores dos campos de entrada
    const nomeProduto = document.getElementById('nome').value;
    const preco = document.getElementById('preco').value;
    const descricao = document.getElementById('descricao').value;

    // Adiciona a venda ao Firestore
    firebase.firestore().collection('produtos').add({
        nomeProduto: nomeProduto || "",
        preco: preco || "",
        descricao: descricao || "",

    })
        .then(() => {
            console.log("Venda adicionada com sucesso");
            // Limpa os campos de entrada após adicionar a venda
            document.getElementById('nome').value = '';
            document.getElementById('preco').value = '';
            document.getElementById('descricao').value = '';


            // Atualiza a tabela com as novas vendas do Firebase
            buscarVendasNoFirebase();
        })
        .catch((error) => {
            console.error("Erro ao adicionar venda: ", error);
            // Trate o erro adequadamente
        });
}

// Função para deletar uma venda do Firebase e da tabela
function deletarVenda(id) {
    firebase.firestore().collection('produtos').doc(id).delete()
        .then(() => {
            console.log("Venda deletada com sucesso");
            // Atualiza a tabela com as novas vendas do Firebase após a exclusão
            buscarVendasNoFirebase();
        })
        .catch(error => {
            console.error("Erro ao deletar venda:", error);
        });
}

// Chama a função para buscar e exibir as vendas do Firebase ao carregar a página
buscarVendasNoFirebase();
