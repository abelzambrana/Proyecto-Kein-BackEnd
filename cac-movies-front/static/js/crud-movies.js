class Cereal{

    constructor(id,nombre,fabricante,rating,dueDate,banner){
        this.id=id;
        this.nombre=nombre;
        this.fabricante=fabricante;
        this.rating=rating;
        this.dueDate=dueDate;
        this.banner=banner
    }

}

// const movie1 = new Movie(1,'Damsel','Un director',4.5,'2024-03-01','https://image.tmdb.org/t/p/w500//sMp34cNKjIb18UBOCoAv4DpCxwY.jpg');

// const movie2 = new Movie(2,'Dune 2','Un director 2',5,'2024-04-01','https://image.tmdb.org/t/p/w500//8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg');

// const movie3 = new Movie(3,'Kunfu panda 4','Un director 2',5,'2024-04-01','https://image.tmdb.org/t/p/w500//kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg');

// let movies = [movie1,movie2,movie3];

// localStorage.setItem('movies',JSON.stringify(movies));

// console.log(movies);

function showCereals(){
    
    //BUSCAR LO QUE HAY EN LOCAL STORAGE
    let cereals = JSON.parse(localStorage.getItem('cereals')) || [];

    //buscar elemento HTML donde quiero insertar las peliculas
    const tbodyCereals = document.querySelector('#list-table-cereals tbody');
    // const tbodyMovies = document.getElementById('#tbody-table-movies');
    //limpio el contenido de la tabla
    tbodyCereals.innerHTML = '';
    cereals.forEach(cereal => {
        //TEMPLATE STRING - TEMPLATE LITERAL 
        const tr = `
                    <tr>
                        <td>${cereal.nombre}</td>
                        <td>${cereal.fabricante}</td>
                        <td>${cereal.rating}</td>
                        <td>${cereal.dueDate}</td>
                        <td>
                            <img src="${cereal.banner}" alt="${cereal.nombre}" width="30%">
                        </td>
                        <td>
                            <button class="btn-cac" onclick='updateCereal(${cereal.id})'><i class="fa fa-pencil" ></button></i>
                            <button class="btn-cac" onclick='deleteCereal(${cereal.id})'><i class="fa fa-trash" ></button></i>
                        </td>
                    </tr>
        `;
        tbodyCereals.insertAdjacentHTML('beforeend',tr);
    });

}

/**
 * funcion que permite agregar o modificar una pelicula al listado de peliculas
 * almacenado en el localstorage
 */
function saveCereal(){
    
    //Obtengo el elemento HTML del formulario
    const form = document.querySelector('#form-cereal');

    //obtengo los inputs del formulario
    const inputId = document.querySelector('#id-cereal');
    const inputNombre = document.querySelector('#nombre');
    const inputFabricante = document.querySelector('#fabricante');
    const inputRating = document.querySelector('#rating');
    const inputDueDate = document.querySelector('#due-date');
    const inputBanner = document.querySelector('#banner-form');

    //Realizo una validación simple de acuerdo al contenido del value del input del titulo
    if(inputNombre.value.trim() !== ''){
        //Busca en localstorage el item movies, si no existe asigna el array vacio.
        let cereals = JSON.parse(localStorage.getItem('cereals')) || [];

        //Si el input de ID es distinto de vacio, es porque se trata de una acción de UPDATE
        if(inputId.value!==""){
            //Busco dentro del arraya de movies el objeto a editar
            const cerealFind = cereals.find(cereal => cereal.id == inputId.value);
            //Si existe actualizo el objeto
            if (cerealFind) {
              cerealFind.nombre = inputTitle.value;
              cerealFind.fabricante = inputDirector.value;
              cerealFind.rating = inputRating.value;
              cerealFind.dueDate = inputDueDate.value;
              cerealFind.banner = inputBanner.value;
            }
        }else{
            let newCereal = new Cereal(
                cereals.length+1,
                inputNombre.value,
                inputFabricante.value,
                inputRating.value,
                inputDueDate.value,
                inputBanner.value,
            );
            movies.push(newMovie);
        }

        //Se actualiza el array de peliculas en el localstorage
        localStorage.setItem('cereals',JSON.stringify(cereals));
        showCereals();
        //Se limpian los inputs del formulario
        form.reset();
        Swal.fire({
            title: 'Exito!',
            text: 'Operacion exitosa.',
            icon: 'success',
            confirmButtonText: 'Cerrar'
        })
    }else{
        Swal.fire({
            title: 'Error!',
            text: 'Por favor completa el campo Titulo.',
            icon: 'error',
            confirmButtonText: 'Cerrar'
        });
    }

}

/**
 * Function que permite cargar el formulario para editar una pelicula
 * de acuedo al id de la pelicula
 * @param {number} cerealId id movie que se va a actualizar
 */
function updateCereal(cerealId){
    let cereals = JSON.parse(localStorage.getItem('cereals'));
    //se utiliza el metodo find para poder asegurarnos que exista una pelicula con el id que queremos eliminar.
    let cerealToUpdate = cereals.find(cereal => cereal.id===cerealId);
    if(cerealToUpdate){
        //Se buscan los elementos HTML del input
        const inputId = document.querySelector('#id-cereal');
        const inputNombre = document.querySelector('#nombre');
        const inputFabricante = document.querySelector('#fabricante');
        const inputRating = document.querySelector('#rating');
        const inputDueDate = document.querySelector('#due-date');
        const inputBanner = document.querySelector('#banner-form');
        //Se cargan los inputs con los valores de la pelicula encontrada
        inputId.value = cerealToUpdate.id;
        inputNombre.value = cerealToUpdate.nombre;
        inputFabricante.value = cerealToUpdate.fabricante;
        inputRating.value = cerealToUpdate.rating;
        inputDueDate.value = cerealToUpdate.dueDate;
        inputBanner.value = cerealToUpdate.banner;
    }
}

/**
 * Function que permite eliminar una pelicula del array del localstorage
 * de acuedo al indice del mismo
 * @param {number} cerealId id movie que se va a eliminar
 */
function deleteCereal(cerealId){
    let cereals = JSON.parse(localStorage.getItem('cereals'));
    //se utiliza el metodo find para poder asegurarnos que exista una pelicula con el id que queremos eliminar.
    let cerealToDelete = cereals.find(cereal => cereal.id===cerealId);
    if(cerealToDelete){
        //se utiliza el metodo filter para actualizar el array de movies, sin tener el elemento encontrado en cuestion.
        cereals = cereals.filter(cereal => cereal.id !== cerealToDelete.id);
        //se actualiza el localstorage
        localStorage.setItem('cereals',JSON.stringify(cereals));
        showCereals();
        Swal.fire({
            title: 'Exito!',
            text: 'El producto fue eliminado.',
            icon: 'success',
            confirmButtonText: 'Cerrar'
        })
    }
}

// NOS ASEGURAMOS QUE SE CARGUE EL CONTENIDO DE LA PAGINA EN EL DOM
document.addEventListener('DOMContentLoaded',function(){

    const btnSaveCereal = document.querySelector('#btn-save-cereal');

    //ASOCIAR UNA FUNCION AL EVENTO CLICK DEL BOTON
    btnSaveCereal.addEventListener('click',saveCereal);
    showCereals();
});
