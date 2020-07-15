import React, {useContext, useEffect} from 'react';
import Layout from '../components/Layout';
import FormularioError from '../components/Formulario';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import authContext from '../context/auth/authContext';
import Alerta from '../components/Alerta';
import { useRouter } from 'next/router';

const Login = () => {

    const AuthContext = useContext(authContext);
    const {iniciarSesion, autenticado, mensaje} = AuthContext;

    const router = useRouter();

    useEffect(() => {
        if(autenticado === true) {
            router.push('/');
        }
    }, [autenticado])

    // Formik validacion con yup
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('El email no es valido').required('El email es obligatorio'),
            password: Yup.string().required('La constraseña es obligatoria')

        }),
        onSubmit: valores => {
            iniciarSesion(valores);
        }
    })

  return ( 
    <Layout>
        <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
            <h2 className="text-4xl font-sans font-bold text-white text-center my-3">Iniciar sesión</h2>
            {mensaje && <Alerta />}
            <div className="flex justify-center mt-5">
                <div className='w-full max-w-lg'>
                    <form
                        onSubmit={formik.handleSubmit}
                        className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                            <label 
                                htmlFor="email"
                                className="block text-black text-sm font-bold mb-2">Email</label>
                                <input
                                    type="email" 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="Email" />
                        </div>
                        <div className="mb-4">
                            <label 
                                htmlFor="password"
                                className="block text-black text-sm font-bold mb-2">Password</label>
                                <input
                                    type="password" 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="Password" />
                        </div>

                        {formik.touched.email && formik.errors.email ? (
                                <FormularioError error={formik.errors.email} />
                            ) : formik.touched.password && formik.errors.password ? (
                                <FormularioError error={formik.errors.password} />
                            ) : null}

                        <input
                            type="submit"
                            value="Iniciar sesión"
                            className="bg-black hover:bg-gray-900 w-full p-2 text-white uppercase font-bold cursor-pointer"
                        />
                    </form>
                </div>
            </div>
        </div>

    </Layout>
   );
}
 
export default Login;