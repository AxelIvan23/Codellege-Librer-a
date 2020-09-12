const autor = document.getElementById("inputAutor");
const titulo = document.getElementById("inputTitulo");
const tabla = document.getElementById("tbody");

const inputBuscar = document.getElementById("search");

var elemento = null;

const libro = new Libro();

const patern = /^[a-zA-ZÁ-ÿ0-9\s]{3,100}$/;

function eventListener(){
    document.getElementById("btnAdd").addEventListener("click",prepararLibro);
    document.getElementById("btnEdit").addEventListener("click",editar);
    document.getElementById("agregar").addEventListener("click",agregarLib);
    tabla.addEventListener("click",acciones);
    document.getElementById('buscar').addEventListener("click", buscarLibro);
    document.getElementById('btnVaciar').addEventListener("click", vaciarLibreria);
}

eventListener();
prepararDom();

function agregarLib() {
    let submit = document.getElementById('btnAdd');
    document.getElementById('btnEdit').classList = "btn btn-success btn-lg btn-block d-none";
    document.getElementById('btnAdd').classList = "btn btn-success btn-lg btn-block";
    autor.value = "";
    titulo.value = "";
}

function prepararLibro(){
    let ulti_id = Number(LocalStorageOperation.ultimoId());

    if((autor.value != "" && titulo.value != "") && (patern.test(autor.value) && patern.test(titulo.value)) && (Repetido() == true)){
        
        const infoLibro = {
            id: ulti_id+1,
            titulo: titulo.value.trim(),
            autor: autor.value.trim(),

        }
        
        let tr = libro.agregar(infoLibro);
        tabla.appendChild(tr);
        LocalStorageOperation.almacenarLibro(infoLibro);

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Se ha agregado el libro',
            showConfirmButton: false,
            timer: 1000
          })
        autor.value = "";
        titulo.value = "";
    }else{
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Datos no válidos',
            showConfirmButton: false,
            timer: 1000
          })
    }
    
    
}

function acciones(event){
    if(event.target.tagName === 'I' || event.target.tagName === 'BUTTON'){
        if(event.target.className.includes("btn-warning") || event.target.className.includes("fa-trash")){
            libro.eliminar(event.target);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Libro eliminado',
                showConfirmButton: false,
                timer: 1000
              })
        }
        // libro.eliminar(event.target.tagName);
        if (event.target.className.includes("btn-success") || event.target.className.includes("fas fa-edit")) {
            if (event.target.className.includes("fas fa-edit"))
                elemento = event.target.parentElement;
            else
                elemento = event.target;
            document.getElementById('btnAdd').classList = "btn btn-success btn-lg btn-block d-none";
            document.getElementById('btnEdit').classList = "btn btn-success btn-lg btn-block";
            document.getElementById('exampleModalLabel').innerHTML = "Ingresa los nuevos valores";
            autor.placeholder = elemento.parentElement.parentElement.parentElement.children[1].innerHTML;
            titulo.placeholder =elemento.parentElement.parentElement.parentElement.children[2].innerHTML;
            console.log(autor.value);
        }
    }

}

function prepararDom(){
    const librosLS = LocalStorageOperation.obtenerLS();
    console.log(librosLS);

    for(let i = 0; i < librosLS.length; i++){
        console.log("instancia " + i);
        const instanciaLibro = new Libro();
        tabla.appendChild(instanciaLibro.agregar(librosLS[i]));
    }
}

function vaciarLibreria() {
    while(tabla.firstChild) {
        tabla.firstChild.remove();
    }
    LocalStorageOperation.VaciarLS();
}

function buscarLibro(event) {

    event.preventDefault();
    if (inputBuscar.value != '') {
        let resultado = LocalStorageOperation.BuscarTitulo(inputBuscar.value.trim().toLowerCase());
        if (resultado != '') {
            Swal.fire(
                'Busqueda Exitosa',
                `El libro con titulo ${resultado.titulo} tiene el id ${resultado.id} y fue escrito por ${resultado.autor}`,
                'success'
            );
        } else {
            Swal.fire(
                'Sin resultados',
                `No existe un libro con titulo ${inputBuscar.value}`,
                'error'
            );
        }
        inputBuscar.value = '';
        LocalStorageOperation.BuscarTitulo();
    }
}

function Repetido() {
    let arrayLibros = LocalStorageOperation.obtenerLS();

    for (var i = 0; i < arrayLibros.length; i++) {
        if (arrayLibros[i].autor.trim().toLowerCase() == autor.value.trim().toLowerCase() && arrayLibros[i].titulo.trim().toLowerCase() == titulo.value.trim().toLowerCase()) {
            console.log(arrayLibros[i].autor.trim().toLowerCase());
            return false;
        }
    }
    return true;
}

function editar() {
    if((autor.value != "" && titulo.value != "") && (patern.test(autor.value) && patern.test(titulo.value)) && (Repetido() == true)) {
        const infoLibro = {
            id: elemento.parentElement.parentElement.parentElement.id,
            titulo: titulo.value.trim(),
            autor: autor.value.trim(),

        }
        console.log("KA: "+infoLibro.id);
        LocalStorageOperation.EditarLS(infoLibro);
        elemento.parentElement.parentElement.parentElement.children[1].innerHTML = titulo.value;
        elemento.parentElement.parentElement.parentElement.children[2].innerHTML = autor.value;
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Se ha modificado el libro',
            showConfirmButton: false,
            timer: 1000
          })
    } else {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Datos no válidos, no se modificó',
            showConfirmButton: false,
            timer: 1000
          })
    }
}