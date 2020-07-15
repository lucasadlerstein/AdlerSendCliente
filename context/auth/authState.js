import React, {useReducer} from 'react';
import authContext from './authContext';
import authReducer from './authReducer';
import {useRouter} from 'next/router';

import {REGISTRO_EXITOSO, USUARIO_AUTENTICADO, REGISTRO_ERROR, LIMPIAR_ALERTA, LOGIN_EXITOSO, LOGIN_ERROR, CERRAR_SESION} from '../../types/index';

import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';

const AuthState = ({children}) => {

    const router = useRouter();

    // Definir state inicial
    const initialState = {
        token: typeof window !== 'undefined' ? localStorage.getItem('token') : '',
        autenticado: null,
        usuario: null,
        mensaje: null
    }

    const [state, dispatch] = useReducer(authReducer, initialState);
    // Definir reducer

    const limpiarAlerta = (ms) => {
        setTimeout(() => {
            dispatch({
                type: LIMPIAR_ALERTA
            });
        }, ms);
    }

    const registrarUsuario = async datos => {
        try {
            const respuesta = await clienteAxios.post('/api/usuarios', datos);
            console.log(respuesta);
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data.msg
            });
            router.push('/login');
        } catch (error) {
            dispatch({
                type: REGISTRO_ERROR,
                payload: error.response.data
            })
        }
        limpiarAlerta(1500);
    }

    // Autenticar usuario
    const iniciarSesion = async datos => {
        try {
            const respuesta = await clienteAxios.post('/api/auth', datos);
            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data.token
            });
        } catch (error) {
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.msg
            })
        }
        limpiarAlerta(3000);
    }

    // Retornar usuario autenticado en base al JWT
    const usuarioAutenticado = async () => {
        const token = localStorage.getItem('token');
        if(token){
            tokenAuth(token);
            try {
                const respuesta = await clienteAxios.get('/api/auth');
                if(respuesta.data.usuario) {
                    dispatch({
                        type: USUARIO_AUTENTICADO,
                        payload: respuesta.data.usuario
                    })
                }
            } catch (error) {
                dispatch({
                    type: LOGIN_ERROR,
                    payload: error.response.data.msg
                })
            }
        }
    }

    // Cerrar sesion
    const cerrarSesion = () => {
        dispatch({
            type: CERRAR_SESION
        })
    }

    return (
        <authContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                usuarioAutenticado,
                registrarUsuario,
                iniciarSesion,
                cerrarSesion
            }}
        >
            {children}
        </authContext.Provider>
    )
}

export default AuthState;