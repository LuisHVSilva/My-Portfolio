// React modules
import React from 'react';

// Hooks
import useHandle from '../../hooks/useHandle';

const Checkbox = ({ legend, allObject, activeObject, setActiveObject }) => {
    // Dar uma olhada em React.memo e PureComponent
    const { handleOnClick } = useHandle();

    /**
     * Function to transform 'active' objects into true.
     * @param {Object} input - All object that has the information.
     * @param {Object} object - Object that has the active information
     * @returns {Object} - All active objects
     */
    const checkboxInput = (input, object) => {
        for (const key in input) {
            input[key]['active'] = false;

            if (input[key].id in object) {
                input[key]['active'] = true;
            };
        };

        return input;
    };

    const checkboxObject = checkboxInput(Object.values(allObject), activeObject)

    return (
        <fieldset className='mb-5'>
            <legend>{legend}</legend>            
            {checkboxObject ? checkboxObject.map((valueObj, index) => (
                <div className='checkbox' key={index}>
                    <label htmlFor={valueObj.id}>{valueObj.name}</label>
                    <input
                        type="checkbox"
                        id={valueObj.id}
                        name={valueObj.name}
                        checked={valueObj.active}
                        onClick={(e) => handleOnClick(e, activeObject, setActiveObject)}
                    />
                </div>
            ))
                :
                <p>Não há registros</p>
            }
        </fieldset>
    )
};

export default Checkbox;