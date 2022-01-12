let formulario = document.getElementById('formulario');
let btnBuscar = document.getElementById('btnNombre');
let btnEditar = document.getElementById('btnEditar');
let btnEliminar = document.getElementById('btnEliminar');

const modalPlato = document.getElementById('modal-content');
const listarIngre = document.getElementsByName('Listar-ingredientes');
const preparar = document.getElementsByName('preparar')

const url = ('http://localhost:4000/recetas')

window.addEventListener('DOMContentLoaded', async () => {
})

//Agregar una receta
formulario.addEventListener('submit', async (e) => {
    e.preventDefault();
    //capturando los datos del html y los voy a enviar a mi data.json
    let nombre = document.getElementById('name').value;
    let ingre = document.getElementById('ingredientes').value;
    let prepa = document.getElementById('preparacion').value;
    let foto = document.getElementById('foto').value;
    let id = document.getElementById('id').value;


        // atraves de una promesa url donde se van a guardar esos datos
    let resp = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            nombre: nombre,
            ingredientes: ingre,
            preparacion: prepa,
            foto: foto,
            id: id
        }),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    })

    let data = resp.json();
    console.log(data)
})


/**Buscador */
btnBuscar.addEventListener('click', async (e) => {
    e.preventDefault();

    let input = document.getElementById('inputBuscar').value;

    let resp = await fetch(url);
    let data = await resp.json();

        //busqueda a trave de un filtro
    let filtro = data.filter(producto => producto.nombre.toLowerCase() === input.toLowerCase())
    console.log(filtro)


    modalPlato.innerHTML = '';
    listarIngre.innerHTML = '';
    preparar.innerHTML = '';

    filtro.length === 0 ?
        modalPlato.innerHTML += `
     <div class="modal-header">
                 <h5 class="modal-title" id="exampleModalLabel">El nombre ${input} no existe</h5>
                 <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">X</button>
             </div>
             
                   
             `
        :
        (
            filtro.map(plato => {
                const { id, nombre, ingredientes, preparacion, foto } = plato;
                modalPlato.innerHTML += `
                <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">${nombre}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">X</button>
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
            })

        )
})

//Modificar
btnEditar.addEventListener('click', async () => {

    let id = document.getElementById('id').value;

    let resp = await fetch(url);
    let data = await resp.json();

    let modificar = data.filter(producto => producto.id === id)
    const {nombre, ingredientes, preparacion, foto } = modificar;

    document.getElementById('name').value = nombre;
    document.getElementById('ingredientes').value = ingredientes;
    document.getElementById('preparacion').value = preparacion;
    document.getElementById('foto').value = foto;

    console.log(nombre, ingredientes, preparacion, foto)
    let resp2 = await fetch(`http://localhost:4000/recetas${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            nombre: nombre,
            ingredientes: ingredientes,
            preparacion: preparacion,
            foto: foto,
            id: id
        }),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    })
    let data2 = resp2.json();
    console.log(data2);
})


/**Eliminar */
btnEliminar.addEventListener('click', async () => {

    let id = document.getElementById('id').value;
    let resp = await fetch(`http://localhost:4000/recetas${id}`, {
        method: 'DELETE',
    })
    let data = resp.json();
    console.log(data);
})










