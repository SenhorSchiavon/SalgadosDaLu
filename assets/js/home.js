const botaoCadastro = document.getElementById("button-cadastrar");

// Adiciona um ouvinte de eventos ao botão de cadastro
botaoCadastro.addEventListener('click', adicionarVenda);

// Função para buscar todas as vendas do Firebase e atualizar a tabela
function buscarVendasNoFirebase() {
    // Consultar os dados do Firebase
    firebase.firestore().collection('vendas').get().then(snapshot => {
        const tbody = document.getElementById('tabela-produtos').getElementsByTagName('tbody')[0];
        tbody.innerHTML = ''; // Limpar os dados existentes na tabela

        snapshot.docs.forEach(doc => {
            const vendaData = doc.data();
            const newRow = `
    <tr>
        <td><span>${vendaData.produtoVendido}</span></td>
        <td>${vendaData.endereco}</td>
        <td>${vendaData.data}</td>
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
    const produtoVendido = document.getElementById('input-nome').value;
    const data = document.getElementById('input-data').value;
    const hora = document.getElementById('input-hr').value;
    const telefone = document.getElementById('input-number').value;
    const endereco = document.getElementById('input-endereco').value;
    const tipo = document.getElementById('input-tipo').value;
    const quantidade = document.getElementById('input-quantidade').value;
    const cafe = document.getElementById('input-cafe').value;
    const bebida = document.getElementById('input-bebida').value;
    const salgadosFritos = document.getElementById('input-salg-frito').value;
    const salgadosAssados = document.getElementById('input-salg-assado').value;
    const doces = document.getElementById('input-doces').value;
    const cestas = document.getElementById('check-cestas').checked;
    const qntdCestas = document.getElementById('qntd-cestas').value;
    const garrafas = document.getElementById('check-garrafas').checked;
    const qntdGarrafas = document.getElementById('qntd-garrafas').value;
    const toalhas = document.getElementById('check-toalhas').checked;
    const qntdToalhas = document.getElementById('qntd-toalhas').value;
    const recolhido = document.getElementById('check-recolhido').checked;
    const nomeRecolhido = document.getElementById('nome-recolhido').value;

    // Adiciona a venda ao Firestore
    firebase.firestore().collection('vendas').add({
        produtoVendido: produtoVendido || "",
        data: data || "",
        hora: hora || "",
        telefone: telefone || "",
        endereco: endereco || "",
        tipo: tipo || "",
        quantidade: quantidade || "",
        cafe: cafe || "",
        bebida: bebida || "",
        salgadosFritos: salgadosFritos || "",
        salgadosAssados: salgadosAssados || "",
        doces: doces || "",
        cestas: cestas || "",
        qntdCestas: qntdCestas || "",
        garrafas: garrafas || "",
        qntdGarrafas: qntdGarrafas || "",
        toalhas: toalhas || "",
        qntdToalhas: qntdToalhas || "",
        recolhido: recolhido || "",
        nomeRecolhido: nomeRecolhido || ""
    })
    .then(() => {
        console.log("Venda adicionada com sucesso");
        // Limpa os campos de entrada após adicionar a venda
        document.getElementById('input-nome').value = '';
        document.getElementById('input-data').value = '';
        document.getElementById('input-hr').value = '';
        document.getElementById('input-number').value = '';
        document.getElementById('input-endereco').value = '';
        document.getElementById('input-tipo').value = '';
        document.getElementById('input-quantidade').value = '';
        document.getElementById('input-cafe').value = '';
        document.getElementById('input-bebida').value = '';
        document.getElementById('input-salg-frito').value = '';
        document.getElementById('input-salg-assado').value = '';
        document.getElementById('input-doces').value = '';
        document.getElementById('check-cestas').checked = false;
        document.getElementById('qntd-cestas').value = '';
        document.getElementById('check-garrafas').checked = false;
        document.getElementById('qntd-garrafas').value = '';
        document.getElementById('check-toalhas').checked = false;
        document.getElementById('qntd-toalhas').value = '';
        document.getElementById('check-recolhido').checked = false;
        document.getElementById('nome-recolhido').value = '';

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
    firebase.firestore().collection('vendas').doc(id).delete()
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
