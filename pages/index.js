import React, {useContext, useEffect} from 'react';
import Layout from '../components/Layout';
import DropZone from '../components/Dropzone';
import Alerta from '../components/Alerta';
import Link from 'next/link';
import authContext from '../context/auth/authContext';
import appContext from '../context/app/appContext';

const Index = () => {

  const AuthContext = useContext(authContext);
  const {usuarioAutenticado, usuario, autenticado} = AuthContext;

  const AppContext = useContext(appContext);
  const {mensaje_archivo, url} = AppContext;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token){
      usuarioAutenticado();
    }
  }, [])

  return ( 
    <Layout>
      <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32 items-center">
        {mensaje_archivo ? <Alerta /> : null}
        <div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10">
          {url ? (
            <div className="md:flex-1 mb-2 mx-2 mt-5 py-5 lg:mt-0 flex flex-col items-center justify-center border-gray-400 border-2 bg-gray-100 px-4">
              <p className="text-center">
                <span className="font-bold">URL:</span> {`${process.env.frontendURL}/enlaces/${url}`}
              </p>
              <button
                type="button"
                className="bg-black hover:bg-yellow-500 hover:text-black w-full p-2 text-white uppercase font-bold mt-5"
                onClick={() => navigator.clipboard.writeText(`${process.env.frontendURL}/enlaces/${url}`)}
            >Copiar enlace</button>
            </div>
          ) : <DropZone />}
          <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0" >
            <h2 className="text-4xl font-sans font-bold text-gray-800 my-4">{usuario ? `${usuario.nombre}.` : null} Compartí.</h2>
            <p className="text-lg leading-loose">Sin otra persona no somos nada.</p>
            <p className="text-lg leading-loose mb-3">Sin nuestros archivos no somos nada.</p>
            {
              autenticado ? null : (
                <Link href="/crear-cuenta">
                  <a className="font-bold text-lg hover:text-yellow-700">Create una cuenta y mandá más personalizado!</a>
                </Link>
              )
            }
            
          </div>
        </div>
      </div>
    </Layout>
   );
}
 
export default Index;