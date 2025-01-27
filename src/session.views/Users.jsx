import { useEffect } from "react";
import { Table, Tbody, Td, Th, Thead } from "../components/ui/Table";
import { usePanelStore } from "../stores/usePanelStore";
import CustomHeader from "../session.components/crud/CustomHeader";
import { Form, Input } from "../components/ui/Form";
import { string } from "yup";
import Button from "../components/ui/Button";
import { faSave } from "@fortawesome/free-solid-svg-icons";

const data = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Developer" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Designer" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Manager" },
    { id: 4, name: "Alice Brown", email: "alice@example.com", role: "Tester" },
    { id: 5, name: "Charlie Davis", email: "charlie@example.com", role: "Product Owner" },
    { id: 6, name: "Eva Wilson", email: "eva@example.com", role: "UX Researcher" },
];

export default function Users() {
    const { setHeaderComponent, resetHeaderComponent } = usePanelStore((state) => state);
    useEffect(() => {
        setHeaderComponent(() => <CustomHeader />);
        return () => resetHeaderComponent();
    }, [setHeaderComponent, resetHeaderComponent]);
    return (
        <>
            <Table>
                <Thead>
                    <Th label="ID" mobile />
                    <Th label="Name" mobile />
                    <Th label="Email" />
                    <Th label="Role" />
                </Thead>
                <Tbody data={data} keyName="id">
                    <Td name="id" mobile />
                    <Td name="name" mobile />
                    <Td name="email" />
                    <Td name="role" />
                </Tbody>
            </Table>

            <Form className=" mt-4 grid-cols-2 " onSubmit={(values) => console.log(values)}>
                <Input
                    className=" col-span-2 "
                    name="name"
                    validation={string().required("Ingrese su nombre").min(3, "Mínimo 3 caracteres").max(50, "Máximo 50 caracteres")}
                    label="Nombre:"
                    placeholder="Ingrese su nombre"
                />
                <Input
                    name="email"
                    validation={string().required("Ingrese su correo").email("Ingrese un correo válido")}
                    type="email"
                    label="Correo:"
                    placeholder="Ingrese su correo"
                />
                <Input
                    name="password"
                    validation={string().required("Ingrese su contraseña").min(6, "Mínimo 6 caracteres").max(50, "Máximo 50 caracteres")}
                    type="password"
                    label="Contraseña:"
                    placeholder="Ingrese su contraseña"
                />
                <Button className=" col-span-2 w-full max-w-96 mx-auto uppercase mt-2 " type="submit" label="Crear" icon={faSave} />
            </Form>
        </>
    );
}
