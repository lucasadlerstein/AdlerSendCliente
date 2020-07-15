import React, {useState, useContext} from 'react';
import appContext from '../context/app/appContext';


const FormOpciones = () => {
    
    const AppContext = useContext(appContext);
    const {agregarPassword, cantidadDescargas} = AppContext;

    
    const [proteger, setProteger] = useState(false);
    
    return (
        <>
            <div className="f-full mt-10">
                <label className="text-lg text-gray-800 mr-5">Eliminar después de</label>
                <select
                    className="appearance-none mt-2 bg-white text-black py-3 px-4 pr-8 border border-gray-400 rounded leading-none focus:outline-none focus:border-gray-500 w-full"
                    onChange={e => cantidadDescargas(e.target.value)}
                >
                    <option value="1" selected>1 descarga</option>
                    <option value="5">5 descargas</option>
                    <option value="10">10 descargas</option>
                    <option value="20">20 descargas</option>
                </select>
            </div>
            <div className="mt-4">
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="pass"
                        onChange={() => setProteger(!proteger)}
                    />
                    <label htmlFor="pass" className="ml-2 text-lg text-gray-800 mr-5">Proteger con contraseña</label>
                </div>
                {proteger && (
                    <input
                    type="password"
                    className="w-full appearance-none mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500 border-gray-400"
                    placeholder="Escribí aca tu contraseña"
                    onChange={e => agregarPassword(e.target.value)}
                    />
                )}
                
            </div>
        </>
     );
}
 
export default FormOpciones;