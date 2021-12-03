import React from 'react';
import Header from "./components/Header";
import Registros from './components/Registros';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NuevoRegistro from './components/NuevoRegistro';
import EditarRegistro from './components/EditarRegistro';

// Redux
import { Provider } from 'react-redux';
import store from './store';


function App() {


  return (
    <Router>
      <Provider store={store}>

      <Header/>
      <div className="container mt-5">
        <Switch>
          <Route exact path="/" component={Registros}/>
          <Route exact path="/registros/nuevo" component={NuevoRegistro}/>
          <Route exact path="/registros/editar/:id" component={EditarRegistro}/>
        </Switch>


      </div>

      </Provider>
    </Router>
    
  );
}

export default App;
