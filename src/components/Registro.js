import React from 'react';
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2';

// Redux
import { useDispatch } from 'react-redux';
import { borrarRegistroAction, obtenerRegistroEditar } from '../actions/registroActions';


const Registro = ({registro}) => {

    const { nombre, precio, id } = registro;

    const dispatch = useDispatch();

    const history = useHistory();

    // Confirmar si desea eliminarlo
    const confirmarEliminarRegistro = id => {

        // preguntar al usuario
        Swal.fire({
            title: 'Estas seguro?',
            text: "Un registro eliminado no se puede recuperar!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminarlo!'
          }).then((result) => {
            if (result.isConfirmed) {
            // pasarlo al action
            dispatch( borrarRegistroAction(id));
            }
          })
    }

    // Funcion que redirige de forma programada
    const redireccionarEdicion = registro => {
        dispatch( obtenerRegistroEditar(registro));
        history.push(`/registros/editar/${registro.id}`)
    }

    return ( 
        <tr>
            <td>{nombre}</td>
            <td><span className="font-weight-bold">$ {precio}</span></td>
            <td>
                <button 
                    className=" btn btn-primary mr-2"
                    type="button"
                    onClick={ () => redireccionarEdicion(registro)}
                >Editar</button>

                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={( ) => confirmarEliminarRegistro(id)}
                >Eliminar</button>
            </td>
        </tr>
     );
}
 
export default Registro;