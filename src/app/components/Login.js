"use client";
import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Dancing_Script } from "next/font/google";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Script from "next/script";
import Swal from 'sweetalert2'
import { Nunito } from "next/font/google";
import styles from "./css/sweet-alert.css"

// Configura la fuente
const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
});

const SignupSchema = Yup.object().shape({
  password: Yup.string()

    .min(2, '¡Muy corto!')
    .max(50, '¡Muy largo!')
    .required('Necesitas escribir tu contraseña.'),
  email: Yup.string().email('Ese correo no se ve bien, revisa que esté completo.').required('Necesitas escribir tu correo.'),
});

export const Login = ({ setRegistro }) => {
  const [isLoading, setIsLoading] = useState(false); // Estado para manejar la carga
  const router = useRouter();

  return (
    <>
      <Script
        src="https://cdn.lordicon.com/lusqsztk.js"
        strategy="beforeInteractive"
      />

    <div className='flex content-center justify-center'>
      <Formik
        initialValues={{
          password: '',
          email: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={async (values) => {
          console.log(values);
          setIsLoading(true); // Activa la animación de carga
          try {
            await signInWithEmailAndPassword(auth, values.email, values.password);
            router.push("/dashboard");
          } catch (error) {
            Swal.fire({
              title: "Ups, tu contraseña o correo no coinciden",
              text: "Por favor, verifica tus datos e inténtalo de nuevo.",
              customClass: {
                title: 'swal-nunito-title',
                container: 'swal-nunito swal-container',
                confirmButton: 'swal-nunito swal-button',
                actions: 'swal-nunito swal-actions',
              },
            });
          } finally {
            setIsLoading(false); // Desactiva la animación de carga
          }
        }}
      >
        {({ errors, touched }) => (
          <div className='flex text-center justify-center'>
            <Form className='flex flex-col'>
              <div className='mb-4 flex justify-center'>
                <Image src="/tarjeto-horizontal-logo.svg" alt='Logo horizontal de tarjeto' width={150} height={150} priority={false} />
              </div>
              <div className={`mb-4 w-[20rem] text-2xl font-semibold text-[#f4262f]`}>Tú ya eres de los nuestros, nomás pásale.</div>
              <div className={`mb-4 w-[20rem] text-xl text-[#434343]`}>Inicia sesión para continuar</div>
              <Field
                name="email"
                type="email"
                className={`bg-[#000000] bg-opacity-5 border-[.1rem] w-[20rem] h-14 p-5 text-[#434343] focus:outline-none focus:shadow-md rounded-xl ${errors.email && touched.email ? 'border-red-600' : 'border-[#000000] border-opacity-50'}`}
                placeholder="Ingresa tu correo electrónico"
              />
              <div className='mb-3 mt-1'>
                {errors.email && touched.email ? (
                  <div className='text-xs text-red-600'>{errors.email}</div>
                ) : null}
              </div>
              <Field
                name="password"
                type="password"
                className={`bg-[#000000] bg-opacity-5 border-[.1rem] w-[20rem] h-14 p-5 text-[#434343] focus:outline-none focus:shadow-md rounded-xl ${errors.password && touched.password ? 'border-red-600' : 'border-[#000000] border-opacity-50'}`}
                placeholder="Ingresa tu contraseña"
              />
              <div className='mb-3 mt-1'>
                {errors.password && touched.password ? (
                  <div className='text-xs text-red-600'>{errors.password}</div>
                ) : null}
              </div>
              <div>
              <div>
                  <button
                    type="submit"
                    className={`mb-4 py-2 px-5 me-2 text-m w-full text-white font-bold focus:outline-none focus:shadow-md hover:shadow-md bg-red-500 rounded-full hover:bg-red-600 flex items-center justify-center`}
                    disabled={isLoading} // Desactiva el botón durante la carga
                  >
                    {isLoading ? (
                      <lord-icon
                        src="https://cdn.lordicon.com/gkryirhd.json"
                        trigger="loop"
                        state="loop-snake-alt"
                        colors="primary:#ffffff"
                        style={{ width: "1.5rem", height: "1.5rem" }}
                      ></lord-icon>
                    ) : (
                      "¡Ingresar a tarjeto!"
                    )}
                  </button>
                </div>
                <button
                  type="button"
                  className="mb-4 w-full text-white bg-[#434343] hover:bg-[#434343]/90 focus:outline-none hover:shadow-md font-medium rounded-full text-sm pl-16 py-2.5 text-center inline-flex items-center me-2"
                >
                  <svg
                    className="w-4 h-4 me-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 19"
                  >
                    <path d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" />
                  </svg>
                  Iniciar sesión con Google
                </button>
                <div className="mb-2">
                  <a className="text-xs text-[#f4262f]">
                    ¡Ay!, creo que olvidé mi contraseña.
                  </a>
                </div>
                <div className="text-xs text-[#434343]">
                  ¿Eres nuevo en tarjeto? ¡Crea una nueva cuenta{" "}
                  <a
                    onClick={setRegistro}
                    className="text-xs text-[#f4262f] cursor-pointer hover:font-bold"
                  >
                    aquí
                  </a>
                  !
                </div>
              </div>
              </Form>
            </div>
          )}
        </Formik>
      </div>
    </>
  );
};
