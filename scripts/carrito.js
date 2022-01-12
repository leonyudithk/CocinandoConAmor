const items = document.getElementById('items');
const templateCard = document.getElementById('template-card').content;
const fragment = document.createDocumentFragment();

const templateFooter = document.getElementById('template-footer').content;
const templateCarrito = document.getElementById('template-carrito').content;
const itemss = document.getElementById('itemss')
const footer = document.getElementById('footer')

let comprar = [];


const url = ('http://localhost:4000/recetas')

document.addEventListener('DOMContentLoaded', () => {
    CapturarDatos(url);
    items.addEventListener('click', e => {
        addcomprar(e);
    })

})

//pintar productos captura de la url
const CapturarDatos = async  (url) => {

    const res = await fetch(url);
    const data = await res.json();

    console.log(data)
    data.forEach(platos => {
        const {id, nombre, foto, precio} = platos;

        templateCard.querySelector('h5').textContent = nombre;
        templateCard.querySelector('img').setAttribute('src', foto);
        templateCard.querySelector('.btn-dark').dataset.id = id;
        templateCard.querySelector('h3').textContent = precio;

        const clone = templateCard.cloneNode(true);
        fragment.appendChild(clone);
    })

    // appendChild agrega un nodo al final de la lista
    items.appendChild(fragment);
}



const addcomprar = e => {
     
    //que contenga btn dark y devuelve true
     if (e.target.classList.contains('btn-dark')) {
    //     //captura todos los elementos de la target
        setcomprar(e.target.parentElement);
         console.log(e.target.parentElement)
     }
}

const setcomprar = objeto => {
    const boton = {
        id: objeto.querySelector('.btn-dark').dataset.id,
        precio: objeto.querySelector('h3').textContent,
        nombre: objeto.querySelector('h5').textContent,
        cantidad: 1

    }
    
    if (comprar.hasOwnProperty(boton.id)) {
        boton.cantidad = comprar[boton.id].cantidad + 1;
        objeto.querySelector('#comprar').textContent = boton.cantidad;
    }

   comprar[boton.id] = {...boton};
   pintarCarrito()
    console.log(comprar[boton.id]);
 }


 const pintarCarrito =() =>{
    itemss.innerHTML=''
        Object.values(comprar).forEach(boton =>{
            templateCarrito.querySelector('th').textContent = boton.id;
            templateCarrito.querySelectorAll('td')[0].textContent = boton.nombre;
            templateCarrito.querySelectorAll('td')[1].textContent = boton.cantidad

            templateCarrito.querySelector('span').textContent = boton.cantidad*boton.precio

        const clone = templateCarrito.cloneNode(true);
        fragment.appendChild(clone);
    })
    itemss.appendChild(fragment)

    pintarFooter()
}


const pintarFooter=()=>{
    footer.innerHTML= ''
    if(Object.keys(comprar).length ===0)
    {
        footer.innerHTML=`
        <th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>
        `
    }
   //calculando la suma total de las cantidades con nCant y la suma total a pagar con Nprecio
    const nCant = Object.values(comprar).reduce((acum, {cantidad})=> acum + cantidad, 0)
    const nPrecio = Object.values(comprar).reduce((acc, {cantidad, precio}) => acc + cantidad*precio,0) 
    console.log(nCant, nPrecio)


    //enviando a pintar en mi tabla en el template-footer
    templateFooter.querySelectorAll('td')[0].textContent = nCant
    templateFooter.querySelector('span').textContent = nPrecio
    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)
    footer.appendChild(fragment)


    // vaciar o limpiar mi compra
    const boton = document.querySelector('#vaciar-carrito')
    boton.addEventListener('click', () => {
        comprar = {}
        pintarCarrito()
    })

    const botonPagar = document.querySelector('#pagar')
    botonPagar.addEventListener('click', () => {
        comprar = {}
       Gracias()
    })
}

const Gracias =()=>{
    alert('Gracias Por su Compra')
}
