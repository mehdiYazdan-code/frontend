import React from 'react';

const Input = ({ label, register, required,name }) => {
    return (
        <div className="row">
            <label className="form-label">{label}</label>
            <input
                className="form-control"
                name={name}
                {...register(label, { required })}
            />
        </div>
    );
};

export default Input;