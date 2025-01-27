import styled from "styled-components";
import React from "react";
import { cls } from "../../common/utils";

export function Table({ classWrap = "", classTable = "", children }) {
    return (
        <div className={cls("w-full overflow-hidden rounded-xl ", classWrap)}>
            <TableStyle className={cls("w-full", classTable)}>{children}</TableStyle>
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

export function Tbody({ data, keyName, classBody = "", classTr = "", children }) {
    return (
        <tbody className={cls("", classBody)}>
            {data.map((row) => (
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
    return (
        <td
            className={cls(" p-4 opacity-60 font-custom2 ", classTd, {
                "hidden md:table-cell": !mobile,
            })}
        >
            {data[name]}
        </td>
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
