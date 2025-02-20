const contenedorTarjetas = document.getElementById("productos-container")

function crearTarjetasProductosInicio(productos){
    productos.forEach(producto => {
        const nuevaPlanta = document.createElement("div");
        nuevaPlanta.classList = "tarjeta-producto";
        nuevaPlanta.innerHTML = `
        
        <img src=${producto.img}>
        <h3>${producto.nombre}</h3>
        <p>${producto.precio}</p>
        <button>Agregar al carrito</button>
        `
        contenedorTarjetas.appendChild(nuevaPlanta);
        nuevaPlanta.getElementsByTagName("button")[0].addEventListener("click", ()=> agregarAlCarrito(producto))
    });
}

crearTarjetasProductosInicio(plantas);

function agregarAlCarrito(producto){
    const memoria = JSON.parse (localStorage.getItem("plantas"));
    let cuenta = 0;
    if(!memoria){
        const nuevoProducto = getNuevoProductoParaMemoria(producto);
        localStorage.setItem("plantas", JSON.stringify([nuevoProducto]));
        cuenta = 1;
    }else{
        const indiceProducto = memoria.findIndex(planta => planta.id == producto.id)
        const nuevaMemoria = memoria;
        if(indiceProducto == -1){
            nuevaMemoria.push(getNuevoProductoParaMemoria(producto))        
            cuenta = 1;
        }else{
            nuevaMemoria[indiceProducto].cantidad++;
            cuenta = nuevaMemoria[indiceProducto].cantidad;
        }
        localStorage.setItem("plantas", JSON.stringify(nuevaMemoria));
    }
    actualizarNumeroCarrito();
    return cuenta;
}

function restarAlCarrito (producto){
    const memoria = json.parse(localStorage.getItem("plantas"));
    const indiceProducto = memoria.findIndex(planta => planta.id == producto.id);
    if(memoria[indiceProducto].cantidad === 1){
        memoria.splice(indiceProducto,1);
        localStorage.setItem("plantas", JSON.stringify(memoria));
    }else{
        memoria[indiceProducto].cantidad--;
    }
    localStorage.setItem("plantas", JSON.stringify(memoria));
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