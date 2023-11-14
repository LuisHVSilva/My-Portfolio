// React modules
import React from 'react';

const Select = ({ obj, label, handleOnChange }) => {
    return (
        <div className="form-select mb-10">
            <label
                htmlFor='id'>
                {label}
            </label>

            {Object.keys(obj).length > 0 ?
                <select
                    name='id'
                    id='id'
                    onChange={handleOnChange}>
                    {Object.values(obj).map((valueObj, index) => (
                        <option key={index} value={valueObj.id} >
                            {valueObj.name ? valueObj.name : valueObj.title}
                        </option>
                    ))}
                </select>
                :
                <h3>Sem registro</h3>
            }
        </div>
    );
};

export default Select;