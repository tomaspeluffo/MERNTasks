import React, {useState, useContext, useEffect} from 'react'

import { Link } from 'react-router-dom'
import AlertaContex from '../../context/alertas/alertaContext'
import AuthContext from '../../context/autenticacion/authContext'

const Login = (props) => {

     // Extraer los valores del context
     const alertaContext = useContext(AlertaContex)
     const {alerta, mostrarAlerta} = alertaContext;
 
     const authContext = useContext(AuthContext);
     const {mensaje, autenticado, iniciarSesion} = authContext;

     // En caso de que el password o usuario no existan

    useEffect(() => {
        if(autenticado){
            props.history.push('/proyectos')
        }
        
        if(mensaje){
            mostrarAlerta(mensaje.msg, 'alerta-error');

        }
       //eslint-disable-next-line
    }, [mensaje, autenticado, props.history])


    // State para iniciar sesion

    const [usuario, guardarUsuario] = useState({
        email: "",
        password: ""
    });

    const {email, password} = usuario;

    const onChange= e => {
        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value

        })
    }

    // CUando el usuario quiere iniciar sesion

    const onSubmit = e => {
        e.preventDefault()

        // Validar que no haya campos vacion
        if(email.trim()=== ""|| password.trim()===""){
            mostrarAlerta("Todos los campos son Obligatorios", 'alerta-error')
        }

        // Pasarlo al action
        iniciarSesion({email, password});

    }


    return ( 
        <div className="form-usuario">
            { alerta ? ( <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div> )  : null }
            <div className="contenedor-form sombra-dark">
                <h1>Iniciar Sesion</h1>

                <form
                    onSubmit={onSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Tu Email"
                            value={email}
                            onChange={onChange}
                            />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Tu Password"
                            value={password}
                            onChange={onChange}
                            />
                    </div>

                    <div className="campo-form">
                        <button 
                            type="sumbit" 
                            className="btn btn-primario btn-block" 
                        >Iniciar Sesion</button>

                      
                    </div>
                </form>

                <Link to={'/nueva-cuenta'}  className="enlace-cuenta">Obtener Cuenta</Link>
            </div>
        </div>
     );
}
 
export default Login;