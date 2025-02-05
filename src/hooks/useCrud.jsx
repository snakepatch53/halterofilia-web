import { useEffect, useState } from "react";
import { usePanelStore } from "../stores/usePanelStore";
import CustomHeader from "../session.components/crud/CustomHeader";
import { edit as _edit, list as _list, remove as _remove, save as _save } from "../services/crudService";

export default function UseCrud({ resource, includeSubmitValues = {}, list = null, save = null, edit = null, remove = null, isFormData = false }) {
    const { setHeaderComponent, resetHeaderComponent } = usePanelStore((state) => state);
    const [datalist, setDatalist] = useState(null);
    const [datalistFiltered, setDatalistFiltered] = useState(null);
    const [selected, setSelected] = useState(undefined);

    const toggleShowForm = () => setSelected((prev) => (prev === undefined ? null : undefined));

    const showForm = selected !== undefined;
    useEffect(() => {
        if (list) list().then((res) => setDatalist(res));
        else _list(resource).then((res) => setDatalist(res));
    }, [resource, list]);

    useEffect(() => {
        setHeaderComponent(() => (
            <CustomHeader
                onClickButton={toggleShowForm}
                showForm={!showForm}
                onSearch={(e) => {
                    const { value } = e.target;
                    if (value === "") return setDatalistFiltered(null);

                    setDatalistFiltered(
                        datalist?.filter((item) =>
                            Object.keys(item).some((key) =>
                                typeof item[key] === "string" ? item[key].toLowerCase().includes(value.toLowerCase()) : false
                            )
                        )
                    );
                }}
            />
        ));
        return () => resetHeaderComponent();
    }, [setHeaderComponent, resetHeaderComponent, selected, showForm, datalist]);

    const handleSave = (res) => {
        if (res) {
            setSelected(undefined);
            setDatalist((prev) => [...prev, res]);
        }
    };
    const handleEdit = (res) => {
        if (res) {
            setSelected(undefined);
            setDatalist((prev) => prev.map((item) => (item.id === res?.id ? res : item)));
        }
    };
    const handleRemove = (res, data) => {
        if (res) setDatalist((prev) => prev.filter((item) => item.id !== data.id));
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
                if (edit) return edit(_values, selected?.id, isFormData).then(handleEdit);
                return _edit(resource, _values, selected?.id, isFormData).then(handleEdit);
            }
            if (save) return save(_values, isFormData).then(handleSave);
            _save(resource, _values, isFormData).then(handleSave);
        },
    };
}
