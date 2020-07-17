import React, {useReducer} from 'react';
import appContext from './appContext';
import appReducer from './appReducer';
import clienteAxios from '../../config/axios';

import {
    SUBIR_ARCHIVO_ERROR,
    SUBIR_ARCHIVO_EXITO,
    MOSTRAR_ALERTA,
    LIMPIAR_ALERTA,
    CREAR_ENLACE_ERROR,
    CREAR_ENLACE_EXITO,
    SUBIR_ARCHIVO,
    LIMPIAR_STATE,
    AGREGAR_PASSWORD,
    CANTIDAD_DESCARGAS
} from '../../types/index';

const AppState = ({children}) => {

    const initialState = {
        mensaje_archivo: null,
        nombre: '',
        nombre_original: '',
        cargando: null,
        descargas: 1,
        password: '',
        autor: null,
        url: ''
    }

    const [state, dispatch] = useReducer(appReducer, initialState);
    
    const mostrarAlerta = msg => {
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: msg
        });
        setTimeout(() => {
            dispatch({
                type: LIMPIAR_ALERTA
            });
        }, 3000);
    }

    const subirArchivo = async (formData, nombreArchivo) => {
        
        dispatch({
            type: SUBIR_ARCHIVO
        })
        
        try {
            const resultado = await clienteAxios.post('/api/archivos', formData);
            
            dispatch({
                type: SUBIR_ARCHIVO_EXITO,
                payload: {
                    nombre: resultado.data.archivo,
                    nombre_original: nombreArchivo
                } 
            })
            
        } catch (error) {
            console.log(error);
            dispatch({
                type: SUBIR_ARCHIVO_ERROR,
                payload: error.response.data.msg
            })
        }  
    }

    const crearEnlace = async () => {
        const data = {
            nombre: state.nombre,
            nombre_original: state.nombre_original,
            descargas: state.descargas,
            password: state.password,
            autor: state.autor
        }
        try {
            const resultado = await clienteAxios.post('/api/enlaces', data);
            dispatch({
                type: CREAR_ENLACE_EXITO,
                payload: resultado.data.msg
            })
        } catch (error) {
            dispatch({
                type: CREAR_ENLACE_ERROR,
                payload: error.response.data.msg
            })
        }
    }

    const limpiarState = () => {
        dispatch({
            type: LIMPIAR_STATE
        });
    }

    const agregarPassword = password => {
        dispatch({
            type: AGREGAR_PASSWORD,
            payload: password
        })
    }

    const cantidadDescargas = descargas => {
        dispatch({
            type: CANTIDAD_DESCARGAS,
            payload: Number(descargas)
        })
    }

    return (
        <appContext.Provider
         value={{
            mensaje_archivo: state.mensaje_archivo,
            nombre_original: state.nombre_original,
            nombre: state.nombre,
            cargando: state.cargando,
            descargas: state.descargas,
            password: state.password,
            autor: state.autor,
            url: state.url,
            mostrarAlerta,
            subirArchivo,
            crearEnlace,
            limpiarState,
            agregarPassword,
            cantidadDescargas
         }}
        >
            {children}
        </appContext.Provider>
    )
}

export default AppState;