import DatePicker from "react-multi-date-picker";
import persian_fa from "react-date-object/locales/persian_fa";
import persian from "react-date-object/calendars/persian";
import {useField} from "formik";
import moment from "jalali-moment";

function toShamsi(date) {
    return moment(date).locale("fa").format("YYYY/MM/DD");
}

const PersianDatePickerInput = ({ label, ...props }) => {
    const [field, meta, helpers] = useField(props);

    const handleChange = (dateObject) => {
        console.log("handleChange: ",dateObject.toDate())
        helpers.setValue(dateObject.toDate());
    };

    return (
        <div>
            <label htmlFor={field.name}>{label}</label>
            <DatePicker
                {...field}
                {...props}
                value={toShamsi(field.value)}
                format="YYYY/MM/DD"
                onChange={handleChange}
                locale={persian_fa}
                calendar={persian}
                style={{
                    padding: '10px',
                    borderRadius: '5px',
                    border: "1px solid #ccc",
                    fontSize: '1rem',
                    width: '100%',
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
export default PersianDatePickerInput;