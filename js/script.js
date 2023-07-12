document.addEventListener("DOMContentLoaded", () => {
  carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito.forEach((itemCarrito) => carritoHTML(itemCarrito));
  modalCarrito.classList.add("modal-oculto");
  carritoVisible = false;
  actualizarCarrito();
});

class Producto {
  constructor(id, nombre, precio, imagen, imagenLateral, sexo) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.imagen = imagen;
    this.imagenLateral = imagenLateral;
    this.sexo = sexo;
  }
}
const productos = [
  new Producto(
    1,
    "Anzarun Lite",
    3000,
    "assets/hombre/anzarun-lite-slip-on-m-marino-blanco.jpg",
    "assets/hombre/anzarun-lite-slip-on-m-marino-blanco2.jpg",
    "masculino"
  ),
  new Producto(
    2,
    "Future Play",
    3400,
    "assets/hombre/futbol-11-future-play-azul-naranja.jpg",
    "assets/hombre/futbol-11-future-play-azul-naranja2.jpg",
    "masculino"
  ),
  new Producto(
    3,
    "Graviton",
    3500,
    "assets/hombre/graviton-mns-negro-blanco-lima.jpg",
    "assets/hombre/graviton-mns-negro-blanco-lima2.jpg",
    "masculino"
  ),
  new Producto(
    4,
    "Future Street",
    3200,
    "assets/hombre/pacer-future-street-gris-topo-azul-naranja.jpg",
    "assets/hombre/pacer-future-street-gris-topo-azul-naranja2.jpg",
    "masculino"
  ),
  new Producto(
    5,
    "R78 Trek",
    4000,
    "assets/hombre/r78-trek-negro-blanco-azul.jpg",
    "assets/hombre/r78-trek-negro-blanco-azul2.jpg",
    "masculino"
  ),
  new Producto(
    6,
    "Rebound Joy",
    3800,
    "assets/hombre/rebound-joy-mid-blanco-topo-negro.jpg",
    "assets/hombre/rebound-joy-mid-blanco-topo-negro2.jpg",
    "masculino"
  ),
  new Producto(
    7,
    "Smash 3.0",
    2900,
    "assets/hombre/smash-3-0-mns-mostaza-blanco.jpg",
    "assets/hombre/smash-3-0-mns-mostaza-blanco2.jpg",
    "masculino"
  ),
  new Producto(
    8,
    "Street Runner",
    4500,
    "assets/hombre/st-runner-v3-negro-blanco.jpg",
    "assets/hombre/st-runner-v3-negro-blanco2.jpg",
    "masculino"
  ),
  new Producto(
    9,
    "X-Ray Square",
    3300,
    "assets/hombre/x-ray-2-square-m-negro-azul-amarillo.jpg",
    "assets/hombre/x-ray-2-square-m-negro-azul-amarillo2.jpg",
    "masculino"
  ),
  new Producto(
    10,
    "Anzarun Lite Slip",
    3000,
    "assets/mujer/anzarun-lite-slip-on-w-rosa-oro.jpg",
    "assets/mujer/anzarun-lite-slip-on-w-rosa-oro2.jpg",
    "femenino"
  ),
  new Producto(
    11,
    "Comet 2 Beta",
    3300,
    "assets/mujer/comet-2-alt-beta-wns-rosa.jpg",
    "assets/mujer/comet-2-alt-beta-wns-rosa2.jpg",
    "femenino"
  ),
  new Producto(
    12,
    "Comet Fit",
    3400,
    "assets/mujer/fit-comet-lavanda.jpg",
    "assets/mujer/fit-comet-lavanda2.jpg",
    "femenino"
  ),
  new Producto(
    13,
    "Comet FTR",
    3400,
    "assets/mujer/ftr-connect-rosa-oro.jpg",
    "assets/mujer/ftr-connect-rosa-oro2.jpg",
    "femenino"
  ),
  new Producto(
    14,
    "R78 Voyage",
    4000,
    "assets/mujer/r78-voyage-wns-negro-orquidea-blanco.jpg",
    "assets/mujer/r78-voyage-wns-negro-orquidea-blanco2.jpg",
    "femenino"
  ),
  new Producto(
    15,
    "Remedie Slip",
    3600,
    "assets/mujer/remedie-slip-strap-wns-gris-topo-rosado.jpg",
    "assets/mujer/remedie-slip-strap-wns-gris-topo-rosado2.jpg",
    "femenino"
  ),
  new Producto(
    16,
    "Metallic Pop",
    3800,
    "assets/mujer/rose-metallic-pop-gris-plata.jpg",
    "assets/mujer/rose-metallic-pop-gris-plata2.jpg",
    "femenino"
  ),
  new Producto(
    17,
    "Rose Plus",
    3500,
    "assets/mujer/rose-plus-rosa-lila.jpg",
    "assets/mujer/rose-plus-rosa-lila2.jpg",
    "femenino"
  ),
  new Producto(
    18,
    "Wired Run",
    3900,
    "assets/mujer/wired-run-slipon-wns-lila-oro.jpg",
    "assets/mujer/wired-run-slipon-wns-lila-oro2.jpg",
    "femenino"
  ),
];
//VARIABLES
let carrito = [];
const modalCarrito = document.querySelector(".carrito-container");
const botonCarrito = document.querySelector("#carrito");
const contenedor = document.querySelector("#contenedor");
let contenedorCarrito;
let carritoVisible = false;

function guardarCarrito(carrito) {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}
//FUNCION PARA MOSTRAR PRODUCTOS
function mostrarProductos(productos, sexoSeleccionado) {
  //LIMPIAR HTML
  contenedor.innerHTML = "";
  //RECORRIENDO EL ARRAY DE PRODUCTOS
  productos.forEach(function (producto) {
    //IF PARA EL FILTRO
    if (producto.sexo === sexoSeleccionado || sexoSeleccionado === "todos") {
      const contenedorProductos = document.createElement("div");
      contenedorProductos.classList.add("tarjeta");
      contenedorProductos.innerHTML = `
                <img src="${producto.imagen}" data-imagen-lateral="${producto.imagenLateral}">
                <h3>${producto.nombre}</h3>
                <p>$${producto.precio}</p>
                <button class='agregar_carrito' id='${producto.id}'>Agregar al carrito</button>`;
      contenedor.appendChild(contenedorProductos);

      const imagen = contenedorProductos.querySelector("img");
      const imagenLateral = imagen.getAttribute("data-imagen-lateral");
      //EVENTO PARA CAMBIAR A IMAGEN LATERAL
      imagen.addEventListener("mouseover", function () {
        imagen.src = imagenLateral;
      });
      //EVENTO PARA VOLVER A LA IMAGEN PRINCIPAL
      imagen.addEventListener("mouseout", function () {
        imagen.src = producto.imagen;
      });
    }
  });
  //AGREGAR AL CARRITO
  const botonAgregar = document.querySelectorAll(".agregar_carrito");
  botonAgregar.forEach(function (boton) {
    boton.addEventListener("click", function () {
      modalCarrito.classList.add("modal-oculto");
      carritoVisible = false;
      const botonId = parseInt(this.id);
      const productoAgregado = productos.find(
        (producto) => producto.id === botonId
      );
      carrito.push(productoAgregado);
      guardarCarrito(carrito);

      Swal.fire({
        text: "Producto agregado al carrito!",
        imageUrl: productoAgregado.imagen,
        imageWidth: 350,
        imageHeight: 300,
        imageAlt: "foto de producto",
        confirmButtonText: "OK",
      });
      actualizarCarrito();
    });
  });
}
//EVENTO DE CAMBIO DE FILTRO
const opcionesFiltro = document.querySelector("#filtro");
opcionesFiltro.addEventListener("change", function () {
  const opcionSeleccionada = this.value;
  mostrarProductos(productos, opcionSeleccionada);
});
//BOTON CARRITO
botonCarrito.addEventListener("click", function () {
  if (carritoVisible) {
    modalCarrito.innerHTML = "";
    modalCarrito.classList.add("modal-oculto");
    carritoVisible = false;
  } else {
    modalCarrito.innerHTML = "";
    carrito.forEach(carritoHTML);
    modalCarrito.classList.remove("modal-oculto");
    carritoVisible = true;
    if(carrito.length===0){
      Toastify({
        text: "El carrito esta vacio!",
        className: "info",
        duration:3000,
        position:'center',
      }).showToast();
    }else{
    const btnVaciarCarrito = document.createElement("button");
    btnVaciarCarrito.id = "vaciar-carrito";
    btnVaciarCarrito.textContent = "Vaciar Carrito";
    btnVaciarCarrito.addEventListener("click", vaciarCarrito);
    modalCarrito.appendChild(btnVaciarCarrito);
    }
  }
});
//GENERAR HTML DEL CARRITO
function carritoHTML(itemCarrito) {
  contenedorCarrito = document.createElement("div");
  contenedorCarrito.classList.add("item-carrito");
  contenedorCarrito.innerHTML = `
            <img src='${itemCarrito.imagen}'>
            <div class="item-texto">
            <h3>${itemCarrito.nombre}</h3>
            <p>$${itemCarrito.precio}</p>
            </div>
            `;
  modalCarrito.appendChild(contenedorCarrito);
  const separador = document.createElement("hr");
  modalCarrito.appendChild(separador);
}

function actualizarCarrito() {
  modalCarrito.innerHTML = "";
  carrito.forEach(function (itemCarrito) {
    carritoHTML(itemCarrito);
  });
  if (carrito.length === 0) {
    modalCarrito.classList.add("modal-oculto");
    carritoVisible = false;
  }
}

function vaciarCarrito() {
  carrito = [];
  guardarCarrito(carrito);
  actualizarCarrito();
  modalCarrito.classList.add("modal-oculto");
  carritoVisible = false;
}

mostrarProductos(productos, "todos");
