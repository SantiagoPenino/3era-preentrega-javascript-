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
    "assets/hombre/anzarun-lite-slip-on-m-marino-blanco.webp",
    "assets/hombre/anzarun-lite-slip-on-m-marino-blanco2.webp",
    "masculino"
  ),
  new Producto(
    2,
    "Future Play",
    3400,
    "assets/hombre/futbol-11-future-play-azul-naranja.webp",
    "assets/hombre/futbol-11-future-play-azul-naranja2.webp",
    "masculino"
  ),
  new Producto(
    3,
    "Graviton",
    3500,
    "assets/hombre/graviton-mns-negro-blanco-lima.webp",
    "assets/hombre/graviton-mns-negro-blanco-lima2.webp",
    "masculino"
  ),
  new Producto(
    4,
    "Future Street",
    3200,
    "assets/hombre/pacer-future-street-gris-topo-azul-naranja.webp",
    "assets/hombre/pacer-future-street-gris-topo-azul-naranja2.webp",
    "masculino"
  ),
  new Producto(
    5,
    "R78 Trek",
    4000,
    "assets/hombre/r78-trek-negro-blanco-azul.webp",
    "assets/hombre/r78-trek-negro-blanco-azul2.webp",
    "masculino"
  ),
  new Producto(
    6,
    "Rebound Joy",
    3800,
    "assets/hombre/rebound-joy-mid-blanco-topo-negro.webp",
    "assets/hombre/rebound-joy-mid-blanco-topo-negro2.webp",
    "masculino"
  ),
  new Producto(
    7,
    "Smash 3.0",
    2900,
    "assets/hombre/smash-3-0-mns-mostaza-blanco.webp",
    "assets/hombre/smash-3-0-mns-mostaza-blanco2.webp",
    "masculino"
  ),
  new Producto(
    8,
    "Street Runner",
    4500,
    "assets/hombre/st-runner-v3-negro-blanco.webp",
    "assets/hombre/st-runner-v3-negro-blanco2.webp",
    "masculino"
  ),
  new Producto(
    9,
    "X-Ray Square",
    3300,
    "assets/hombre/x-ray-2-square-m-negro-azul-amarillo.webp",
    "assets/hombre/x-ray-2-square-m-negro-azul-amarillo2.webp",
    "masculino"
  ),
  new Producto(
    10,
    "Anzarun Lite Slip",
    3000,
    "assets/mujer/anzarun-lite-slip-on-w-rosa-oro.webp",
    "assets/mujer/anzarun-lite-slip-on-w-rosa-oro2.webp",
    "femenino"
  ),
  new Producto(
    11,
    "Comet 2 Beta",
    3300,
    "assets/mujer/comet-2-alt-beta-wns-rosa.webp",
    "assets/mujer/comet-2-alt-beta-wns-rosa2.webp",
    "femenino"
  ),
  new Producto(
    12,
    "Comet Fit",
    3400,
    "assets/mujer/fit-comet-lavanda.webp",
    "assets/mujer/fit-comet-lavanda2.webp",
    "femenino"
  ),
  new Producto(
    13,
    "Comet FTR",
    3400,
    "assets/mujer/ftr-connect-rosa-oro.webp",
    "assets/mujer/ftr-connect-rosa-oro2.webp",
    "femenino"
  ),
  new Producto(
    14,
    "R78 Voyage",
    4000,
    "assets/mujer/r78-voyage-wns-negro-orquidea-blanco.webp",
    "assets/mujer/r78-voyage-wns-negro-orquidea-blanco2.webp",
    "femenino"
  ),
  new Producto(
    15,
    "Remedie Slip",
    3600,
    "assets/mujer/remedie-slip-strap-wns-gris-topo-rosado.webp",
    "assets/mujer/remedie-slip-strap-wns-gris-topo-rosado2.webp",
    "femenino"
  ),
  new Producto(
    16,
    "Metallic Pop",
    3800,
    "assets/mujer/rose-metallic-pop-gris-plata.webp",
    "assets/mujer/rose-metallic-pop-gris-plata2.webp",
    "femenino"
  ),
  new Producto(
    17,
    "Rose Plus",
    3500,
    "assets/mujer/rose-plus-rosa-lila.webp",
    "assets/mujer/rose-plus-rosa-lila2.webp",
    "femenino"
  ),
  new Producto(
    18,
    "Wired Run",
    3900,
    "assets/mujer/wired-run-slipon-wns-lila-oro.webp",
    "assets/mujer/wired-run-slipon-wns-lila-oro2.webp",
    "femenino"
  ),
];

const carrito = [];
const modalCarrito = document.querySelector(".carrito-container");
let contenedorCarrito;

//FUNCION PARA MOSTRAR PRODUCTOS
function mostrarProductos(productos, sexoSeleccionado) {
  const contenedor = document.querySelector("#contenedor");
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
      const botonId = parseInt(this.id);
      const productoAgregado = productos.find(
        (producto) => producto.id === botonId
      );
      carrito.push(productoAgregado);
    });
  });
}
//EVENTO DE CAMBIO DE FILTRO
const opcionesFiltro = document.querySelector('#filtro');
opcionesFiltro.addEventListener('change', function () {
  const opcionSeleccionada = this.value;
  mostrarProductos(productos, opcionSeleccionada);
});
//BOTON CARRITO
const botonCarrito = document.querySelector('#carrito');
botonCarrito.addEventListener('click',function(){
  carrito.forEach(function(itemCarrito){
    contenedorCarrito=document.createElement('div');
    contenedorCarrito.classList.add('item-carrito');
    contenedorCarrito.innerHTML=`
              <img src='${itemCarrito.imagen}'>
              <h3>${itemCarrito.nombre}</h3>
              <p>$${itemCarrito.precio}</p>`;
              modalCarrito.appendChild(contenedorCarrito);
  });
});

mostrarProductos(productos, 'todos');