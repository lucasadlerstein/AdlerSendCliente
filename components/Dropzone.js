import React, {useCallback, useContext} from 'react';
import {useDropzone} from 'react-dropzone';
// import clienteAxios from '../config/axios';
import appContext from '../context/app/appContext';
import authContext from '../context/auth/authContext';
import FormOpciones from './FormOpciones';


const DropZone = () => {

    const AppContext = useContext(appContext);
    const {mostrarAlerta, subirArchivo, crearEnlace, cargando} = AppContext;

    const AuthContext = useContext(authContext);
    const {usuario, autenticado} = AuthContext;

    const onDropRejected = () => {
        if(autenticado) {
            mostrarAlerta('Por ahora el máximo de subida es 1.5GB');
        } else {
            mostrarAlerta('Sin cuenta, podes subir máximo 10MB');
        }
    }

    const onDropAccepted  = useCallback( async (acceptedFiles) => {
        // Crear form data
        const formData = new FormData();
        formData.append('archivo', acceptedFiles[0]);
        subirArchivo(formData, acceptedFiles[0].path);
    }, []);

    // Extrar contenido de dropzone
    const {getInputProps, getRootProps, isDragActive, acceptedFiles } = useDropzone({onDropAccepted, onDropRejected, maxSize: 1000000});

    const archivos = acceptedFiles.map( archivo => (
        <li key={archivo.lastModified} className="bg-white flex-1 mb-4 p-3 shadow-lg rounded">
            <p className="font-bold text-xl">{archivo.path}</p>
            <p className="text-sm text-gray-500">{(archivo.size / Math.pow(1024, 2)).toFixed(2)} MB</p>
        </li>
    ) );

    return ( 
        <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-100 px-4">
            {
                acceptedFiles.length ? (
                    <div className="w-full my-8">
                        <h4 className="font-bold mb-4 text-center text-2xl">Archivos</h4>
                        <ul>
                            {archivos}
                        </ul>

                        {
                            autenticado ? <FormOpciones /> : null
                        }

                        {cargando ? <p className="text-center my-3">Cargando...</p> : (
                            <button
                            className="bg-black w-full py-3 rounded text-white my-3 hover:bg-yellow-500 hover:text-black"
                            type="button"
                            onClick={() => crearEnlace()}
                            >Crear enlace</button>
                        )}

                        <p className="text-center my-3">El archivo se eliminará en 7 días.</p>
                    </div>
                ) : (
                    <div {...getRootProps({className: 'dropzone w-full py-20'})}>
                        <input className="h-100" {...getInputProps()} />
                        <div className="text-center">
                            {
                                isDragActive ? (
                                    <p className="text-2xl text-center text-gray-600">Soltá el archivo y sé feliz!</p>
                                ) : (
                                    <>
                                        <p className="text-2xl text-center text-gray-600">Simple como enviar,</p>
                                        <p className="text-2xl text-center text-gray-600">simple como arrastrar y soltar</p>
                                        <button className="bg-black w-full py-3 rounded text-white my-10 hover:bg-yellow-500 hover:text-black" type="button">Subir archivos</button>
                                    </>
                                )
                            }
                        </div>
                    </div>
                )
            }
        </div>

     );
}
 
export default DropZone;