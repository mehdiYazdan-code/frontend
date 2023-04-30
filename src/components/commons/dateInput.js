import React, {useState} from 'react';
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const DateInput = ({ openCalendar, value, handleValueChange }) => {
    const [state,setState] = useState(new DateObject(value))
    return (
        <input
            onFocus={openCalendar}
            defaultValue={state.convert(persian,persian_fa).format("YYYY/MM/DD")}
            onChange={handleValueChange}
            className="row form-control"
        />
    );
};

export default DateInput;