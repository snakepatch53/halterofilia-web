import { useCallback, useEffect, useState } from "react";
import { usePanelStore } from "../stores/usePanelStore";
import CustomHeader from "../session.components/crud/CustomHeader";
import { edit as _edit, list as _list, remove as _remove, save as _save } from "../services/crudService";
import { showNotification } from "../components/Notification";
import { searchInArray } from "../common/utils";

export default function UseCrud({
    resource,
    entity = "",
    includeSubmitValues = {},
    list = null,
    save = null,
    edit = null,
    remove = null,
    isFormData = false,
    httpQuery = "",
}) {
    const { setHeaderComponent, resetHeaderComponent } = usePanelStore((state) => state);
    const [datalist, setDatalist] = useState(null);
    const [datalistFiltered, setDatalistFiltered] = useState(null);
    const [selected, setSelected] = useState(undefined);
    const toggleShowForm = () => setSelected((prev) => (prev === undefined ? null : undefined));

    const showForm = selected !== undefined;

    useEffect(() => {
        if (list) list(httpQuery).then((res) => (res.success ? setDatalist(res.data) : setDatalist([])));
        else _list(resource, httpQuery).then((res) => (res.success ? setDatalist(res.data) : setDatalist([])));
    }, [resource, list, httpQuery]);

    const handleSearch = useCallback(
        (e) => {
            const { value } = e.target;
            if (value === "") return setDatalistFiltered(null);
            setDatalistFiltered(searchInArray(datalist, value));
        },
        [datalist]
    );

    useEffect(() => {
        setHeaderComponent(() => (
            <CustomHeader
                onClickButton={toggleShowForm}
                showForm={!showForm}
                onSearch={handleSearch}
                searchPlaceholder={"Buscar " + entity.toLowerCase()}
            />
        ));
        return () => resetHeaderComponent();
    }, [setHeaderComponent, resetHeaderComponent, showForm, handleSearch, entity]);

    const handleSave = (res) => {
        if (!res.success) return dangerNotification(res);
        setSelected(undefined);
        setDatalist((prev) => [...prev, res.data]);
        successNotification(res, "Registro guardado");
    };
    const handleEdit = (res) => {
        if (!res.success) return dangerNotification(res);
        setSelected(undefined);
        setDatalist((prev) => prev.map((item) => (item.id === res?.data?.id ? res.data : item)));
        successNotification(res, "Registro actualizado");
    };
    const handleRemove = (res, data) => {
        if (!res.success) return dangerNotification(res);
        setDatalist((prev) => prev.filter((item) => item.id !== data.id));
        successNotification(res, "Registro eliminado");
    };

    return {
        datalist: datalistFiltered || datalist,
        showForm,
        formValues: selected,
        editMode: setSelected,
        onRemove: (data) => {
            if (remove) return remove(data.id).then((res) => handleRemove(res, data));
            _remove(resource, data.id).then((res) => handleRemove(res, data));
        },
        onSubmit: (values) => {
            Object.keys(values).forEach((key) => (!values[key] ? delete values[key] : null));
            let _values = { ...includeSubmitValues, ...values };
            if (isFormData) {
                const formData = new FormData();
                Object.keys(values).forEach((key) => formData.append(key, values[key]));
                _values = formData;
            }

            if (selected) {
                if (edit) return edit(_values, selected?.id, isFormData, httpQuery).then(handleEdit);
                return _edit(resource, _values, selected?.id, isFormData, httpQuery).then(handleEdit);
            }
            if (save) return save(_values, isFormData, httpQuery).then(handleSave);
            _save(resource, _values, isFormData, httpQuery).then(handleSave);
        },
    };
}

function dangerNotification(res) {
    if (res.success) return;
    let message = "Error de servidor";
    if (res?.message) {
        if (Array.isArray(res?.message)) message = res?.message[0];
        else message = res?.message;
    }
    showNotification({ title: "Error", message, type: "danger" });
}

function successNotification(res, message) {
    if (!res.success) return;
    showNotification({ title: "Éxito", message, type: "success" });
}
