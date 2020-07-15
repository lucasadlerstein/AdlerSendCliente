import React, {useContext, useEffect} from 'react';
import Link from 'next/link';
import authContext from '../context/auth/authContext';
import appContext from '../context/app/appContext';
import {useRouter} from 'next/router';

const Header = () => {

    // Routing
    const router = useRouter();

    const AuthContext = useContext(authContext);
    const {usuarioAutenticado, usuario, cerrarSesion} = AuthContext;

    const AppContext = useContext(appContext);
    const {limpiarState} = AppContext;

    useEffect(() => {
        usuarioAutenticado();
    }, [])

    const onClickCerrarSesion = () => {
        cerrarSesion();
    }

    const redireccionInicio = () => {
        router.push('/');
        limpiarState();
    }

    return ( 
        <header className="py-8 flex flex-col md:flex-row items-center justify-between">

            <img
                onClick={() => redireccionInicio()}
                className="w-64 mb-8 md:mb-0 cursor-pointer"
                src="adlersend.png"
                alt="Adlersend, enviá lo que quieras con limites." />

            {usuario ? (
                <div className="flex items-center">
                    <p className="mr-5 text-white">Bienvenido {usuario.nombre}</p>
                    <button
                        type="button"
                        className="bg-white px-5 py-3 rounded-lg text-black font-bold uppercase"
                        onClick={() => onClickCerrarSesion()}    
                    >Cerrar sesion</button>
                </div>
            ) : (
                <div>
                    <Link href="/login">
                        <a className="bg-gray-700 px-5 py-3 rounded-lg text-white font-bold uppercase mr-2">Iniciar sesion</a>
                    </Link>
                    <Link href="/crear-cuenta">
                        <a className="bg-white px-5 py-3 rounded-lg text-black font-bold uppercase">Crear cuenta</a>
                    </Link>
                </div>
            )}
            
        </header>
     );
}
 
export default Header;