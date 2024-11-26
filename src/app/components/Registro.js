'use client'
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Dancing_Script } from 'next/font/google'
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from "@/app/firebase"
import { useRouter } from "next/navigation"
import Image from 'next/image'
import { doc, setDoc } from 'firebase/firestore';
import { db } from "@/app/firebase"
// Configura la fuente
const dancingScript = Dancing_Script({ 
  subsets: ['latin'],
  display: 'swap',
})

const SignupSchema = Yup.object().shape({
    name: Yup.string()
    .min(3, 'Debe tener al menos 3 caracteres.')
    .max(40, 'No puede tener más de 40 caracteres.')
    .matches(
      /^[A-Za-zÁáÉéÍíÓóÚúÑñ]+(?:\s+[A-Za-zÁáÉéÍíÓóÚúÑñ]+)+$/,
      'Ingresa al menos un nombre y un apellido separados por espacios.'
    )
    .test('min-word-length', 'Cada palabra debe tener al menos 2 caracteres.', value => {
      if (!value) return true; // Skip if empty (handled by required)
      const words = value.trim().split(/\s+/);
      return words.every(word => word.length >= 2);
    })
    .test('min-two-words', 'Debe contener al menos un nombre y un apellido.', value => {
      if (!value) return true; // Skip if empty (handled by required)
      const words = value.trim().split(/\s+/);
      return words.length >= 2;
    })
    .required('Ingresa tu nombre.'),
  password: Yup.string()
    .min(8, '¡Muy corta!')
    .max(20, '¡Muy larga!')
    .matches(/[A-Z]/, 'Pónle una mayúscula.')
    .matches(/[0-9]/, 'Échale un número a tu contraseña.')
    .required('Ingresa tu contraseña ultrasecreta.'),
    passwordConf: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden.')
    .required('Confirma tu contraseña.'),

  email: Yup.string().email('El email no es válido.').required('Ingresa tu email.'),
});

export default function Registro({ setRegistro }){
    const router  = useRouter();

    const signInWithGoogle = async () => {
        try {
          const provider = new GoogleAuthProvider();
          const result = await signInWithPopup(auth, provider);
          // El usuario ha iniciado sesión exitosamente
          console.log("Usuario registrado con Google:", result.user);
          router.push("/dashboard"); // Redirige al usuario después del login exitoso
        } catch (error) {
          console.error("Error al registrar con Google:", error);
          // Aquí puedes manejar los errores específicos si lo deseas
          if (error.code === 'auth/popup-closed-by-user') {
            console.log('El usuario cerró la ventana de inicio de sesión');
          }
          // Puedes añadir más manejo de errores específicos aquí
        }
      };

    const changeUser = e => {
        setCredentials({
            ...Credentials,
            [e.target.name]: e.target.value
        })
    };

    const registerUser = async () => {
        try {
            await createUserWithEmailAndPassword(auth, Credentials.email, Credentials.password);
            router.push("/dashboard");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='flex content-center justify-center'>
            <Formik
            initialValues={{
                password: '',
                passwordConf: '',
                email: '',
                name: '',
            }}
            validationSchema={SignupSchema}
            onSubmit={async values => {
                //Se agrega el usaurio 
                console.log(values);
                try {
                    const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
                    await setDoc(doc(db, "users", userCredential.user.uid), {
                        nombre: values.name,
                      });
                    router.push("/dashboard");
                } catch (error) {
                    console.log("error: ");
                    console.log(error);
                }
            }}
            >
            {({ errors, touched }) => (
                <div className='flex justify-center text-center'>
                <Form>
                <div className='mb-3 flex justify-center'><Image src="/tarjeto-horizontal-logo.svg" alt='Logo horizontal de tarjeto' width={150} height={150} priority={false}/></div>
            <div className={`mb-3 w-[20rem] text-2xl font-semibold text-[#f4262f]`}>Hazte notar, aquí es donde empieza lo bueno.</div>
            <div className={`mb-3 w-[20rem] text-xl text-[#434343]`}>Regístrate para continuar</div>
                <Field name="name" type="text"
                    className={`bg-[#000000] bg-opacity-5 border-[.1rem] w-[20rem] h-14 p-5 text-[#434343] focus:outline-none focus:shadow-md rounded-xl ${errors.name && touched.name ? 'border-red-600' : 'border-[#000000] border-opacity-50'}`} placeholder="Ingresa tu nombre"/>
                    <div className='mb-3 mt-1'>
                        {errors.name && touched.name && (
                        <div className='text-xs text-red-600'>{errors.name}</div>
                        )}
                    </div>
                    <Field name="email" type="email"
                    className={`bg-[#000000] bg-opacity-5 border-[.1rem] w-[20rem] h-14 p-5 text-[#434343] focus:outline-none focus:shadow-md rounded-xl ${errors.email && touched.email ? 'border-red-600' : 'border-[#000000] border-opacity-50'}`} placeholder="Ingresa tu correo electronico"/>
                    <div className='mb-3 mt-1'>
                        {errors.email && touched.email && (
                        <div className='text-xs text-red-600'>{errors.email}</div>
                        )}
                    </div>
                    <Field name="password" type="password" 
                    className={`bg-[#000000] bg-opacity-5 border-[.1rem] w-[20rem] h-14 p-5 text-[#434343] focus:outline-none focus:shadow-md rounded-xl ${errors.password && touched.password ? 'border-red-600' : 'border-[#000000] border-opacity-50'}`} placeholder="Ingresa tu contraseña"/>
                    <div className='mb-3 mt-1'>
                        {errors.password && touched.password ? (
                        <div className='text-xs text-red-600'>{errors.password}</div>
                        ) : null}
                    </div>
                    <Field name="passwordConf" type="password" 
                    className={`bg-[#000000] bg-opacity-5 border-[.1rem] w-[20rem] h-14 p-5 text-[#434343] focus:outline-none focus:shadow-md rounded-xl ${errors.passwordConf && touched.passwordConf ? 'border-red-600' : 'border-[#000000] border-opacity-50'}`} placeholder="Ingresa tu contraseña nuevamente"/>
                    <div className='mb-3 mt-1'>
                        {errors.passwordConf && touched.passwordConf ? (
                        <div className='text-xs text-red-600'>{errors.passwordConf}</div>
                        ) : null}
                    </div>
                    <div><button type="submit" className='mb-4 py-2 px-5 me-2 text-m w-full text-white font-bold focus:outline-none 
              bg-red-500 rounded-full hover:bg-red-600 focus:z-10 focus:shadow-md hover:shadow-md'>¡Crear cuenta!</button></div>
                    <button 
  type="button"  
  onClick={signInWithGoogle}
  className="mb-4 w-full text-white bg-[#434343] hover:bg-[#434343]/90 focus:outline-nonefont-medium hover:shadow-md rounded-full text-sm pl-[4.5rem] pr-0 py-2.5 text-center inline-flex items-center me-2"
>
  <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
    <path d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"/>
  </svg>
  Registrarse con Google
</button>
                    <div className='text-xs text-[#434343]'>¿Ya tienes una cuenta? ¡Inicia sesión <a onClick={setRegistro} className='text-xs text-[#f4262f] cursor-pointer hover:font-bold'>aquí</a>!</div>
                </Form>
                </div>
            )}
            </Formik>
  </div>
    );
}