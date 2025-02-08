import { Table, Tbody, Td, TdActions, TdPhoto, Th, Thead } from "../components/ui/Table";
import { Form, Input, InputFile, InputRadio, InputRadioOption } from "../components/ui/Form";
import { mixed, string } from "yup";
import Button from "../components/ui/Button";
import { faAddressCard, faEnvelope, faImagePortrait, faLock, faSave, faShieldHalved, faUser } from "@fortawesome/free-solid-svg-icons";
import UseCrud from "../hooks/useCrud";
import { isCedula } from "../common/validations";
import { faImage } from "@fortawesome/free-solid-svg-icons/faImage";
import AnimateElement from "../components/AnimateElement";

export default function Users() {
    const { datalist, showForm, formValues, editMode, onSubmit, onRemove } = UseCrud({
        resource: "user",
        entity: "Usuario",
        isFormData: true,
    });

    return (
        <AnimateElement>
            <Table show={!showForm}>
                <Thead>
                    <Th label="ID" mobile classTh="w-0" />
                    <Th label="Foto" mobile />
                    <Th label="Name" mobile />
                    <Th label="Username" />
                    <Th label="Email" />
                    <Th label="Role" />
                    <Th label="Actions" mobile />
                </Thead>
                <Tbody datalist={datalist}>
                    <Td name="id" mobile />
                    <TdPhoto name="photo_url" mobile />
                    <Td name="name" mobile />
                    <Td name="username" />
                    <Td name="email" />
                    <Td name="role" />
                    <TdActions onClickEdit={editMode} onClickDelete={onRemove} />
                </Tbody>
            </Table>

            <Form values={formValues} className=" sm:grid-cols-2 " show={showForm} onSubmit={onSubmit}>
                <Input
                    name="name"
                    label="Nombre:"
                    validation={string().required("Ingrese su nombre").min(3, "Mínimo 3 caracteres").max(25, "Máximo 25 caracteres")}
                    icon={faUser}
                    placeholder="Ingrese su nombre"
                />
                <Input
                    name="lastname"
                    label="Apellido:"
                    validation={string().required("Ingrese su apellido").min(3, "Mínimo 3 caracteres").max(25, "Máximo 25 caracteres")}
                    icon={faUser}
                    placeholder="Ingrese su apellido"
                />
                <Input
                    name="dni"
                    label="Cédula:"
                    validation={string()
                        .required("Ingrese su cédula")
                        .length(10, "10 caracteres")
                        .test("is-cedula", "Ingrese una cédula válida", isCedula)}
                    icon={faAddressCard}
                    placeholder="Ingrese su nombre"
                />
                <Input
                    name="email"
                    label="Email:"
                    validation={string().required("Ingrese su email").email("Ingrese un email válido")}
                    icon={faEnvelope}
                    placeholder="Ingrese su email"
                />
                <Input
                    name="username"
                    label="Username:"
                    validation={string().required("Ingrese su usuario").min(8, "Mínimo 8 caracteres").max(20, "Máximo 20 caracteres")}
                    icon={faImagePortrait}
                    placeholder="Ingrese su usuario"
                />
                <Input
                    name="password"
                    label="Contraseña:"
                    validation={string().min(8, "Mínimo 8 caracteres").max(30, "Máximo 30 caracteres")}
                    icon={faLock}
                    type="password"
                    placeholder="Ingrese su contraseña"
                />
                <InputRadio name="role" label="Role:" validation={string().required("Seleccione un rol")}>
                    <InputRadioOption value="admin" label="Admin" icon={faShieldHalved} />
                    <InputRadioOption value="user" label="User" icon={faUser} />
                </InputRadio>
                <InputFile
                    name="photo"
                    label="Foto:"
                    icon={faImage}
                    placeholder="Seleccione una foto"
                    validation={mixed()
                        .test("fileType", "Solo se permiten archivos JPG, JPEG o PNG", (value) => {
                            return value && ["image/jpeg", "image/png"].includes(value.type);
                        })
                        .test("fileSize", "El archivo debe ser menor o igual a 1MB", (value) => {
                            return value && value.size <= 1000000;
                        })}
                />
                <Button className=" sm:col-span-2 w-full max-w-96 mx-auto uppercase mt-2 " type="submit" label="Guardar" icon={faSave} />
            </Form>
        </AnimateElement>
    );
}
