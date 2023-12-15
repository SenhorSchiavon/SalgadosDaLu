let menuMobile = document.getElementById('menu-mobile');
let menuBotao = document.getElementById('botao-abrir');
let abrirModal = document.getElementById('menu-modal');

/* menu mobile */
function menuShow() {
    if (menuMobile.classList.contains("active")) {
        menuMobile.classList.remove("active");
        document.body.style.overflow = "visible";
    } else {
        menuMobile.classList.add("active");
        menuBotao.classList.remove("active");
        document.body.style.overflow = "hidden";
    }
}

/* menu modal */
function modalShow() {
    if (!abrirModal.classList.contains("active")) {
        abrirModal.classList.add("active");
        document.body.style.overflow = "hidden";
    }
}

function modalClose() {
    if (abrirModal.classList.contains("active")) {
        abrirModal.classList.remove("active");
        document.body.style.overflow = "visible";
    }
}

/* inputs modal */
function cestasChecked(e) {
    var show = document.getElementById('qntd-cestas');
    show.style.display = e ? "flex" : "none";
}

function garrafasChecked(e) {
    var show = document.getElementById('qntd-garrafas');
    show.style.display = e ? "flex" : "none";
}

function toalhasChecked(e) {
    var show = document.getElementById('qntd-toalhas');
    show.style.display = e ? "flex" : "none";
}

function recolhidoChecked(e) {
    var show = document.getElementById('nome-recolhido');
    show.style.display = e ? "flex" : "none";
}

function cancelarModal() {
    var cancelar = document.getElementById('menu-modal');
    cancelar.classList.remove('active');
    document.body.style.overflow = "visible";
}