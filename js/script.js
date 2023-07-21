document.addEventListener("DOMContentLoaded", () => {
  cargarProductos();
  carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito.forEach((itemCarrito) => carritoHTML(itemCarrito));
  modalCarrito.classList.add("modal-oculto");
  carritoVisible = false;
  actualizarCarrito();
  let filtroDefault = document.querySelector('#filtro');
  filtroDefault.selectedIndex = 0;
});


let productos = [];
let carrito = [];
const modalCarrito = document.querySelector(".carrito-container");
const botonCarrito = document.querySelector("#carrito");
const contenedor = document.querySelector("#contenedor");
let contenedorCarrito;
let carritoVisible = false;

async function cargarProductos() {
  try {
    const response = await fetch("/json/productos.json");
    const data = await response.json();
    productos = data.productos;
    mostrarProductos(productos, "todos");
  } catch {
    Swal.fire({
      icon: "error",
      title: "Ups...",
      text: "Algo salió mal!",
      footer: "Intentelo nuevamente en unos instantes.",
    });
}}

function guardarCarrito(carrito) {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function mostrarProductos(productos, sexoSeleccionado) {
  contenedor.innerHTML = "";
  productos.forEach(function (producto) {
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
      imagen.addEventListener("mouseover", function () {
        imagen.src = imagenLateral;
      });
      imagen.addEventListener("mouseout", function () {
        imagen.src = producto.imagen;
      });
    }
  });
  
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
        timer: 1000,
        imageUrl: productoAgregado.imagen,
        imageWidth: 350,
        imageHeight: 300,
        imageAlt: "foto de producto",
        showConfirmButton: false,
      });
      actualizarCarrito();
    });
  });
}

const opcionesFiltro = document.querySelector("#filtro");
opcionesFiltro.addEventListener("change", function () {
  const opcionSeleccionada = this.value;
  mostrarProductos(productos, opcionSeleccionada);
});

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
    if (carrito.length === 0) {
      Toastify({
        text: "El carrito esta vacio!",
        className: "info",
        duration: 3000,
        position: "center",
      }).showToast();
    } else {
      fncVaciarCarrito();
    }
  }
});

function eliminarProducto(id) {
  const index = carrito.findIndex((producto) => producto.id === id);
  if (index !== -1) {
    carrito.splice(index, 1);
    guardarCarrito(carrito);
    actualizarCarrito();
  }
  fncVaciarCarrito();
}

function carritoHTML(itemCarrito) {
  if (itemCarrito === null) {
    return;
  }
  contenedorCarrito = document.createElement("div");
  contenedorCarrito.classList.add("item-carrito");
  contenedorCarrito.innerHTML = `
            <img src='${itemCarrito.imagen}'>
            <div class="item-texto">
            <h3>${itemCarrito.nombre}</h3>
            <p>$${itemCarrito.precio.toFixed(2)}</p>
            </div>`;
  const btnEliminar = document.createElement("button");
  btnEliminar.classList.add("eliminar");
  btnEliminar.innerHTML = "<img src='/img/basura.svg'>";
  btnEliminar.addEventListener("click", () => {
    eliminarProducto(itemCarrito.id);
  });
  contenedorCarrito.appendChild(btnEliminar);
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

function fncVaciarCarrito(){
  const btnVaciarCarrito = document.createElement("button");
      btnVaciarCarrito.id = "vaciar-carrito";
      btnVaciarCarrito.textContent = "Vaciar Carrito";
      btnVaciarCarrito.addEventListener("click", vaciarCarrito);
      modalCarrito.appendChild(btnVaciarCarrito);
}