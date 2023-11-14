// React Components
import React, { useRef } from 'react';

// Hooks
import useUser from '../hooks/useUser';
import useHandle from '../hooks/useHandle';

// Form Components
import FormMesseges from './forms/FormMesseges';
import Input from './forms/Input';

const RegisterUser = () => {
    const formRef = useRef(null);
    const { handleSubmit } = useHandle();

    const { registerUser } = useUser();

    return (
        <main id="l-main">
            <p className="h1 register-title">Register</p>
            <FormMesseges />
            <form ref={formRef} onSubmit={(e) => handleSubmit(e, formRef, registerUser)} className='form mb-5' autoComplete='off'>
                <Input
                    text="Nome"
                    type="name"
                    name="name"
                    placeholder="Digite seu email"                    
                />

                <Input
                    text="Email"
                    type="email"
                    name="email"
                    placeholder="Digite seu email"                    
                />

                <Input
                    text="Confirmação de email"
                    type="email"
                    name="confirmEmail"
                    placeholder="Confirme seu email"                    
                />

                <Input
                    text="Senha"
                    type="password"
                    name="password"
                    placeholder="Digite sua password"                    
                />

                <Input
                    text="Confirme sua senha"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirme sua senha"                    
                />

                <button type="submit">Cadastrar</button>
            </form>
        </main>
    )
}

export default RegisterUser