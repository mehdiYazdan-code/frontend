import React, { useState } from "react";

const ThousandSeparatorInput = ({ value, onChange,name }) => {
    const formatValue = (val) => {
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    const [displayValue, setDisplayValue] = useState(formatValue(value));
    const handleChange = (e) => {
        const inputVal = e.target.value;
        const parsedVal = parseValue(inputVal);
        setDisplayValue(formatValue(parsedVal));
        onChange(e,parsedVal);
    };
    const parseValue = (val) => {
        const num = val.replace(/,/g, "");
        return isNaN(num) ? "" : parseInt(num);
    };

    return <input name={name} type="text" value={displayValue} onChange={handleChange} />;
};
export default ThousandSeparatorInput;
