import { ErrorMessage, Field, Formik } from "formik";
import { cls } from "../../common/utils";
import React, { useEffect, useState } from "react";
import { object } from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faQuestion } from "@fortawesome/free-solid-svg-icons";

export function Form({ className = "", show = true, onSubmit = () => {}, values = null, children }) {
    const [initialValues, setInitialValues] = useState(null);
    const [validationSchema, setValidationSchema] = useState(null);

    useEffect(() => {
        let newInitialValues = {};
        const newValidationSchema = {};

        // Función recursiva para inspeccionar los children y sus hijos
        const extractInitialValues = (child) => {
            if (child?.props?.name) {
                const value = child?.props?.value || "";
                newInitialValues[child.props.name] = value;
                if (child?.props?.validation) newValidationSchema[child.props.name] = child.props.validation;
            }
            if (child?.props?.children) React.Children.forEach(child.props.children, extractInitialValues);
        };

        React.Children.forEach(children, extractInitialValues);
        setValidationSchema(object().shape(newValidationSchema));

        // Filtamos solo los valores que estén en el formulario
        if (values) {
            const newValues = Object.keys(newInitialValues).reduce((acc, key) => {
                if (key in values) acc[key] = values[key];
                else acc[key] = newInitialValues[key];
                return acc;
            }, {});
            newInitialValues = newValues;
        }

        setInitialValues(newInitialValues);
    }, [children, values]);

    if (!show) return null;
    if (!initialValues || !validationSchema) return null;

    // Función recursiva para pasar errors y touched solo a los Inputs
    const cloneChildrenWithProps = (children, errors, touched) => {
        return React.Children.map(children, (child) => {
            // Si el child tiene un name, es un Input, le pasamos errors y touched
            if (child?.props?.name) {
                const { name } = child.props;

                const isError = !errors[name] ? false : errors[name];
                const isTouched = !touched[name] ? false : touched[name];
                return React.cloneElement(child, {
                    error: !!isError && !!isTouched,
                });
            }

            // Si no es un Input, pero tiene children, recorrerlo recursivamente
            if (child?.props?.children) {
                return React.cloneElement(child, {
                    children: cloneChildrenWithProps(child.props.children, errors, touched),
                });
            }

            return child;
        });
    };

    return (
        <Formik initialValues={initialValues} enableReinitialize={true} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ handleSubmit, errors, touched }) => (
                <form onSubmit={handleSubmit} className={cls(" grid gap-4 bg-black/10 p-8 rounded-xl ", className)}>
                    {cloneChildrenWithProps(children, errors, touched)}
                </form>
            )}
        </Formik>
    );
}

function InputLayout({ name, label = null, error, className = "", classError = "", classContainerInput = "", children }) {
    return (
        <div className={cls(" flex flex-col gap-2 ", className)}>
            <label htmlFor={name} className=" pl-2 text-[--c4-txt] font-custom2 tracking-widest ">
                {label}
            </label>
            <div
                className={cls(" flex items-center p-3 bg-black/10 rounded-md border border-transparent", classContainerInput, {
                    " border border-red-500 ": error,
                })}
            >
                {children}
            </div>
            <div className=" h-2 ">
                <ErrorMessage name={name} component="div" className={cls(" pl-2 font-custom2 text-red-500 tracking-wide leading-3 ", classError)} />
            </div>
        </div>
    );
}

export function Input({ name, label = null, error, icon = null, className = "", classInput = "", classError, type, ...props }) {
    delete props?.value;

    const [show, setShow] = useState(false);
    const showPassword = () => setShow(!show);
    const _type = show ? "text" : type;

    return (
        <InputLayout name={name} label={label} error={error} className={cls(" group ", className)} classError={classError}>
            <FontAwesomeIcon icon={icon || faQuestion} className={cls(" text-sm ", { hidden: !icon })} />
            <Field className={cls(" px-3 w-full bg-transparent ", classInput)} type={_type} name={name} {...props} />
            {type === "password" && (
                <button className=" opacity-0 group-hover:opacity-100 transition-all " type="button" onClick={showPassword}>
                    <FontAwesomeIcon icon={show ? faEye : faEyeSlash} />
                </button>
            )}
        </InputLayout>
    );
}

export function InputTextArea({ name, label = null, error, icon = null, className = "", classInput = "", classError, ...props }) {
    delete props?.value;

    return (
        <InputLayout name={name} label={label} error={error} className={cls(" group ", className)} classError={classError}>
            <FontAwesomeIcon icon={icon || faQuestion} className={cls(" text-sm ", { hidden: !icon })} />
            <Field
                className={cls(" px-3 w-full bg-transparent ", classInput)}
                style={{ fieldSizing: "content" }}
                type="textarea"
                as="textarea"
                name={name}
                {...props}
            />
        </InputLayout>
    );
}

export function InputRadio({ name, label = null, error, children, className = "", classError }) {
    return (
        <InputLayout name={name} label={label} error={error} className={className} classError={classError} classContainerInput=" p-0 ">
            {React.Children.map(children, (child) => {
                return React.cloneElement(child, { name });
            })}
        </InputLayout>
    );
}

export function InputRadioOption({ name, value, label = null, icon = null, ...props }) {
    return (
        <>
            <Field
                type="radio"
                name={name}
                value={value}
                id={`${name}-${value}`}
                className=" hidden [&:checked+label]:bg-black/10 [&:checked+label]:opacity-100 "
                {...props}
            />
            <label
                htmlFor={`${name}-${value}`}
                className=" flex-1 flex justify-center items-center gap-2 p-3 text-[--c4-txt] font-custom2 opacity-60 tracking-widest cursor-pointer rounded-md hover:opacity-100 transition-all duration-200 "
            >
                <FontAwesomeIcon icon={icon || faQuestion} className={cls(" text-xs ", { hidden: !icon })} />
                <span>{label}</span>
            </label>
        </>
    );
}

export function InputSelect({ name, label = null, placeholder = "", error, children, className = "", classError }) {
    return (
        <InputLayout name={name} label={label} error={error} className={className} classError={classError} classContainerInput=" p-0 pr-3 ">
            <Field as="select" name={name} className=" w-full bg-transparent p-3 ">
                <InputSelectOption value="" label={placeholder || "Seleccione una opción"} />
                {React.Children.map(children, (child) => {
                    return React.cloneElement(child, { name });
                })}
            </Field>
        </InputLayout>
    );
}

export function InputSelectOption({ value, label = null, ...props }) {
    return (
        <option className=" bg-[--c2] p-3 " value={value} {...props}>
            {label}
        </option>
    );
}
