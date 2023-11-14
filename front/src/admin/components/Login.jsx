// Módulos externos
import React, { useContext, useRef } from 'react';
import { Link } from 'react-router-dom';

// Contexts
import { AuthContext } from '../context/AuthContext';

// Hooks
import useHandle from '../hooks/useHandle';

// Form Components
import FormMesseges from './forms/FormMesseges';
import Input from './forms/Input';

// Sensitive Datas
import { URL } from '../sensitiveData/config';

const Login = () => {
    const formRef = useRef(null);
    const { login } = useContext(AuthContext);
    const { handleSubmit } = useHandle();

    return (
        <>
            <FormMesseges />
            <form ref={formRef} onSubmit={(e) => handleSubmit(e, formRef, login)} className='form mb-5' autoComplete='off'>
                <Input
                    text="Email"
                    type="email"
                    name="email"
                />

                <Input
                    text="Senha"
                    type="password"
                    name="password"
                />
                <div className="form-button">
                    <button type="submit">Entrar</button>
                    <Link to={URL.USER} className='add-user mt-5'>Adicionar usuário</Link>
                </div>
            </form>
        </>
    );
};

export default Login;