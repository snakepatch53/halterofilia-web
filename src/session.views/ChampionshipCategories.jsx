import { Table, Tbody, Td, TdActions, Th, Thead } from "../components/ui/Table";
import { Form, Input, InputRadio, InputRadioOption } from "../components/ui/Form";
import { number, string } from "yup";
import Button from "../components/ui/Button";
import { faChild, faChildDress, faDumbbell, faSave } from "@fortawesome/free-solid-svg-icons";
import UseCrud from "../hooks/useCrud";
import AnimateElement from "../components/AnimateElement";
import { useParams } from "react-router-dom";
import { findAllByChampionshipId } from "../services/CategoryService";
import { useCallback } from "react";

export default function ChampionshipCategories() {
    const { id } = useParams();

    const list = useCallback((httpQuery) => findAllByChampionshipId(id, httpQuery), [id]);
    const { datalist, showForm, formValues, editMode, onSubmit, onRemove } = UseCrud({
        resource: "category",
        httpQuery: "?include=championship,championship.user",
        list,
        entity: "Categoria",
        includeSubmitValues: { championshipId: id },
    });

    if (datalist === null) return null;
    return (
        <AnimateElement>
            <Table show={!showForm}>
                <Thead>
                    <Th label="ID" mobile classTh="w-0" />
                    <Th label="Weight" mobile />
                    <Th label="Gender" mobile />
                    <Th label="User" mobile />
                    <Th label="Actions" mobile />
                </Thead>
                <Tbody datalist={datalist}>
                    <Td name="id" mobile />
                    <Td name="weight" mobile />
                    <Td name="gender" classTd="capitalize" mobile />
                    <Td name="championship.user.name" mobile />
                    <TdActions onClickEdit={editMode} onClickDelete={onRemove} />
                </Tbody>
            </Table>

            <Form values={formValues} className=" sm:grid-cols-2 " show={showForm} onSubmit={onSubmit}>
                <Input
                    name="weight"
                    label="Categoría hasta:"
                    type="number"
                    validation={number().required("Ingrese el peso").min(1, "Mínimo 1").max(200, "Máximo 200")}
                    icon={faDumbbell}
                    placeholder="Ingrese el peso en kg"
                />
                <InputRadio name="gender" label="Género:" validation={string().required("Seleccione el género")}>
                    <InputRadioOption value="masculino" label="Masculino" icon={faChild} />
                    <InputRadioOption value="femenino" label="Femenino" icon={faChildDress} />
                </InputRadio>

                <Button className=" sm:col-span-2 w-full max-w-96 mx-auto uppercase mt-2 " type="submit" label="Guardar" icon={faSave} />
            </Form>
        </AnimateElement>
    );
}
