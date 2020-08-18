import React,{useReducer} from 'react'

import TareaContext from './tareaContext';
import TareaReducer from './tareaReducer';

import {
    TAREAS_PROYECTO,
    AGREGAR_TAREA, 
    VALIDAR_TAREA, 
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA
} from '../../types/Index'

import ClienteAxios from '../../config/axios'


const TareaState = (props) =>{
    const initalState = {
        tareasproyecto: [],
        errortarea: false, 
        tareaseleccionada: null

    }

    // Crear dispatch y state
    const[state, dispatch] =useReducer(TareaReducer, initalState );


    // Obtener las tareas de un proyecto
    const obtenerTareas = async proyecto => {


        try {
            const resultado = await ClienteAxios.get('/api/tareas', { params: { proyecto }});
            dispatch({
                type: TAREAS_PROYECTO,
                payload: resultado.data.tareas
            })
        } catch (error) {
            console.log(error);
        }
    }

    // Agregar tarea a proyecto selecionado
    const agregarTarea = async tarea => {
        try {
            const resultado = await ClienteAxios.post('/api/tareas', tarea);
            console.log(resultado)
            dispatch({
                type: AGREGAR_TAREA,
                payload: resultado.data.tarea
            })
        } catch (error) {
            console.log(error);
        }
    }

    // Valida y muestra un error
    const validarTarea = () =>{
        dispatch({
            type:VALIDAR_TAREA
        })
    }

    // Eliminar tarea por id
    const eliminarTarea = async (id, proyecto) => {
        try {
            await ClienteAxios.delete(`/api/tareas/${id}`, { params: { proyecto }});
            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            })
        } catch (error) {
            console.log(error)
        }
    }

      // Edita o modifica una tarea
      const actualizarTarea = async tarea => {

        try {
            const resultado = await ClienteAxios.put(`/api/tareas/${tarea._id}`, tarea);
            
            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: resultado.data.tarea
            })
        } catch (error) {
            console.log(error);
        }
    }


    // Extrae una tarea para edicion
    const guardarTareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }

  

    // Elimina la tarea seleccionada
    const limpiarTarea = ()=>{
        dispatch({
            type:LIMPIAR_TAREA
        })
    }

    return(
        <TareaContext.Provider
        value={{
            tareasproyecto : state.tareasproyecto,
            errortarea: state.errortarea,
            tareaseleccionada: state.tareaseleccionada,
            obtenerTareas,
            agregarTarea,
            validarTarea,
            eliminarTarea,
            guardarTareaActual,
            actualizarTarea,
            limpiarTarea
            }}
        >
            {props.children}
        </TareaContext.Provider>
    )

}

export default TareaState;


