var logar = document.querySelector("#logar")


function sidebarButton(x) {
    let menuSidebar = document.getElementById("sidebar");
    x.classList.toggle("change");
    if (menuSidebar.classList.contains("active")) {
        menuSidebar.classList.remove("active");
        document.body.style.overflow = "visible";
    } else {
        menuSidebar.classList.add("active");
        document.body.style.overflow = "hidden";
    }
}

function exibirPreview(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const preview = document.getElementById('preview');
            preview.src = e.target.result;
        }

        reader.readAsDataURL(input.files[0]);
    }
}

/* modal */

const modal = document.querySelector('#area-principal');
const modal2 = document.querySelector('.modal');
const openModalButton = document.querySelector('#button-cadastro');
const closeModalButton = document.querySelector('#return');
const fade = document.querySelector('#fade');

function showModal() {
    if (!modal.classList.contains("show")) {
        modal.classList.add("show");
        modal2.style.display = "block";
        fade.classList.add("show");
        document.body.style.overflow = "hidden";
    } else {
        modal.classList.remove("show");
        modal2.style.display = "none";
        fade.classList.remove("show");
        document.body.style.overflow = "visible";
    }
}

function closeModal() {
    if (modal.classList.contains("show")) {
        modal.classList.remove("show");
        modal2.style.display = "none";
        fade.classList.remove("show");
        document.body.style.overflow = "visible";
    }
}

function logou(){
    history.pushState(null, null, '../controle_vendas.html');
}

