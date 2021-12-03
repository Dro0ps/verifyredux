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
    REGISTRO_EDITADO_EXITO,
    REGISTRO_EDITADO_ERROR
    
} from '../types';

// Cada reducer tiene su propio state

const initialState = {
    registros: [], 
    error: null,
    loading: false,
    registroeliminar: null,
    registroeditar: null
}
// eslint-disable-next-line
export default function(state = initialState, action) {
    switch(action.type) {
        case COMENZAR_DESCARGA_REGISTROS:
        case AGREGAR_REGISTRO:
            return{
                ...state,
                loading: action.payload
            }
        case AGREGAR_REGISTRO_EXITO:
            return{
                ...state,
                loading: false,
                registros:[...state.registros, action.payload]
            }
        case REGISTRO_EDITADO_ERROR:    
        case REGISTRO_ELIMINADO_ERROR:
        case DESCARGA_REGISTROS_ERROR:
        case AGREGAR_REGISTRO_ERROR:
            return{
                ...state,
                loading: false,
                error: action.payload
            }
        case DESCARGA_REGISTROS_EXITO:
            return{
                ...state,
                loading: false,
                error: null,
                registros: action.payload
            }
        case OBTENER_REGISTRO_ELIMINAR:
            return{
                ...state,
                registroeliminar: action.payload
            }
        case REGISTRO_ELIMINADO_EXITO:
            return{
                ...state,
                registros: state.registros.filter( registro => registro.id !== state.registroeliminar ),
                registroeliminar: null
            }
        case OBTENER_REGISTRO_EDITAR:
            return{
                ...state,
                registroeditar: action.payload
            }
        case REGISTRO_EDITADO_EXITO:
            return{
                ...state,
                registroeditar: null,
                registros: state.registros.map( registro => 
                    registro.id === action.payload.id ? registro = action.payload : registro     
                )
            }

        default:
            return state;
    }
}