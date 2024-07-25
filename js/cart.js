const contenedorTarjetas = document.getElementById("productos-container")

function crearTarjetasProductosInicio(){
    contenedorTarjetas.innerHTML = "";
    const productos = JSON.parse(localStorage.getItem("plantas"));

    if(productos && productos.length > 0){

    productos.forEach(producto => {
        const nuevaPlanta = document.createElement("div");
        nuevaPlanta.classList = "tarjeta-producto";
        nuevaPlanta.innerHTML = `
        
        <img src=${producto.img}>
        <h3>${producto.nombre}</h3>
        <p>${producto.precio}</p>
        <div>
        <button>-</button>
        <span class="cantidad">${producto.cantidad}</span>
        <button>+</button>
        </div>
        `;
        contenedorTarjetas.appendChild(nuevaPlanta);
        nuevaPlanta.getElementsByTagName("button")[1].addEventListener("click", (e)=> {
        const cuentaElement = e.target.parentElement.getElementsByTagName("span")[0];
        cuentaElement.innerText = agregarAlCarrito(producto);
        actualizarTotales();
        });
        
        nuevaPlanta.getElementsByTagName("button")[0].addEventListener("click", (e)=> {
            restarAlCarrito(producto)
            crearTarjetasProductosInicio();     
            actualizarTotales();      
        });
        
    });
}
}

crearTarjetasProductosInicio();
actualizarTotales();

function actualizarTotales(){
    const productos = JSON.parse(localStorage.getItem("plantas"));
    let unidades = 0;
    let precio = 0;
    if(productos && productos.length >0){
        productos.forEach(producto =>{
            unidades += producto.cantidad;
            precio += producto.precio * producto.cantidad;

        });
        unidadesElement.innerText = cantidad;
        precioElement.innerText = precio;
    }
}

function agregarAlCarrito(producto){
    const memoria = JSON.parse (localStorage.getItem("plantas"));
    if(!memoria){
        const nuevoProducto = getNuevoProductoParaMemoria(producto);
        localStorage.setItem("plantas", JSON.stringify([nuevoProducto]));
    }else{
        const indiceProducto = memoria.findIndex(planta => planta.id == producto.id)
        const nuevaMemoria = memoria;
        if(indiceProducto == -1){
            nuevaMemoria.push(getNuevoProductoParaMemoria(producto))        
        }else{
            nuevaMemoria[indiceProducto].cantidad++;
        }
        localStorage.setItem("plantas", JSON.stringify(nuevaMemoria))
    }
    actualizarNumeroCarrito();
}

function restarAlCarrito (producto){
    const memoria = json.parse(localStorage.getItem("plantas"));
    const indiceProducto = memoria.findIndex(planta => planta.id == producto.id);
    if(memoria[indiceProducto].cantidad === 1){
        memoria.splice(indiceProducto,1);
        localStorage.setItem("plantas", JSON.stringify(memoria));

    }
    actualizarNumeroCarrito();

}

function getNuevoProductoParaMemoria(producto){
    const nuevoProducto = producto;
    nuevoProducto.cantidad = 1;
    return nuevoProducto;
}

const cuentaCarritoElement = document.getElementById("cuenta-carrito");
function actualizarNumeroCarrito(){
    const memoria = JSON.parse(localStorage.getItem("plantas"));
    const cuenta = memoria.reduce((acum, current) =>acum+=current.cantidad,0);
    cuentaCarritoElement.innerText = cuenta;
    
}
actualizarNumeroCarrito();