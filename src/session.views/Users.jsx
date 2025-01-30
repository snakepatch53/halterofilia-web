import { Table, Tbody, Td, TdActions, Th, Thead } from "../components/ui/Table";
import { Form, Input, InputRadio, InputRadioOption } from "../components/ui/Form";
import { string } from "yup";
import Button from "../components/ui/Button";
import { faLock, faSave, faShieldHalved, faUser } from "@fortawesome/free-solid-svg-icons";
import UseCrud from "../hooks/useCrud";

export default function Users() {
    const { datalist, showForm, formValues, editMode, onSubmit, onRemove } = UseCrud({
        resource: "user",
    });

    return (
        <>
            <Table show={!showForm}>
                <Thead>
                    <Th label="ID" mobile />
                    <Th label="Name" mobile />
                    <Th label="Username" />
                    <Th label="Role" />
                    <Th label="Actions" />
                </Thead>
                <Tbody datalist={datalist}>
                    <Td name="id" mobile />
                    <Td name="name" mobile />
                    <Td name="username" />
                    <Td name="role" />
                    <TdActions onClickEdit={editMode} onClickDelete={onRemove} />
                </Tbody>
            </Table>

            <Form values={formValues} className=" sm:grid-cols-2 " show={showForm} onSubmit={onSubmit}>
                <Input
                    name="name"
                    label="Nombre:"
                    validation={string().required("Ingrese su nombre").min(3, "Mínimo 3 caracteres").max(50, "Máximo 50 caracteres")}
                    icon={faUser}
                    placeholder="Ingrese su nombre"
                />
                <InputRadio name="role" label="Role:" validation={string().required("Seleccione un rol")}>
                    <InputRadioOption value="admin" label="Admin" icon={faShieldHalved} />
                    <InputRadioOption value="user" label="User" icon={faUser} />
                </InputRadio>
                <Input
                    name="username"
                    label="Username:"
                    validation={string().required("Ingrese su usuario").min(3, "Mínimo 3 caracteres").max(50, "Máximo 50 caracteres")}
                    icon={faUser}
                    placeholder="Ingrese su correo"
                />
                <Input
                    name="password"
                    label="Contraseña:"
                    validation={string().required("Ingrese su contraseña").min(6, "Mínimo 6 caracteres").max(50, "Máximo 50 caracteres")}
                    icon={faLock}
                    type="password"
                    placeholder="Ingrese su contraseña"
                />
                <Button className=" sm:col-span-2 w-full max-w-96 mx-auto uppercase mt-2 " type="submit" label="Guardar" icon={faSave} />
            </Form>
        </>
    );
}
