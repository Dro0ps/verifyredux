import React, { useEffect } from 'react';
import Registro from './Registro';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { obtenerRegistrosAction } from '../actions/registroActions'


const Registros = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        // consultar la api
        const cargarRegistros = () => dispatch( obtenerRegistrosAction());
        cargarRegistros();
        // eslint-disable-next-line
    }, [])

    // Obtener el state
    const registros = useSelector(state => state.registros.registros);
    const error = useSelector(state => state.registros.error);
    const loading = useSelector(state => state.registros.loading)

    

    return ( 
    <>
        <h2 className="text-center my-5">Listado de registros</h2>

        { error ? <p className="font-weight-bold alert-danger text-center mt-4">Hubo un error</p> : null}

        { loading ? <p className="text-center">Cargando...</p> : null}

        <table className="table table-striped">
            <thead className="bg-primary table-dark">
                <tr>
                    <th scope="col">Nombre</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                { registros.lenght === 0 ? ' No hay registros' : (
                    registros.map( registro => (
                        <Registro
                            key={registro.id}
                            registro={registro}
                        />
                    ))
                )}
                
            </tbody>

        </table>

    </>
     );
}
 
export default Registros;