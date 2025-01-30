import styled from "styled-components";
import React, { useEffect, useRef, useState } from "react";
import { cls } from "../../common/utils";
import Button from "./Button";
import { faCancel, faCheck, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

export function Table({ className = "", classTable = "", show = true, children }) {
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
            <TableStyle className={cls("w-full", classTable)}>
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
                "hidden md:table-cell": !mobile,
            })}
        >
            {label}
        </th>
    );
}

export function Td({ data, name, mobile = false, classTd }) {
    let value = data[name];
    if (name.includes(".")) {
        const keys = name.split(".");
        value = data;
        keys.forEach((key) => {
            if (value) value = value[key];
        });
    }
    return (
        <td
            className={cls(" p-4 opacity-60 font-custom2 ", classTd, {
                "hidden md:table-cell": !mobile,
            })}
        >
            {value}
        </td>
    );
}

export function TdActions({ onClickEdit = null, onClickDelete = null, classTd, data }) {
    return (
        <td className={cls(" p-4 opacity-60 font-custom2 ", classTd)}>
            <div className=" flex gap-2 ">
                {onClickEdit && <Button onClick={() => onClickEdit(data)} icon={faEdit} className=" h-10 w-10 " variant={2} />}
                {onClickDelete && <Button onClick={() => onClickDelete(data)} icon={faTrash} className=" h-10 w-10 " variant={2} />}
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

const TableStyle = styled.table`
    th,
    td {
        border: 1px solid rgba(0, 0, 0, 0.15);
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
