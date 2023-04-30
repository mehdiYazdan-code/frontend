import React from 'react';

const Select = React.forwardRef(({onChange, name, label, options}, ref) => (
    <div className="row">
        <label className="form-label">{label}</label>
        <select className="form-select" name={name} ref={ref} onChange={onChange}>
            {options.map(option => <option value={option.id}>{option.title}</option>)}
        </select>
    </div>
));

export default Select;