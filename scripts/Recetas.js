const items = document.getElementById('items')
const templatedC = document.getElementById('template-card').content;
const fragment = document.createDocumentFragment();


//Modal
const modalPlato = document.getElementById('modal-content');
const listarIngre = document.getElementsByName('Listar-ingredientes');
const preparar = document.getElementsByName('preparar')
const url = ('http://localhost:4000/recetas')

let cont=0;

document.addEventListener('DOMContentLoaded', () => {
    Mostrar(url)
})


//pintar las Tarjetas

const Mostrar = async (url) => {

    const res = await fetch(url);
    const data = await res.json();

    data.forEach(cocina => {
        const {id,  nombre, foto } = cocina;
        templatedC.querySelector('h5').textContent = nombre;
        templatedC.querySelector('img').setAttribute('src', foto);
        templatedC.querySelector('button').setAttribute('id', id);
        const clone = templatedC.cloneNode(true)
        fragment.appendChild(clone);
    })
    items.appendChild(fragment)
}

// receta detalle
items.addEventListener('click', (e) => {
     if (e.target.classList.contains('mostrar')) {
        console.log(e)
    }
    Modal(e.srcElement.id)

    if (e.target.classList.contains('btn-comprar')) {
        cont+= 1;
        console.log(cont)
    }
    
})


const Modal = async (id2) => {

    const res = await fetch(url);
    const data = await res.json();

    modalPlato.innerHTML = '';
    listarIngre.innerHTML = '';
    preparar.innerHTML = '';

    data.forEach(plato => {
        const { id, nombre, ingredientes, preparacion, foto } = plato;

        if (id == id2) {
            modalPlato.innerHTML += `
            <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">${nombre}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">Cerrar</button>
                    </div>
                    <div class="modal-body">
                        <img src="${foto}" width="80%" alt="">
                        </div>
                      <h3>Ingredientes</h3> <br/>

                      
                    `
            for (let i = 0; i < ingredientes.length; i++) {

                modalPlato.innerHTML += `
                    <li>${ingredientes[i]}</li>
                    `
            }

            modalPlato.innerHTML += `
                        <p>${preparacion}</p>
                        <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                `

        }

    })
}






