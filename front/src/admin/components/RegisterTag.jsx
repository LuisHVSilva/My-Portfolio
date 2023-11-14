// React Modules
import React, { useRef } from 'react';

// Hooks
import useTags from '../hooks/useTags';
import useHandle from '../hooks/useHandle';

// Form Components
import FormMesseges from './forms/FormMesseges';
import Input from './forms/Input';

const RegisterTag = () => {
    const formRef = useRef(null);
    const { handleSubmit } = useHandle();

    const { registerTag } = useTags();
    
    return (
        <main id="l-main">
            <p className="h1 register-title">Registrar Tag</p>
            <FormMesseges />            
            <form ref={formRef} onSubmit={(e) => handleSubmit(e, formRef, registerTag)} className='form mb-5'>
                <Input
                    text="Nome"
                    type="name"
                    name="name"        
                    id="name"            
                />
                <button type="submit">Cadastrar</button>
            </form>
        </main>
    );
};

export default RegisterTag;


