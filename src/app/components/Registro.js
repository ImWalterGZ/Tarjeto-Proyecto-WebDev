'use client'
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Dancing_Script } from 'next/font/google'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from "@/app/firebase"
import { useRouter } from "next/navigation"

// Configura la fuente
const dancingScript = Dancing_Script({ 
  subsets: ['latin'],
  display: 'swap',
})

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(3,'Debe tener al menos 3 caracteres')
    .max(40,'No puede tener mas de 40 caracteres')
    .required('No se puede dejar vacio.'),
  password: Yup.string()
    .min(8, 'Muy corto!')
    .max(20, 'Muy Largo!')
    .matches(/[A-Z]/, 'La contraseña debe contener al menos una letra mayúscula')
    .required('Requerido'),
    passwordConf: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
    .required('Requerido'),

  email: Yup.string().email('Email Invalido').required('Requerido'),
});

export default function Registro({ setRegistro }){
    const [Credentials, setCredentials] = useState({
        email: "",
        password: "",
    });

    const router  = useRouter();

    const changeUser = e => {
        setCredentials({
            ...Credentials,
            [e.target.name]: e.target.value
        })
    };

    const registerUser = async () => {
        try {
            await createUserWithEmailAndPassword(auth, Credentials.email, Credentials.password);
            router.push("/index");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='py-10 px-5'>
            <Formik
            initialValues={{
                password: '',
                passwordConf: '',
                email: '',
                name: '',
            }}
            validationSchema={SignupSchema}
            onSubmit={async values => {
                // same shape as initial values
                console.log(values);
                try {
                    await createUserWithEmailAndPassword(auth, values.email, values.password);
                    router.push("/Index");
                } catch (error) {
                    console.log(error);
                }
            }}
            >
            {({ errors, touched }) => (
                <div className='flex justify-center  w-64 text-center'>
                <Form>
                <div className={`${dancingScript.className} text-4xl py-3`}>Tarjeto</div>
                <Field name="name"
                    className="border-2 border-b-black w-64 focus:outline-none" placeholder="Ingresa tu nombre"/>
                    <div className=' bottom-0 h-8'>
                        {errors.name && touched.name && (
                        <div className='text-xs text-red-600'>{errors.name}</div>
                        )}
                    </div>
                    <Field name="email" type="email"
                    className="border-2 border-b-black w-64 focus:outline-none" placeholder="Ingresa tu correo electronico"/>
                    <div className=' bottom-0 h-8'>
                        {errors.email && touched.email && (
                        <div className='text-xs text-red-600'>{errors.email}</div>
                        )}
                    </div>
                    <Field name="password" type="password" 
                    className="border-2 border-b-black w-64 focus:outline-none" placeholder="Ingresa tu contraseña"/>
                    <div className=' bottom-0 h-8'>
                        {errors.password && touched.password ? (
                        <div className='text-xs text-red-600'>{errors.password}</div>
                        ) : null}
                    </div>
                    <Field name="passwordConf" type="password" 
                    className="border-2 border-b-black w-64 focus:outline-none" placeholder="Ingresa tu contraseña nuevamente"/>
                    <div className=' bottom-0 h-8'>
                        {errors.passwordConf && touched.passwordConf ? (
                        <div className='text-xs text-red-600'>{errors.passwordConf}</div>
                        ) : null}
                    </div>
                    <div><button type="submit" onClick={registerUser} className='py-2 px-5 me-2 mb-2 text-m w-64 font-medium text-white font-bold focus:outline-none 
                    bg-red-500 rounded-lg border border-gray-200 hover:bg-red-600 focus:z-10 focus:ring-4 
                    focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 
                    dark:hover:text-white dark:hover:bg-gray-700'>Registrarse</button></div>
                    <button type="button"  className="w-64 text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm pl-14 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2">
                    <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
                    <path d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"/>
                    </svg>
                    Sign in with Google
                    </button>
                    <div><a onClick={setRegistro} className='text-xs cursor-pointer	hover:font-bold'>Iniciar Sesion</a></div>
                </Form>
                </div>
            )}
            </Formik>
  </div>
    );
}