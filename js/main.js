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
        localStorage.setItem("plantas", JSON.stringify(nuevoProducto))
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
    const cuenta = memoria.reduce((acum, current => acum + current.cantidad,0));
    cuentaCarritoElement.innerText = cuenta;
    
}