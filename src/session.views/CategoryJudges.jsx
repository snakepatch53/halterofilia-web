import { Table, Tbody, Td, TdActions, Th, Thead } from "../components/ui/Table";
import { Form, InputRadio, InputRadioOption, InputSelect } from "../components/ui/Form";
import { string } from "yup";
import Button from "../components/ui/Button";
import { faCheck, faClose, faSave } from "@fortawesome/free-solid-svg-icons";
import UseCrud from "../hooks/useCrud";
import AnimateElement from "../components/AnimateElement";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { findAllByCategoryId } from "../services/JudgeService";
import { list as listUsers } from "../services/userService";
import TitleEntity from "../session.components/crud/TitleEntity";
import { findOne } from "../services/CategoryService";
import Loading from "../components/Loading";

export default function CategoryJudges() {
    const { id } = useParams();
    const [users, setUsers] = useState(null);
    const [category, setCategory] = useState(null);

    const list = useCallback((httpQuery) => findAllByCategoryId(id, httpQuery), [id]);
    const { datalist, showForm, formValues, editMode, onSubmit, onRemove } = UseCrud({
        resource: "judge",
        httpQuery: "?include=category,user",
        list,
        entity: "Juez",
        includeSubmitValues: { categoryId: id },
    });

    useEffect(() => {
        listUsers().then((res) => setUsers(res?.success ? res.data : []));
    }, []);
    useEffect(() => {
        findOne(id).then((res) => setCategory(res?.success ? res.data : false));
    }, [id]);

    if (datalist === null) return null;
    if (category === null || datalist === null) return <Loading />;
    else if (category === false) return <p>No Existe</p>;
    return (
        <AnimateElement>
            <div className="flex justify-between items-center mb-4 p-6 rounded-xl bg-black/10">
                <TitleEntity title="Competencia" label={category?.championship?.name} className=" m-0 " />
                <TitleEntity title="Jueces de la Categoría" label={category?.weight + "kg - " + category?.gender} className=" m-0 " />
            </div>
            <Table show={!showForm}>
                <Thead>
                    <Th label="ID" mobile classTh="w-0" />
                    <Th label="User" mobile />
                    <Th label="Supervisor" mobile />
                    <Th label="Actions" mobile />
                </Thead>
                <Tbody datalist={datalist}>
                    <Td name="id" mobile />
                    <Td name="user.name" classTd="capitalize" mobile />
                    <Td name="supervisor" formatter={(v) => (v ? "Si" : "No")} mobile />
                    <TdActions onClickEdit={editMode} onClickDelete={onRemove} />
                </Tbody>
            </Table>

            <Form values={formValues} className=" sm:grid-cols-2 " show={showForm} onSubmit={onSubmit}>
                <InputSelect
                    // show={user.role === USER_ROLES.ADMIN}
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
                <InputRadio
                    name="supervisor"
                    label="¿Es supervisor?:"
                    formatter={(v) => v.toString()}
                    validation={string().required("Responsa si o no!")}
                >
                    <InputRadioOption value="true" label="Si" icon={faCheck} />
                    <InputRadioOption value="false" label="No" icon={faClose} />
                </InputRadio>

                <Button className=" sm:col-span-2 w-full max-w-96 mx-auto uppercase mt-2 " type="submit" label="Guardar" icon={faSave} />
            </Form>
        </AnimateElement>
    );
}
