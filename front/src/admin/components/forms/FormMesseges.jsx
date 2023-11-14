// React modules
import React, { useState, useEffect } from 'react';

// Internal Modules
import bus from '../../util/bus';

const FormMesseges = () => {
    const [visibility, setVisibility] = useState(false);
    const [type, setType] = useState('');
    const [messege, setMessege] = useState('');

    useEffect(() => {
        bus.addListener('flash', ({message, type}) => {
            setVisibility(true);
            setMessege(message);
            setType(type);

            setTimeout(() => {
                setVisibility(false);
            }, 3000);
        });
    }, []);


    return (
        visibility && (
            <div className={`form-messeges ${type} mb-5`}>
                <p>{messege}</p>
            </div>
        )
    );
};

export default FormMesseges;