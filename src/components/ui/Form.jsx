import { ErrorMessage, Field, Formik } from "formik";
import { cls } from "../../common/utils";
import React, { useEffect, useState } from "react";
import { object } from "yup";

export function Form({ className = "", children, onSubmit = () => {} }) {
    const [initialValues, setInitialValues] = useState(null);
    const [validationSchema, setValidationSchema] = useState(null);

    useEffect(() => {
        const newInitialValues = {};
        const newValidationSchema = {};

        // Función recursiva para inspeccionar los children y sus hijos
        const extractInitialValues = (child) => {
            if (child?.props?.name) {
                const value = child?.props?.value || "";
                newInitialValues[child.props.name] = value; // Asigna el valor inicial
                if (child?.props?.validation) newValidationSchema[child.props.name] = child.props.validation; // Asigna la validación de Yup
            }
            if (child?.props?.children) React.Children.forEach(child.props.children, extractInitialValues); // Si el child tiene children, llamamos recursivamente a esta función
        };

        React.Children.forEach(children, extractInitialValues);
        setInitialValues(newInitialValues);
        setValidationSchema(object().shape(newValidationSchema));
    }, [children]);

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

export function Input({ name, label = null, error, className = "", classInput = "", classError, ...props }) {
    delete props?.value;

    return (
        <div className={cls(" flex flex-col gap-2 ", className)}>
            <label htmlFor={name} className=" pl-2 text-[--c4-txt] font-custom2 tracking-widest ">
                {label}
            </label>
            <div className={cls(" py-3 bg-black/10 rounded-md border border-transparent", { " border border-red-500 ": error })}>
                <Field className={cls(" px-3 w-full bg-transparent ", classInput)} name={name} {...props} />
            </div>
            <div className=" h-2 ">
                <ErrorMessage name={name} component="div" className={cls(" pl-2 font-custom2 text-red-500 tracking-wide leading-3 ", classError)} />
            </div>
        </div>
    );
}
