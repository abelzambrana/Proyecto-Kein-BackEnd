const BASEURL = 'http://127.0.0.1:5000';

/**
 * Función para realizar una petición fetch con JSON.
 * @param {string} url - La URL a la que se realizará la petición.
 * @param {string} method - El método HTTP a usar (GET, POST, PUT, DELETE, etc.).
 * @param {Object} [data=null] - Los datos a enviar en el cuerpo de la petición.
 * @returns {Promise<Object>} - Una promesa que resuelve con la respuesta en formato JSON.
 */
async function fetchData(url, method, data = null) {
  const options = {
      method: method,
      headers: {
          'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : null,  // Si hay datos, los convierte a JSON y los incluye en el cuerpo
  };
  try {
    const response = await fetch(url, options);  // Realiza la petición fetch
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return await response.json();  // Devuelve la respuesta en formato JSON
  } catch (error) {
    console.error('Fetch error:', error);
    alert('An error occurred while fetching data. Please try again.');
  }
}

/**
 * Función para comunicarse con el servidor para poder Crear o Actualizar
 * un registro de pelicula
 * @returns 
 */
async function saveCereal(){
  const idCereal = document.querySelector('#id-cereal').value;
  const nombre = document.querySelector('#nombre').value;
  const fabricante = document.querySelector('#fabricante').value;
  const dueDate = document.querySelector('#due-date').value;
  const banner = document.querySelector('#banner-form').value;

  //VALIDACION DE FORMULARIO
  if (!nombre || !fabricante || !dueDate || !banner) {
    Swal.fire({
        title: 'Error!',
        text: 'Por favor completa todos los campos.',
        icon: 'error',
        confirmButtonText: 'Cerrar'
    });
    return;
  }
  // Crea un objeto con los datos de la película
  const cerealData = {
      nombre: nombre,
      fabricante: fabricante,
      due_date: dueDate,
      banner: banner,
  };

    
  let result = null;
  // Si hay un idMovie, realiza una petición PUT para actualizar la película existente
  if(idCereal!==""){
    result = await fetchData(`${BASEURL}/api/cereal/${idCereal}`, 'PUT', cerealData);
  }else{
    // Si no hay idMovie, realiza una petición POST para crear una nueva película
    result = await fetchData(`${BASEURL}/api/cereal/`, 'POST', cerealData);
  }
  
  const formCereal = document.querySelector('#form-cereal');
  formCereal.reset();
  Swal.fire({
    title: 'Exito!',
    text: result.message,
    icon: 'success',
    confirmButtonText: 'Cerrar'
  })
  showCereals();
}


/**
 * Funcion que permite crear un elemento <tr> para la tabla de peliculas
 * por medio del uso de template string de JS.
 */
async function showCereals(){
  let cereals =  await fetchData(BASEURL+'/api/cereal/', 'GET');
  const tableCereals = document.querySelector('#list-table-cereals tbody');
  tableCereals.innerHTML='';
  cereals.forEach((cereal,index) => {
    let tr = `<tr>
                  <td>${cereal.nombre}</td>
                  <td>${cereal.fabricante}</td>
                  <td>${cereal.due_date}</td>
                  <td>
                      <img src="${cereal.banner}" width="30%">
                  </td>
                  <td>
                      <button class="btn-cac" onclick='updateCereal(${cereal.id_cereal})'><i class="fa fa-pencil" ></button></i>
                      <button class="btn-cac" onclick='deleteCereal(${cereal.id_cereal})'><i class="fa fa-trash" ></button></i>
                  </td>
                </tr>`;
    tableCereals.insertAdjacentHTML("beforeend",tr);
  });
}
  
/**
 * Function que permite eliminar una pelicula del array del localstorage
 * de acuedo al indice del mismo
 * @param {number} id posición del array que se va a eliminar
 */
function deleteCereal(id){
  Swal.fire({
      title: "Esta seguro de eliminar el producto?",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
  }).then(async (result) => {
      if (result.isConfirmed) {
        let response = await fetchData(`${BASEURL}/api/cereal/${id}`, 'DELETE');
        showCereals();
        Swal.fire(response.message, "", "success");
      }
  });
  
}


/**
 * Function que permite cargar el formulario con los datos de la pelicula 
 * para su edición
 * @param {number} id Id de la pelicula que se quiere editar
 */
async function updateCereal(id){
  //Buscamos en el servidor la pelicula de acuerdo al id
  let response = await fetchData(`${BASEURL}/api/cereal/${id}`, 'GET');
  const idCereal = document.querySelector('#id-cereal');
  const nombre = document.querySelector('#nombre');
  const fabricante = document.querySelector('#fabricante');
  const dueDate = document.querySelector('#due-date');
  const banner = document.querySelector('#banner-form');
  
  idCereal.value = response.id_cereal;
  nombre.value = response.nombre;
  fabricante.value = response.fabricante;
  dueDate.value = response.due_date;
  banner.value = response.banner;
}
  
// Escuchar el evento 'DOMContentLoaded' que se dispara cuando el 
// contenido del DOM ha sido completamente cargado y parseado.
document.addEventListener('DOMContentLoaded',function(){
  const btnSaveCereal = document.querySelector('#btn-save-cereal');
  //ASOCIAR UNA FUNCION AL EVENTO CLICK DEL BOTON
  btnSaveCereal.addEventListener('click',saveCereal);
  showCereals();
});