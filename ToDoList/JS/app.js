//Parte del DOM donde quiero seleccionar//

document.querySelector(`#userInput`) //querySelectorel selector mas rapido - estamos seleccionando el formulario
const formulario = document.querySelector(`#userInput`);
const inputTarea = document.querySelector(`input[type="text"]`);
const listaContenedor = document.querySelector(`#list`);
const tareasPendientes = document.querySelector('#pendientes');
const tareasCompletadas = document.querySelector('#completadas');



formulario.addEventListener(`submit`, (event) => {
    event.preventDefault();

    const texto = inputTarea.value.trim(); //limpiar texto
    if (texto === '') { //si ponen texto vacio lanza alerta
        alert('Ingresa una tarea válida');
        return
    }
    agregarTareaAlDOM(texto)
    inputTarea.value = '';
})

function agregarTareaAlDOM(textoTarea) {
    const tareaDiv = document.createElement('div')
    tareaDiv.innerHTML =

        `<label>
        <input type= "checkbox"> 
        ${textoTarea}
    </label>
    <span class= "closeBtn"> <img src="imagenes/delete.png" alt="Eliminar tarea"> </span>`;

    listaContenedor.appendChild(tareaDiv)
    actualizarContador();
}

//Tarea como completada
listaContenedor.addEventListener('click', (Event) => {
    const checkbox = Event.target.closest('input[type="checkbox"]');
    if (checkbox) {
        const tarjetaTarea = checkbox.closest('div');
        tarjetaTarea.classList.toggle('completada', checkbox.checked);
        actualizarContador();
        return;
    }


//quitar tarea de la lista
    const botonEliminar = Event.target.closest('.closeBtn');
    if (botonEliminar) {
        const tarjetaTarea = botonEliminar.closest('div');
        tarjetaTarea.remove();
        actualizarContador(); // Actualizamos el contador al eliminar
    }
});

//actualizar el contador
function actualizarContador() {
    const totalTareas = listaContenedor.querySelectorAll('div').length;
    const tareasRealizadas = listaContenedor.querySelectorAll('.completada').length;

    if (tareasPendientes) tareasPendientes.textContent = totalTareas - tareasRealizadas;
    if (tareasCompletadas) tareasCompletadas.textContent = tareasRealizadas;
}