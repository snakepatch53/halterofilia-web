import { faLock, faSpinner, faUser } from "@fortawesome/free-solid-svg-icons";
import { showNotification } from "../components/Notification";
import { cls } from "../common/utils";
import { login } from "../services/authService";
import Button from "../components/ui/Button";
import { Form, Input } from "../components/ui/Form";
import { string } from "yup";

export default function Login() {
    const handleSubmit = (values, { resetForm, setSubmitting }) => {
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
    };
    return (
        <div className=" flex flex-col justify-center items-center w-full min-h-screen bg-c2 dark:bg-dark-c2 text-c2-txt dark:text-dark-c2-txt  ">
            <div className=" flex flex-col items-center">
                <img className=" w-full max-w-28 aspect-square object-contain " src="/logo.png" alt="Logo de Ideasoft" />
                <h1 className=" text-3xl font-bold text-center ">Iniciar sesión</h1>
            </div>
            <Form
                onSubmit={handleSubmit}
                values={{
                    username: "",
                    password: "",
                }}
                className=" flex flex-col w-full max-w-96 bg-transparent "
            >
                <Input
                    icon={faUser}
                    type="text"
                    name="username"
                    label="Usuario:"
                    placeholder="Ejm: pedro123"
                    validation={string().required("Ingrese su nombre de usuario")}
                />
                <Input
                    icon={faLock}
                    type="password"
                    name="password"
                    label="Contraseña:"
                    placeholder="Ejm: ********"
                    validation={string().required("Ingrese su contraseña")}
                />

                <CustomButton isSubmitting />
            </Form>
        </div>
    );
}
function CustomButton({ isSubmitting }) {
    return (
        <Button
            type="submit"
            label="Iniciar sesión"
            icon={isSubmitting && faSpinner}
            disabled={isSubmitting}
            className={cls({
                " opacity-50 hover:opacity-50 ": isSubmitting,
            })}
        />
    );
}
