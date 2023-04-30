import { useField } from 'formik';
import {NumericFormat} from "react-number-format";

const CurrencyInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);

    const handleChange = (values) => {
        const { value } = values;
        field.onChange({
            target: {
                name: field.name,
                value: value,
            },
        });
    };

    return (
        <div>
            <label htmlFor={field.name}>{label}</label>
            <NumericFormat
                {...field}
                {...props}
                value={field.value.toString()}
                thousandSeparator={true}
                onValueChange={handleChange}
                onBlur={field.onBlur}
                style={{
                    padding: '10px',
                    borderRadius: '5px',
                    border: "1px solid #ccc",
                    fontSize: '1rem',
                    width: 'auto',
                    transition: "border-color 0.2s ease-in-out",
                    fontFamily:"IRANSans"
                }}
            />
            {meta.touched && meta.error && (
                <div className="error">{meta.error}</div>
            )}
        </div>
    );
};

export default CurrencyInput;
