import React, {useState} from 'react';

const NumericInput = ({value,onChange}) => {
    const [displayValue,setDisplayValue] = useState(value || "")
    const formattedValue = (value) => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const handleChange = e => {
        setDisplayValue(formattedValue)
        const inputValue = e.target.value.replace(/\D/g, '');
        onChange(parseInt(inputValue));
    };

    return (
        <input type="number" value={displayValue} onChange={handleChange} />
    );
};
export default NumericInput;