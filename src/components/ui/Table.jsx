import styled from "styled-components";
import React, { useEffect, useRef, useState } from "react";
import { cls, getValueFromObject } from "../../common/utils";
import Button from "./Button";
import { faCancel, faCheck, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { usePanelStore } from "../../stores/usePanelStore";

export function Table({ className = "", classTable = "", show = true, children }) {
    const { darkMode } = usePanelStore((state) => state);
    const [selectedAction, setSelectedAction] = useState(null);

    if (!show) return null;
    const cloneChildren = (children) =>
        React.Children.map(children, (child) => {
            if (child?.type?.name === "TdActions") {
                const { onClickDelete } = child.props;
                return React.cloneElement(child, {
                    onClickDelete: (data) =>
                        setSelectedAction(() => async () => {
                            await onClickDelete(data);
                            setSelectedAction(null);
                        }),
                });
            }
            if (child?.props?.children)
                return React.cloneElement(child, {
                    children: cloneChildren(child.props.children),
                });

            return child;
        });

    const Children = () => cloneChildren(children);
    return (
        <div className={cls(" w-full overflow-hidden rounded-xl ", className)}>
            <TableStyle className={cls("w-full", classTable)} darkmode={darkMode}>
                <Children />
            </TableStyle>
            <ConfirmModal
                text="¿Estas seguro de realizar esta acción?"
                show={selectedAction !== null}
                onCancel={() => setSelectedAction(null)}
                onConfirm={selectedAction}
            />
        </div>
    );
}

export function Thead({ classThead = "", classTr = "", children }) {
    return (
        <thead className={cls(" bg-black/10 ", classThead)}>
            <tr className={cls("", classTr)}>{children}</tr>
        </thead>
    );
}

export function Tbody({ datalist, keyName = "id", classBody = "", classTr = "", children }) {
    if (!datalist) return null;
    if (Object?.keys(datalist)?.length === 0) return null;
    return (
        <tbody className={cls("", classBody)}>
            {datalist.map((row) => (
                <tr key={row[keyName]} className={cls("  ", classTr)}>
                    {React.Children.map(children, (child) => React.cloneElement(child, { data: row }))}
                </tr>
            ))}
        </tbody>
    );
}

export function Th({ label, mobile = false, classTh }) {
    return (
        <th
            className={cls(" p-4 opacity-80 text-left font-custom2 uppercase tracking-wider ", classTh, {
                "hidden lg:table-cell": !mobile,
            })}
        >
            {label}
        </th>
    );
}

export function Td({ data, name, mobile = false, classTd, formatter = (v) => v }) {
    let value = getValueFromObject(data, name);
    return (
        <td
            className={cls(" p-4 opacity-60 font-custom2 ", classTd, {
                " hidden lg:table-cell ": !mobile,
            })}
        >
            {formatter(value)}
        </td>
    );
}

export function TdPhoto({ data, name, mobile = false, classTd }) {
    let value = getValueFromObject(data, name);
    return (
        <td
            className={cls(" p-4 font-custom2 w-0 ", classTd, {
                "hidden lg:table-cell": !mobile,
            })}
        >
            <div className=" bg-black/20 w-10 m-auto aspect-square rounded-full overflow-hidden ">
                <img className=" h-full w-full object-cover " src={value} alt={`This is a User photo`} />
            </div>
        </td>
    );
}

export function TdActions({ onClickEdit = null, onClickDelete = null, classTd = "", classWrap = "", data, children }) {
    const Children = () => React.Children.map(children, (child) => React.cloneElement(child, { data }));

    return (
        <td className={cls(" p-4 opacity-60 font-custom2 w-0 ", classTd)}>
            <div className={cls(" flex flex-col sm:flex-row gap-2 ", classWrap)}>
                {onClickEdit && <Button onClick={() => onClickEdit(data)} icon={faEdit} className=" h-10 w-10 " variant={2} />}
                {onClickDelete && <Button onClick={() => onClickDelete(data)} icon={faTrash} className=" h-10 w-10 " variant={2} />}
                <Children />
            </div>
        </td>
    );
}

export function ConfirmModal({ text, show = false, onConfirm, onCancel }) {
    const modalRef = useRef();
    useEffect(() => {
        if (show) {
            const handleClickOutside = (event) => {
                if (modalRef.current && !modalRef.current.contains(event.target)) onCancel();
            };
            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [show, onCancel]);

    if (!show) return null;
    return (
        <div className=" fixed z-10 inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center ">
            <div ref={modalRef} className=" flex flex-col gap-4 bg-black/10 backdrop-blur-sm p-10 rounded-xl ">
                <p className=" font-custom2 tracking-wide text-lg ">{text}</p>
                <div className=" flex gap-4 justify-center ">
                    <Button label="Confirmar" icon={faCheck} onClick={onConfirm} />
                    <Button className=" bg-black/50 " variant={2} label="Cancelar" icon={faCancel} onClick={onCancel} />
                </div>
            </div>
        </div>
    );
}

const TableStyle = styled.table.withConfig({
    shouldForwardProp: (prop) => prop !== "darkmode", // Filtramos la prop 'darkmode'
})`
    th,
    td {
        border: ${({ darkmode }) => (darkmode ? "1px solid rgba(0, 0, 0, 0.15)" : "none")};
    }

    tr:first-child th {
        border-top: 0;
    }

    tr:last-child td {
        border-bottom: 0;
    }

    tr th:first-child,
    tr td:first-child {
        border-left: 0;
    }

    tr th:last-child,
    tr td:last-child {
        border-right: 0;
    }

    tr:nth-child(even) {
        background-color: rgba(0, 0, 0, 0.1);
    }

    tr:nth-child(odd) {
        background-color: rgba(0, 0, 0, 0.05);
    }

    tbody tr:hover {
        background-color: rgba(0, 0, 0, 0.2);
    }
`;
