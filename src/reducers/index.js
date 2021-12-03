
import { combineReducers } from 'redux';
import registrosReducer from './registrosReducer';
import alertaReducer from './alertaReducer';




export default combineReducers({
    registros: registrosReducer,
    alerta: alertaReducer
});