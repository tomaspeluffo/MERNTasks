import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'; 
import Login from './componentes/auth/Login';
import NuevaCuenta from './componentes/auth/NuevaCuenta';
import Proyectos from './componentes/proyectos/Proyectos';

import ProyectoState from './context/proyectos/proyectoState'
import TareaState from './context/tareas/tareaState'
import AlertaState from './context/alertas/alertaState'
import AuthState from './context/autenticacion/authState'
import toeknAuth from './config/tokenAuth'
import RutaPrivada from './componentes/rutas/RutaPrivada'

// Revisar si tenemos un token
const token = localStorage.getItem('token')
if(token){
  toeknAuth(token)
}



function App() {


  return (
    <ProyectoState>
      <TareaState>
        <AlertaState>
          <AuthState>
            <Router>
              <Switch>
                <Route exact path="/" component= {Login} />
                <Route exact path="/nueva-cuenta" component= {NuevaCuenta} />
                <RutaPrivada exact path="/proyectos" component= {Proyectos} />

              </Switch>
             </Router>
           </AuthState>
          </AlertaState>
      </TareaState>
    </ProyectoState>
  );
}

export default App;
