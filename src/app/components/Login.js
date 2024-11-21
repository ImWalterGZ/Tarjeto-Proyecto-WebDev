'use client'
import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Dancing_Script } from 'next/font/google';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/firebase";
import { useRouter } from "next/navigation"
import { useAutchUser } from '../hooks/useAuthUser';

// Configura la fuente
const dancingScript = Dancing_Script({ 
  subsets: ['latin'],
  display: 'swap',
})

const SignupSchema = Yup.object().shape({
  password: Yup.string()
    .min(2, 'Muy corto!')
    .max(50, 'Muy Largo!')
    .required('Requerido'),
  email: Yup.string().email('Email Invalido').required('Requerido'),
});



export const Login = ({ setRegistro }) =>{ 
  const router = useRouter();
  
  return(
    <div className='py-10 px-5'>
      <Formik
        initialValues={{
          password: '',
          email: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={async values => {
          // same shape as initial values
          console.log(values);
          try {
            await signInWithEmailAndPassword(auth, values.email, values.password);
            //useAutchUser();
            router.push("/Index");            
          } catch (error) {
            alert("Contraseña incorrecta");
          }
        }}
      >
        {({ errors, touched }) => (
          <div className='flex justify-center  w-64 h-64 text-center'>
            <Form>
            <div className={`${dancingScript.className} text-4xl py-3`}>Tarjeto</div>
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
              <div><button type="submit" className='py-2 px-5 me-2 mb-2 text-m w-64 font-medium text-white font-bold focus:outline-none 
              bg-red-500 rounded-lg border border-gray-200 hover:bg-red-600 focus:z-10 focus:ring-4 
              focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 
              dark:hover:text-white dark:hover:bg-gray-700'>Iniciar sesion</button></div>
              <button type="button" className="w-64 text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm pl-14 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2">
              <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
              <path d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"/>
              </svg>
              Sign in with Google
              </button>
              <div><a className='text-xs'>Olvide mi contraseña</a></div>
              <div><a onClick={setRegistro} className='text-xs cursor-pointer	hover:font-bold'>Registrarse</a></div>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
};