import {
    AGREGAR_REGISTRO,
    AGREGAR_REGISTRO_EXITO,
    AGREGAR_REGISTRO_ERROR,
    COMENZAR_DESCARGA_REGISTROS,
    DESCARGA_REGISTROS_EXITO,
    DESCARGA_REGISTROS_ERROR,
    OBTENER_REGISTRO_ELIMINAR,
    REGISTRO_ELIMINADO_EXITO,
    REGISTRO_ELIMINADO_ERROR,
    OBTENER_REGISTRO_EDITAR,
    COMENZAR_EDICION_REGISTRO,
    REGISTRO_EDITADO_EXITO,
    REGISTRO_EDITADO_ERROR
} from '../types';

import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';

// Crear nuevos registros
export function crearNuevoRegistroAction(registro){
    return async (dispatch) => {
        dispatch( agregarRegistro() );

        try {
            // insertar en la API
            await clienteAxios.post('/registros', registro);

            // Si todo sale bien, actualizar el state
            dispatch( agregarRegistroExito(registro));

            // Alerta
            Swal.fire(
                'Correcto',
                'El registro se agrego correctamente',
                'success'
            )

        } catch (error) {
            console.log(error);
            // Si hay un error cambiar el state
            dispatch( agregarRegistroError(true));


            Swal.fire(
                'Error',
                'Intenta de nuevo, si el error persiste consulte al administrador',
                'error'
            )
        }

    }
}

const agregarRegistro = ()=> ({
    type: AGREGAR_REGISTRO,
    payload: true
});

const agregarRegistroExito = registro => ({
    type: AGREGAR_REGISTRO_EXITO,
    payload: registro
});

const agregarRegistroError = estado => ({
    type: AGREGAR_REGISTRO_ERROR,
    payload: estado
});


// Funcion que descarga los registros de la base de datos
export function obtenerRegistrosAction(){
    return async (dispatch) => {
        dispatch(descargarRegistros() );

        try {
            const respuesta = await clienteAxios.get('/registros');
            dispatch( descargarRegistrosExitosa( respuesta.data ));
        } catch (error) {
            console.log(error);
            dispatch( descargarRegistrosError(true) );
        }
    }
}

const descargarRegistros = () => ({
    type: COMENZAR_DESCARGA_REGISTROS,
    payload: true
});

const descargarRegistrosExitosa = registros =>( {
    type: DESCARGA_REGISTROS_EXITO,
    payload: registros
});

// si hubo un error
const descargarRegistrosError = estado => ({
    type: DESCARGA_REGISTROS_ERROR,
    payload: estado
});


// Selecciona y elimina el registro
export function borrarRegistroAction(id){
    return async (dispatch) => {
        dispatch(obtenerRegistrosEliminar(id));

        try {
            await clienteAxios.delete(`/registros/${id}`);
            dispatch( eliminarRegistroExito() );
            Swal.fire(
                'Eliminado!',
                'El registro se ha eliminado con correctamente',
                'success'
              )
        } catch (error) {
            console.log(error);
            dispatch( eliminarRegistroError() );
            
        }
        
    }
}

const obtenerRegistrosEliminar = id => ({
    type: OBTENER_REGISTRO_ELIMINAR,
    payload: id
});

const eliminarRegistroExito = () => ({
    type: REGISTRO_ELIMINADO_EXITO
});

const eliminarRegistroError = () => ({
    type: REGISTRO_ELIMINADO_ERROR,
    payload: true
});

// Colocar registro en Edición
export function obtenerRegistroEditar(registro) {
    return (dispatch) => {
        dispatch( obtenerRegistroEditarAction(registro))
    }
}

const obtenerRegistroEditarAction = registro => ({
    type: OBTENER_REGISTRO_EDITAR,
    payload: registro
})

// Edita un registro en la api y state
export function editarRegistroAction(registro) {
    return async (dispatch) => {
        dispatch( editarRegistro())
        try {
            await clienteAxios.put(`/registros/${registro.id}`, registro);
            dispatch( editarRegistroExito(registro));
        } catch (error) {
            dispatch( editarRegistroError());
        }
    }
}

const editarRegistro = () => ({
    type: COMENZAR_EDICION_REGISTRO
})

const editarRegistroExito = registro => ({
    type: REGISTRO_EDITADO_EXITO,
    payload: registro
})
const editarRegistroError = registro => ({
    type: REGISTRO_EDITADO_ERROR,
    payload: true
})

