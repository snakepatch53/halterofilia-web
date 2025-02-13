import { ErrorMessage, Field, Formik } from "formik";
import { cls } from "../../common/utils";
import React, { useEffect, useState } from "react";
import { object } from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faQuestion } from "@fortawesome/free-solid-svg-icons";

export function Form({ className = "", show = true, onSubmit = () => {}, values = null, children }) {
    const [initialValues, setInitialValues] = useState(null);
    const [validationSchema, setValidationSchema] = useState(null);
    const [files, setFiles] = useState({});

    useEffect(() => {
        let newInitialValues = {};
        const newValidationSchema = {};

        // Función recursiva para inspeccionar los children y sus hijos
        const extractInitialValues = (child) => {
            if (child?.props?.name) {
                const { name } = child.props;
                let value = child?.props?.value || "";
                // Si hay valores, los asignamos a los campos
                if (values) {
                    // value = values[name] || value; // Si el campo está en values, lo asignamos
                    // lo anterior ya no funciona por que ahora sabemos que podrian haber datos tipo booleanos
                    // y si el valor es false, no se asigna, por lo que se asigna el valor por defecto
                    value = values[name] !== undefined && values[name] !== null ? values[name] : value;

                    if (child?.props?.valueInObject) {
                        let tmp = values;
                        child?.props?.valueInObject?.split(".")?.forEach((key) => (tmp = tmp[key]));
                        value = tmp || value;
                    }
                    if (child?.props?.formatter) value = child.props.formatter(value);
                }

                if (child?.props?.show !== false) {
                    if (child.type.name !== "InputFile") newInitialValues[name] = value;
                    else
                        setFiles((prev) => {
                            return { ...prev, [name]: null };
                        });
                    if (child?.props?.validation) {
                        if (child.type.name !== "InputFile") newValidationSchema[name] = child.props.validation;
                    }
                }
            }
            if (child?.props?.children) React.Children.forEach(child.props.children, extractInitialValues);
        };

        React.Children.forEach(children, extractInitialValues);
        setValidationSchema(object().shape(newValidationSchema));

        setInitialValues(newInitialValues);
    }, [children, values]);

    if (!show) return null;
    if (!initialValues || !validationSchema) return null;
    // console.log(initialValues);

    // Función recursiva para pasar errors y touched solo a los Inputs
    const cloneChildrenWithProps = (children, errors, touched, values, isSubmitting) => {
        return React.Children.map(children, (child) => {
            // Si el child tiene un name, es un Input, le pasamos errors y touched
            if (child?.props?.name) {
                const { name, show } = child.props;

                const isError = !errors[name] ? false : errors[name];
                const isTouched = !touched[name] ? false : touched[name];

                if (show !== false) {
                    const newProps = { error: !!isError && !!isTouched, value: values[name] };
                    if (child.type.name === "InputFile") {
                        newProps.onChange = (event) => {
                            const file = event.target.files[0];
                            setFiles((prev) => {
                                return { ...prev, [name]: file };
                            });
                        };
                        newProps.value = files[name];
                    }
                    if (child?.props?.isSubmitting) {
                        newProps.isSubmitting = isSubmitting;
                    }
                    return React.cloneElement(child, newProps);
                } else return null;
            } else if (child?.props?.isSubmitting) {
                return React.cloneElement(child, { isSubmitting });
            }

            // Si no es un Input, pero tiene children, recorrerlo recursivamente
            if (child?.props?.children) {
                return React.cloneElement(child, {
                    children: cloneChildrenWithProps(child.props.children, errors, touched, values, isSubmitting),
                });
            }

            return child;
        });
    };

    return (
        <Formik
            initialValues={initialValues}
            enableReinitialize={true}
            validationSchema={validationSchema}
            onSubmit={(values, ...args) => onSubmit({ ...values, ...files }, ...args)}
        >
            {({ handleSubmit, errors, touched, values, isSubmitting }) => (
                <form onSubmit={handleSubmit} className={cls(" grid gap-4 bg-black/10 p-8 rounded-xl ", className)}>
                    {cloneChildrenWithProps(children, errors, touched, values, isSubmitting)}
                </form>
            )}
        </Formik>
    );
}

function InputLayout({ name, label = null, error, className = "", classError = "", classContainerInput = "", errorMessage = null, children }) {
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
                <ErrorMessage
                    name={name}
                    component="div"
                    className={cls(" pl-2 font-custom2 text-red-500 tracking-wide leading-3 ", classError, {
                        hidden: errorMessage,
                    })}
                />
                <div
                    className={cls(" pl-2 font-custom2 text-red-500 tracking-wide leading-3 ", classError, {
                        hidden: !errorMessage,
                    })}
                >
                    {errorMessage}
                </div>
            </div>
        </div>
    );
}

export function Input({ name, label = null, error, icon = null, className = "", classInput = "", classError, type, valueInObject, ...props }) {
    delete props?.value;
    valueInObject; // Para evitar que se pasen a los props del input

    const [showPass, setShowPass] = useState(false);
    const showPassword = () => setShowPass(!showPass);
    const _type = showPass ? "text" : type;

    return (
        <InputLayout name={name} label={label} error={error} className={cls(" group ", className)} classError={classError}>
            {icon && <FontAwesomeIcon icon={icon || faQuestion} className=" text-sm " />}
            <Field className={cls(" px-3 w-full bg-transparent ", classInput)} type={_type} name={name} {...props} />
            {type === "password" && (
                <button className=" opacity-0 group-hover:opacity-100 transition-all " type="button" onClick={showPassword}>
                    <FontAwesomeIcon icon={showPass ? faEye : faEyeSlash} />
                </button>
            )}
        </InputLayout>
    );
}

export function InputFile({
    value,
    name,
    label = null,
    placeholder = "",
    icon = null,
    className = "",
    classInput = "",
    classError,
    validation,
    onChange,
    accept = "*",
}) {
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState(null);
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    if (value) reader.readAsDataURL(value);
    useEffect(() => {
        validation
            .validate(value)
            .then(() => setError(null))
            .catch((err) => setError(value !== null ? err.message : null));
    }, [validation, value]);

    const isPreview = value && value?.type?.includes("image");
    return (
        <InputLayout
            name={name}
            label={label}
            error={error}
            errorMessage={error}
            className={cls(" group ", className)}
            classError={classError}
            classContainerInput=" p-0 px-3 "
        >
            <FontAwesomeIcon icon={icon || faQuestion} className={cls(" text-sm ", { hidden: !icon || isPreview })} />
            <div className={cls(" h-8 aspect-square bg-black/10 rounded-md overflow-hidden ", { hidden: !isPreview })}>
                <img className=" w-full h-full object-contain " src={preview} alt="Preview Image" />
            </div>
            <label
                className={cls(" p-3 w-full bg-transparent opacity-80 whitespace-nowrap text-ellipsis overflow-hidden cursor-pointer ", classInput)}
                htmlFor={`file-${name}`}
            >
                {placeholder || "Seleccionar archivo"}
            </label>
            <input className={cls(" hidden ", classInput)} id={`file-${name}`} name={name} type="file" onChange={onChange} accept={accept} />
        </InputLayout>
    );
}

export function InputTextArea({ name, label = null, error, icon = null, className = "", classInput = "", classError, valueInObject, ...props }) {
    delete props?.value;
    valueInObject; // Para evitar que se pasen a los props del input

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

export function InputRadio({ name, label = null, error, children, className = "", classError, formatter }) {
    formatter;

    return (
        <InputLayout name={name} label={label} error={error} className={className} classError={classError} classContainerInput=" p-0 ">
            {React.Children.map(children, (child) => {
                return React.cloneElement(child, { name });
            })}
        </InputLayout>
    );
}

export function InputRadioOption({ name, value, label = null, icon = null, valueInObject, ...props }) {
    valueInObject; // Para evitar que se pasen a los props del input

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

export function InputSelect({ datalist = null, name, label = null, placeholder = "", error, children, className = "", classError }) {
    const list =
        datalist?.list && Array.isArray(datalist?.list) && datalist?.key && datalist?.value && datalist?.label
            ? datalist?.list.map((item) => ({ key: item[datalist.key], value: item[datalist.value], label: item[datalist.label] }))
            : datalist?.list;

    return (
        <InputLayout name={name} label={label} error={error} className={className} classError={classError} classContainerInput=" p-0 pr-3 ">
            <Field as="select" name={name} className=" w-full bg-transparent p-3 ">
                <InputSelectOption value="" label={placeholder || "Seleccione una opción"} />
                {list && list.map((item) => <InputSelectOption key={item.key} value={item.value} label={item.label} />)}
                {children}
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
