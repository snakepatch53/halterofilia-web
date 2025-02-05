import { faEye, faEyeSlash, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ErrorMessage, Field, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { showNotification } from "../components/Notification";
import { cls } from "../common/utils";
import { login } from "../services/authService";

export default function Login() {
    return (
        <div className=" bg-[--c2] text-[--c2-txt] flex justify-center items-center w-full min-h-screen ">
            <Formik
                validationSchema={Yup.object({
                    username: Yup.string().required("Ingrese su correo electrónico"),
                    password: Yup.string().required("Ingrese su contraseña"),
                })}
                initialValues={{
                    username: "",
                    password: "",
                }}
                onSubmit={(values, { resetForm, setSubmitting }) => {
                    login(values).then((res) => {
                        setSubmitting(false);
                        if (!res)
                            return showNotification({
                                title: "Cancelado",
                                message: "Credenciales incorrectas",
                                type: "danger",
                            });
                        resetForm();
                        showNotification({
                            title: "Sesión iniciada",
                            message: "Bienvenido",
                            type: "success",
                        });
                    });
                }}
            >
                {({ handleSubmit, isSubmitting }) => (
                    <form className=" flex flex-col p-10 w-full max-w-96 rounded-md " onSubmit={handleSubmit}>
                        <img className=" w-full max-w-28 aspect-square object-contain m-auto " src="/logo.png" alt="Logo de Ideasoft" />
                        <h1 className=" text-3xl font-bold text-center ">Iniciar sesión</h1>
                        <Input name="username" label="Usuario:" placeholder="Ejm: pedro123" />
                        <Input name="password" label="Contraseña:" placeholder="Ejm: ********" type="password" />
                        <Button label="Iniciar sesión" isSubmitting={isSubmitting} />
                    </form>
                )}
            </Formik>
            {/*  */}
        </div>
    );
}

function Input({ type = "text", name, label = "", placeholder = "" }) {
    const [show, setShow] = useState(false);
    const showPassword = () => setShow(!show);
    const _type = show ? "text" : type;
    return (
        <>
            <label className=" ml-1 mb-1 mt-2 ">{label}</label>
            <div className=" flex bg-white border text-black rounded-md p-2 ">
                <Field className=" flex-1 bg-transparent " name={name} type={_type} placeholder={placeholder} />
                {type === "password" && (
                    <button type="button" onClick={showPassword}>
                        <FontAwesomeIcon icon={show ? faEye : faEyeSlash} />
                    </button>
                )}
            </div>
            <ErrorMessage name={name} component="div" className="text-red-500 text-sm" />
        </>
    );
}

function Button({ type = "submit", label = "", isSubmitting }) {
    return (
        <button
            disabled={isSubmitting}
            className={cls(" bg-[--c1] text-white rounded-md p-3 mt-5 opacity-90 hover:opacity-100 transition-all ", {
                " opacity-50 hover:opacity-50 ": isSubmitting,
            })}
            type={type}
        >
            {!isSubmitting ? label : <FontAwesomeIcon icon={faSpinner} spin />}
        </button>
    );
}
