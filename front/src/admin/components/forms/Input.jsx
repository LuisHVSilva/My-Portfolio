// React modules
import React from 'react';

const Input = ({ text, type, name, placeholder, value, defaultValue, handleOnChange, maxLength, minLength}) => {
    return (
        <>
            <label htmlFor={name} className='mb-2'>{text}</label>
            <input
                className='mb-5'
                type={type}
                name={name}
                id={name}
                placeholder={placeholder}                
                value={value}
                defaultValue={defaultValue}
                onChange={handleOnChange}
                maxLength={maxLength}
                minLength={minLength}
            />
        </>
    );
};

export default Input;