class LocalStorageOperation {
    
    static almacenarLibro(infoLibro){
        let arrayLibros = this.obtenerLS();
        arrayLibros.push(infoLibro);
        // console.log(arrayLibros);
        localStorage.setItem("Libros",JSON.stringify(arrayLibros));
    }

    static obtenerLS(){
        if(localStorage.getItem("Libros") == null){
            return []
        }else {
            // console.log("Si hay libros");
            return JSON.parse(localStorage.getItem("Libros"));
        }
    }

    static EliminarLS(idLibro) {
        console.log(localStorage.getItem("Libros"+idLibro));
        let arrayLibros = this.obtenerLS();
        let arrayNuevo = [];

        for (var i = 0; i < arrayLibros.length; i++) {
            if (idLibro != arrayLibros[i].id)
                arrayNuevo.push(arrayLibros[i]);
        }
        localStorage.setItem('Libros',JSON.stringify(arrayNuevo));
    }

    static VaciarLS() {
        localStorage.clear();
    }

    static ultimoId() {
        let arrayLibros = this.obtenerLS();
        if(arrayLibros.length != 0) 
            return (arrayLibros[arrayLibros.length - 1].id);
        else
            return 0;
    }


    static BuscarTitulo(titulo) {

        let arrayLibros = this.obtenerLS();

        let resultado = '';
        for(let i=0; i<arrayLibros.length; i++) {
            if (arrayLibros[i].titulo.toLowerCase() == titulo) 
                resultado = arrayLibros[i];
        }
        return resultado;
    }

    static EditarLS(infoLibro) {
        let arrayLibros = this.obtenerLS();
        let arrayNuevo = [];

        for (var i = 0; i < arrayLibros.length; i++) {
            if (infoLibro.id == arrayLibros[i].id)
                arrayNuevo.push(infoLibro);
            else {
                arrayNuevo.push(arrayLibros[i]);
            }
        }
        localStorage.setItem('Libros',JSON.stringify(arrayNuevo));
    }
}