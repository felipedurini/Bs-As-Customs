

let container=document.getElementById('container')
let total=document.createElement('h2')
total.classList.add('total')
//en el contador voy a tener los productos agregados por el usuario, es lo que va a comprar
let contador=[]
let contadorJSON=JSON.parse(localStorage.getItem('contador'))
//lista carrito va a ser un objeto que me va a ayudar a hacer varias cosas, como por ej, crear el carrito
let listaCarrito={}
let listaCarritoJSON=JSON.parse(localStorage.getItem('listaCarrito'))
let productos
let x=''
let inicio=document.getElementById('inicio')
let carritoEmoji=document.getElementById('carrito-icon')
let info=document.getElementById('informacion')
//todo el html dentro de body abajo, menos navbar
let home=`

<div id="portada">
<div id="logo">
<i id="auto" class="fa fa-car"></i>
<h3>Bs As Customs</h3>
</div>
</div>


<div class="items">
<h1>Productos</h1>
</div>


<div id="carouselExampleCaptions" class="carousel slide cursor" data-bs-ride="carousel">
<div class="carousel-indicators">
  <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
  <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
  <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
</div>
<div class="carousel-inner">
  <div class="carousel-item active" id="bs">
      <div class="producto">
        <h1 class="titulo">Buzos y Sueters</h1>
      </div>
  </div>
  <div class="carousel-item" id="rm">
    <div class="producto">
      <h1 class="titulo">Remeras y Musculosas</h1>
    </div>
  </div>
  <div class="carousel-item" id="sj">
    <div class="producto">
      <h1 class="titulo">Shorts y Joggings</h1>
    </div>
  </div>
</div>
<button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Previous</span>
</button>
<button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
  <span class="carousel-control-next-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Next</span>
</button>
</div>

<div class="items">
<h1>Carrito</h1>
</div>

<div id="carrito">
<button id="verCarrito">Ver Carrito</button>
</div>

<div class="items" id="info">
<h1>Sobre Nosotros</h1>
</div>
<hr>
<div id="info"><h6>Somos una empresa que sabe lo que está a la vanguardia y que ofrece productos que destacan en su calidad y estilo. Como nos importan nuestros clientes, cualquier consulta será bienvenida a través de nuestras redes, en el pie de la página.</h6></div>

<div class="bg-dark text-center text-white" id="contacto">
<footer>
    <div class="container">
        <div class="row">
            <div id="direccion" class="col-sm-6">
                <h3 id="direccion2">¡Gracias por visitarnos!</h3>
                <br>
               <p id="avenida">¡No dudes en escribirnos!</p>
            </div>
            <div class="col-sm-6">
                <div id="redes">
                    <h3>Redes Sociales</h3>
                </div>
                    <div class="container p-4">
                        <!-- Section: Social media -->
                        <section class="mb-4">
                          <!-- Facebook -->
                          <a class="btn btn-outline-light btn-floating m-1" href="https://www.instagram.com/felipedurini/" role="button"
                            ><i class="gg-instagram"></i>
                          </a>
                          <a class="btn btn-outline-light btn-floating m-1" href="https://www.linkedin.com/in/felipe-durini-94b883206/" role="button"
                            ><i class="fa fa-linkedin" id="linkedin" aria-hidden="true"></i>
                          </a>
            </div>
        </div>
        <p class="copyright">Copyright © Bs As Customs</p>
    </div>
</footer>
</div>`

//traer los porductos desde json
function traerJson(){
  fetch('.//data.json')
  .then(respuesta=>respuesta.json())
  .then(respuesta=>productos=respuesta)
}
traerJson()

//Cada vez que toque inicio en el navbar vuelvo al menu
inicio.addEventListener('click',function(){
  container.innerHTML=home
        let carrito=document.getElementById('carrito')
       botonesProductos()
        carrito.addEventListener('click', mostrarCarrito)
})
info.addEventListener('click',function(){
  container.innerHTML=home
        let carrito=document.getElementById('carrito')
       botonesProductos()
        carrito.addEventListener('click', mostrarCarrito)
})

//si el valor almacenado en JSON NO esta vacio voy a usar ese valor. Si está vacio uso el original (array vacio:'[]')
if(contadorJSON){
    contador=contadorJSON
}
//lo mismo
if(listaCarritoJSON){
    listaCarrito=listaCarritoJSON
}
//funcion a continuacion para actualizar el numerito arriba del carrito
actualizarNumCarrito()
function actualizarNumCarrito(){
  carritoEmoji.innerHTML=`<i class="fa badge fa-lg" value="${contador.length}">&#xf07a;</i>`
}

//Cada categoria de productos (buzos, remeras, shorts, etc) va a tener un boton que filtre esos productos.
//Si bien agregar un evento boton por boton no es lo mas optimo, me resulto mas simple y como no voy a tener muchas categorias de productos no me parece tedioso. (Por cada categoria que agregue voy a tener que agregar uno de los de abajo)
//x va a ser el valor que toma la funcion mostrarProductos para filtrarlos, entonces si x es remera(por ej.), va a mostrar las remeras
//lo hago para el carousel y para el dropdown de la navbar
botonesProductos()
function botonesProductos(){
    let producto=document.getElementsByClassName('producto')
    let [a,b,c,d,e,f]=producto
a.addEventListener('click',function(){
    x='buzo'
    y='sueter'
      mostrarProductos(x,y)
})
d.addEventListener('click',function(){
  x='buzo'
  y='sueter'
    mostrarProductos(x,y)
})
b.addEventListener('click',function(){
    x='remera'
    y='musculosa'
    mostrarProductos(x,y)
})
e.addEventListener('click',function(){
  x='remera'
  y='musculosa'
    mostrarProductos(x,y)
})

c.addEventListener('click',function(){
    x='short'
    y='jogging'
    mostrarProductos(x,y)
})
f.addEventListener('click',function(){
    x='short'
    y='jogging'
    mostrarProductos(x,y)
})
}

carritoEmoji.addEventListener('click', mostrarCarrito)
carrito.addEventListener('click', mostrarCarrito)

//esta funcion es para crear un boton que al apretarlo, me lleve a la pagina de inicio. Con 'me lleve a la pagina de inicio' me refiero a:vaciar el body, llenarlo con home y darle funciones a los botones devuelta
function volverMenu(x){
    let reinicio=document.createElement('button')
    let botonMostrarCarrito=document.createElement('button')
    let botonPagar=document.createElement('button')

    botonPagar.innerHTML='PAGAR'
    botonPagar.classList.add('home-carrito')

    botonMostrarCarrito.innerHTML='CARRITO'
    botonMostrarCarrito.classList.add('home-carrito')

    reinicio.innerHTML='INICIO'
    reinicio.classList.add('home-carrito') //para editarlo dsps en css
    reinicio.addEventListener('click',function(){
        container.innerHTML=home
        let carrito=document.getElementById('carrito')
       botonesProductos()
        carrito.addEventListener('click', mostrarCarrito)
    })

    botonMostrarCarrito.addEventListener('click',mostrarCarrito)
    botonPagar.addEventListener('click',function(){
      swal("¡Gracias por llegar hasta aca!", "La pagina sigue siendo un proyecto, pero va a funcionar completamente algun dia", "success");
      contador=[]
      container.innerHTML=''
      actualizarNumCarrito()
      container.appendChild(reinicio)
    })
    
    container.appendChild(reinicio)
    //esto es para que si estoy en el carrito no muestre el boton de carrito
    if(x){
    contador.length>0 ? container.appendChild(botonPagar) : container.appendChild(botonMostrarCarrito)}
}

//funcion que voy a usar varias veces para encontrar productos
//recibe arreglo de objs y nombre. Devuelve un objeto
function encontrarProducto(arr,name){
    return arr.find(x=>x.nombre===name)
}

//funcion que voy a usar para calcular el total
function calcularTotal(){
    let precios=contador.map(x=>x.precio)
    let answer=precios.reduce((acc,item)=>acc+item,0)
    return answer===0 ? '' : '$' + answer
}


//funcion para mostrar los productos
function mostrarProductos(valor, otroValor){
    //vacio el container
    container.innerHTML=''
    //creo una variable que dentro de esta funcion va a ser global
    let item=''
    let botonesAgregar=document.getElementsByClassName('agregar')
    let row=document.createElement('div')
        row.classList.add('row')
        let productosFiltrados=productos.filter(x=>x.nombre.includes(valor) || x.nombre.includes(otroValor))
    
    //voy a crear un grid con los productos que hay y despues un arr de botones, para despues agregarles eventos
    for (const producto of productosFiltrados){
        const{img,nombre,precio}=producto
        let col=document.createElement('div')
        col.classList.add('col-sm-1', 'col-lg-3')
        col.innerHTML=`<div class="card" style="width: 18rem;">
        <img src="${img}" class="card-img-top" alt="...">
        <div class="card-body" id="card-${nombre}">
          <h5 class="card-title">${nombre}</h5>
          <p class="card-text">$${precio}</p>
          <button class="btn btn-primary agregar">añadir al carrito</a>
        </div>
      </div>`
      row.appendChild(col)
      container.appendChild(row)
    }
    
    
    //agrego los eventos
        for(i=0;i<botonesAgregar.length;i++){
            botonesAgregar[i].value=productosFiltrados[i].nombre
            }
    //eventos para botones de agregar
        for (const  boton of botonesAgregar){
            boton.addEventListener('click',function(){
                item=boton.value
                listaCarrito={}
                //cada vez que agregue algo va a recorrer el contador y crear el objeto listacarrito
                contador.push(encontrarProducto(productos, item))
                //cada vez que agrego un producto aumenta el numero al lado del emji del carrito
                actualizarNumCarrito()
                guardarLocal('contador',JSON.stringify(contador))
                //crea un objeto asi {remeras blancas:1, remeras negras:2, etc.}
                for(const prod of contador){
                    //si no existe dentro de listaCarrito
                    if(!(listaCarrito[prod.nombre])){
                        listaCarrito[prod.nombre]=1
                        listaCarrito['subtotal'+prod.index]=prod.precio
                        listaCarrito['precio']=prod.precio
                        guardarLocal('listaCarrito',JSON.stringify(listaCarrito))
                    }
                    else{
                        listaCarrito[prod.nombre]++
                        listaCarrito['subtotal'+prod.index]+=prod.precio
                        guardarLocal('listaCarrito',JSON.stringify(listaCarrito))
                    }
                }
                toast(`${item} agregado con exito.`)
    }
            )}
            volverMenu(true)
  }


//esta funcion va a mostrarme el carrito
function mostrarCarrito(){
if(contador.length===0){
    container.innerHTML='<h1>Su carrito esta vacio</h1>'
    volverMenu()
}
else{
    //vacío el body
   container.innerHTML=''
   let div=document.createElement('div')
   //total lo cree al principio, es una variable global
    total.innerHTML='Total: ' +calcularTotal()
    div.appendChild(total)
    container.appendChild(div)
    //recorro el contador
   for(const producto of contador){
       if(document.getElementById(producto.nombre)){
        //si el item ya existe lo borro, porque sino cada vez que lo cree se va a repetir
        container.removeChild(document.getElementById(producto.nombre))
        //lo creo
        new ItemCarrito(producto.nombre,listaCarrito[producto.nombre],listaCarrito['subtotal'+producto.index],producto.precio,producto['index'])
       }
       else{
           //si no existe lo creo
        new ItemCarrito(producto.nombre,listaCarrito[producto.nombre],listaCarrito['subtotal'+producto.index],producto.precio,producto['index'])
       }
    }
    //creo el boton para volver al menu
   volverMenu(true)
}
}

//esta clase la voy a usar para crear las cards que estan en el carrito
class ItemCarrito {
    constructor(nombreProducto, cantidad, costo, precio, index){
        this.crearDiv(nombreProducto, cantidad, costo, precio, index)
    }
    crearDiv(nombreProducto, cantidad, costo, precio, index){
        //creo un boton
        let botonEliminar=document.createElement('button')
        botonEliminar.innerHTML='Eliminar producto'
        //le doy clases, una de bootstrap y otra por si lo quiero editar con css
        botonEliminar.classList.add('boton-eliminar', 'btn-danger')

        let p=document.createElement('p')

        let div=document.createElement('div')

        //le agrego al div una clase de bootstrap y otra por si lo quiero editar
        div.classList.add('eliminar', 'card')
        //le agrego id xq despues me fijo si ya existe
        div.id=nombreProducto
        p.innerHTML=`${nombreProducto} | Cantidad: ${cantidad} | Precio: $${precio} | Subtotal: $${costo}`
        
        div.appendChild(p)
        
        div.appendChild(botonEliminar)

        
        container.appendChild(div)

        //le agrego funcion al boton
        botonEliminar.addEventListener('click',function(){
            //si hay mas de uno va a bajar la cantidad, el costo se actualiza, esto lo materializo editando el innerhtml
            if(cantidad>1){
                cantidad--;
                costo-=precio
                div.innerHTML=`<p>${nombreProducto} | Cantidad: ${cantidad} | Precio: $${precio} | Subtotal: $${costo}</p>`
                div.appendChild(botonEliminar)
                contador.splice(contador.indexOf(encontrarProducto(contador,nombreProducto)),1)
                actualizarNumCarrito()
                listaCarrito[nombreProducto]=cantidad
                listaCarrito['subtotal'+index]=costo
                total.innerHTML='Total: ' +calcularTotal()
                guardarLocal('contador',JSON.stringify(contador))
                guardarLocal('listaCarrito',JSON.stringify(listaCarrito))
            }
            else{
                container.removeChild(div)
                contador.splice(contador.indexOf(encontrarProducto(contador,nombreProducto)),1)
                actualizarNumCarrito()
                listaCarrito[nombreProducto]=cantidad
                listaCarrito['subtotal'+index]=costo
                if(contador.length===0){
                 total.innerHTML=''
                container.innerHTML='<h1>Su carrito esta vacio</h1>'
                volverMenu()}
                else{
                  total.innerHTML='Total: ' +calcularTotal()}
                guardarLocal('contador',JSON.stringify(contador))
                guardarLocal('listaCarrito',JSON.stringify(listaCarrito))
            }
            toast(`${nombreProducto} eliminado con exito.`)
        })
    }
}


/*
JSON
*/

const guardarLocal = (clave,valor) => {
    localStorage.setItem(clave,valor)
}

/* 
Toastify
*/

function toast(x){
Toastify({
  text: x,
  duration: 1500,
  newWindow: true,
  close: false,
  gravity: "top", // `top` or `bottom`
  position: "center", // `left`, `center` or `right`
  stopOnFocus: true, // Prevents dismissing of toast on hover
  style: {
    background:'#edf6f9',
    color:'black',
  },
  onClick: function(){} // Callback after click
}).showToast();
}





