export default function TitleEntity({ title = "", label = "" }) {
    return (
        <h3 className=" text-center mt-2 mb-6 text-lg font-semibold opacity-60 uppercase ">
            <b>{title}: </b> {label}
        </h3>
    );
}
