import { Table, Tbody, Td, TdActions, Th, Thead } from "../components/ui/Table";
import { Form, Input, InputSelect, InputSelectOption, InputTextArea } from "../components/ui/Form";
import { string } from "yup";
import Button from "../components/ui/Button";
import { faCalendar, faDumbbell, faGear, faLocationArrow, faLocationDot, faPhone, faSave, faTextWidth } from "@fortawesome/free-solid-svg-icons";
import UseCrud from "../hooks/useCrud";
import { useAuthStore } from "../stores/useAuthStore";
import { list as listUsers } from "../services/userService";
import { useEffect, useState } from "react";
import { ROUTES_SESSION, USER_ROLES } from "../common/constants";
import AnimateElement from "../components/AnimateElement";
import { formatDate } from "../common/utils";
import { Link } from "react-router-dom";

export default function Championships() {
    const [users, setUsers] = useState(null);
    const { user } = useAuthStore((state) => state);
    const { datalist, showForm, formValues, editMode, onSubmit, onRemove } = UseCrud({
        resource: "championship",
        httpQuery: "?include=user",
        entity: "Competencia",
        includeSubmitValues: { userId: user?.id },
    });

    useEffect(() => {
        if (user?.role === USER_ROLES.ADMIN) listUsers().then((data) => setUsers(data));
        else setUsers([]);
    }, [user]);

    const ButtonConfig = ({ data }) => {
        const url = ROUTES_SESSION.BASE + ROUTES_SESSION.CHAMPIONSHIP_CATEGORIES.replace(":id", data?.id);
        return <Button tag={Link} to={url} icon={faGear} className=" h-10 w-10 " variant={2} />;
    };

    if (datalist === null) return null;
    return (
        <AnimateElement>
            <Table show={!showForm}>
                <Thead>
                    <Th label="ID" mobile classTh="w-0" />
                    <Th label="Name" mobile />
                    <Th label="City" />
                    <Th label="Address" />
                    <Th label="Date" />
                    <Th label="User" mobile />
                    <Th label="Actions" mobile />
                </Thead>
                <Tbody datalist={datalist}>
                    <Td name="id" mobile />
                    <Td name="name" mobile />
                    <Td name="city" />
                    <Td name="address" />
                    <Td name="date" formatter={formatDate} />
                    <Td name="user.name" mobile />
                    <TdActions onClickEdit={editMode} onClickDelete={onRemove}>
                        <ButtonConfig />
                    </TdActions>
                </Tbody>
            </Table>

            <Form values={formValues} className=" sm:grid-cols-2 " show={showForm} onSubmit={onSubmit}>
                <Input
                    name="name"
                    label="Nombre:"
                    validation={string().required("Ingrese el nombre").min(3, "Mínimo 3 caracteres").max(50, "Máximo 50 caracteres")}
                    icon={faDumbbell}
                    placeholder="Ingrese el nombre"
                />
                <Input
                    name="date"
                    label="Fecha:"
                    type="datetime-local"
                    validation={string().required("Seleccione la fecha")}
                    icon={faCalendar}
                    placeholder="Seleccione la fecha"
                />
                <InputTextArea
                    name="description"
                    label="Description:"
                    validation={string().required("Ingrese la descripción").min(20, "Mínimo 3 caracteres").max(200, "Máximo 50 caracteres")}
                    icon={faTextWidth}
                    placeholder="Ingrese la descripción"
                    className=" sm:col-span-2 "
                />
                <Input
                    name="phone"
                    label="Celular:"
                    validation={string()
                        .required("Ingrese el numero de celular")
                        .matches(/^09\d{8}$/, "El número de celular debe comenzar con 09 y tener 10 dígitos")}
                    icon={faPhone}
                    placeholder="Ingrese el numero de celular"
                />
                <InputSelect name="country" label="País:" validation={string().required("Seleccione el país")}>
                    <InputSelectOption value="Ecuador" label="Ecuador" />
                </InputSelect>
                <InputSelect name="city" label="Ciudad:" validation={string().required("Seleccione la ciudad")}>
                    <InputSelectOption value="Macas" label="Macas" />
                    <InputSelectOption value="Puyo" label="Puyo" />
                </InputSelect>
                <Input
                    name="address"
                    label="Dirección:"
                    validation={string().required("Ingrese la dirección").min(3, "Mínimo 3 caracteres").max(50, "Máximo 50 caracteres")}
                    icon={faLocationArrow}
                    placeholder="Ingrese la dirección"
                />
                <Input
                    name="location"
                    label="Coordenadas:"
                    validation={string().required("Ingrese las coordenadas").min(3, "Mínimo 3 caracteres").max(50, "Máximo 50 caracteres")}
                    icon={faLocationDot}
                    placeholder="Ingrese las coordenadas"
                />

                <InputSelect
                    show={user.role === USER_ROLES.ADMIN}
                    name="userId"
                    valueInObject="user.id"
                    label="Usuario:"
                    validation={string().required("Seleccione el usuario")}
                    datalist={{
                        list: users,
                        key: "id",
                        value: "id",
                        label: "name",
                    }}
                />

                <Button className=" sm:col-span-2 w-full max-w-96 mx-auto uppercase mt-2 " type="submit" label="Guardar" icon={faSave} />
            </Form>
        </AnimateElement>
    );
}
