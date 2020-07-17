import React, {useState, useContext} from 'react';
import Alerta from '../../components/Alerta';
import Layout from '../../components/Layout';
import clienteAxios from '../../config/axios';
import appContext from '../../context/app/appContext';

export async function getServerSideProps({params}) {
    const {enlace} = params;
    const resultado = await clienteAxios.get(`/api/enlaces/${enlace}`);

    return {
        props: {
            enlace: resultado.data
        },
        unstable_revalidate: 60
    }
}

// Generar un enlace por cada slug
export async function getStaticPaths() {
    const enlaces = await clienteAxios.get('/api/enlaces');
    const paths = enlaces.data.enlaces.map( enlace => ({
        // Aca va un array con los SLUGS
        params: { enlace: enlace.url }
    }))
    return { paths, fallback: true }
}

export default ({enlace}) => {

    const AppContext = useContext(appContext);
    const {mostrarAlerta, mensaje_archivo} = AppContext;
  
    const [tienePass, setTienePass] = useState(enlace.password);
    const [password, setPassword] = useState('');

    const verificarPassword = async e => {
        e.preventDefault();
        const data = {
            password
        }

        try {
            const resultado = await clienteAxios.post(`/api/enlaces/${enlace.enlace}`, data);
            setTienePass(resultado.data.password)
        } catch (error) {
            mostrarAlerta(error.response.data.msg);
        }
    }

    return (
        <Layout>
            {tienePass ? (
                <div className="text-center">
                    <h1 className="text-3xl text-center text-white mb-5">El enlace está protegido</h1>
                    <form
                        onSubmit={e => verificarPassword(e)}
                    >
                        <input
                            type="password"
                            className="appearance-none mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500 border-gray-400"
                            placeholder="Escribí aca la contraseña"
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                            
                        />
                        <input
                            type="submit"
                            className="ml-2 mb-5 bg-yellow-500 hover:bg-gray-900 rounded py-3 px-4 text-black hover:text-white uppercase font-bold cursor-pointer"
                            value="Verificar →" />
                        {mensaje_archivo && <Alerta />}
                    </form>
                    
                </div>
            ) : (
                <>
                    <h1 className="text-3xl text-center text-white">Descargá tu archivo</h1>
                    <div className="flex items-center justify-center mt-10">
                        <a href={`${process.env.backendURL}/api/archivos/${enlace.archivo}`} className="bg-yellow-500 hover:bg-gray-900 rounded py-2 px-4 text-black hover:text-white uppercase font-bold cursor-pointer">Descargar</a>

                    </div>
                </>
            )}
            
        </Layout>
    )

}

