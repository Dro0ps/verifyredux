import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editarRegistroAction } from '../actions/registroActions';
import { useHistory } from 'react-router-dom';

const EditarRegistro = () => {

    const history = useHistory();

    // Dispatch para mandar a llamar al action
    const dispatch = useDispatch();

    const [ registro, guardarRegistro ] = useState({
        nombre: '',
        precio: ''
    })

    // registro a editar
    const registroEditar = useSelector(state => state.registros.registroeditar);
    /* if(!registroEditar) return null; */

    // Llenar el state automaticamente con el useEffect
    useEffect(() => {
        guardarRegistro(registroEditar);
    }, [registroEditar]);

    // Recordar nunca colocar un return antes de un useEffect
    if(!registroEditar) return null;

    // Leer los datos del formulario
    const onChangeFormulario = e => {
        guardarRegistro({
            ...registro,
            [e.target.name] : e.target.value
        })
    }

    const { nombre, precio } = registro;

    const submitEditarregistro = e => {
        e.preventDefault();

        dispatch( editarRegistroAction(registro) );

        history.push('/');
    }





    return ( 
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Editar registro
                        </h2>

                        <form
                            onSubmit={submitEditarregistro}
                        >
                            <div className="form-groud mt-3">
                                <label>Nombre registro</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="nombre"
                                    value={nombre}
                                    onChange={onChangeFormulario}
                                />
                                
                            </div>

                            <div className="form-groud mt-3">
                                <label>Precio</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="precio"
                                    value={precio}
                                    onChange={onChangeFormulario} 
                                />
                                
                            </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary font-weight-bold text-uppercase d-block w-100 mt-4"
                                >Editar</button>

                        </form>

                        {/* { cargando ? <p>Cargando</p> : null }
                        { error ? <p className=" alert alert-danger p2 mt-4 text-center">Hubo un error</p> : null} */}

                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default EditarRegistro;