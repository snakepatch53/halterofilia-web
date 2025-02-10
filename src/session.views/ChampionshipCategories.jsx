import { Table, Tbody, Td, TdActions, Th, Thead } from "../components/ui/Table";
import { Form, Input, InputRadio, InputRadioOption } from "../components/ui/Form";
import { number, string } from "yup";
import Button from "../components/ui/Button";
import { faChild, faChildDress, faDumbbell, faGear, faSave } from "@fortawesome/free-solid-svg-icons";
import UseCrud from "../hooks/useCrud";
import AnimateElement from "../components/AnimateElement";
import { Link, useNavigate, useParams } from "react-router-dom";
import { findAllByChampionshipId } from "../services/CategoryService";
import { useCallback, useEffect, useState } from "react";
import { ROUTES_SESSION, USER_ROLES } from "../common/constants";
import { findOne } from "../services/ChampionshipService";
import TitleEntity from "../session.components/crud/TitleEntity";
import Loading from "../components/Loading";
import { cls } from "../common/utils";
import { useAuthStore } from "../stores/useAuthStore";

export default function ChampionshipCategories() {
    const { id } = useParams();
    const { user } = useAuthStore((state) => state);
    const [championship, setChampionship] = useState(null);
    const navigate = useNavigate();

    const list = useCallback((httpQuery) => findAllByChampionshipId(id, httpQuery), [id]);
    const { datalist, showForm, formValues, editMode, onSubmit, onRemove } = UseCrud({
        resource: "category",
        httpQuery: "?include=championship,championship.user,judges,judges.user",
        list,
        entity: "Categoria",
        includeSubmitValues: { championshipId: id },
    });

    useEffect(() => {
        findOne(id).then((res) => setChampionship(res?.success ? res.data : false));
    }, [id]);

    const ButtonConfig = ({ data }) => {
        const url = ROUTES_SESSION.BASE + ROUTES_SESSION.CATEGORy_JUDGES.replace(":id", data?.id);
        return <Button tag={Link} to={url} icon={faGear} className=" h-10 w-10 " variant={2} />;
    };

    if (championship === null || datalist === null) return <Loading />;
    else if (championship === false) return navigate(ROUTES_SESSION.BASE + ROUTES_SESSION.CHAMPIONSHIPS);

    return (
        <AnimateElement>
            <TitleEntity title="Categorías de la Competencia" label={championship?.name} />
            <Table show={!showForm}>
                <Thead>
                    <Th label="ID" mobile classTh="w-0" />
                    <Th label="Weight" mobile />
                    <Th label="Gender" mobile />
                    <Th label="User" classTh={cls({ hidden: user.role !== USER_ROLES.ADMIN })} />
                    <Th label="Judges" />
                    <Th label="Actions" mobile />
                </Thead>
                <Tbody datalist={datalist}>
                    <Td name="id" mobile />
                    <Td name="weight" mobile formatter={(v) => v + "kg"} />
                    <Td name="gender" classTd="capitalize" mobile />
                    <Td name="championship.user.name" classTd={cls({ hidden: user.role !== USER_ROLES.ADMIN })} />
                    <Td name="judges" classTd="capitalize" formatter={(_v, d) => d.judges.map((v) => v.user?.name).join(", ")} />
                    <TdActions onClickEdit={editMode} onClickDelete={onRemove}>
                        <ButtonConfig />
                    </TdActions>
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
