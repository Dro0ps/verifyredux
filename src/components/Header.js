import React from 'react';
import { Link } from 'react-router-dom';


const Header = () => {
    return ( 
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary justify-content-between">
            <div className="container">
                <h1>
                    <Link to={'/'} className="text-light">Notas de Ventas Homar</Link>
                </h1>
            </div>

            <Link to ={"/registros/nuevo"}
                className="btn btn-danger nuevo-post d-block d-md-inline-block"
            >Agregar registro &#43;</Link>


        </nav>
     );
}
 
export default Header;