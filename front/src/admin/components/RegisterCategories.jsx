// React Modules
import React, { useRef } from 'react';

// Hooks
import useCategories from '../hooks/useCategories';
import useHandle from '../hooks/useHandle';

// Form components
import FormMesseges from './forms/FormMesseges';
import Input from './forms/Input';

const RegisterCategories = () => {
    const formRef = useRef(null);
    const { handleSubmit } = useHandle();
    
    const { registerCategories } = useCategories();    

    return (
        <main id="l-main">
            <p className="h1 register-title">Registrar Categoria</p>
            <FormMesseges />
            <form ref={formRef} onSubmit={(e) => handleSubmit(e, formRef, registerCategories)} className='form mb-5'>
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

export default RegisterCategories;