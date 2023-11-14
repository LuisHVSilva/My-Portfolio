// React modules
import React, { useEffect, useRef, useState } from 'react';

// Hooks
import { useParams } from 'react-router-dom';
import useHandle from '../hooks/useHandle';
import useUser from '../hooks/useUser';

// Forms Components
import Input from './forms/Input';
import FormMesseges from './forms/FormMesseges';

const EditUser = () => {
    const formRef = useRef(null);
    const { handleSubmit, handleDelete } = useHandle();

    const { getUserById, editUser, deleteUser } = useUser();
    const [user, setUser] = useState(null);

    const params = useParams();

    useEffect(() => {
        const fetchData = async () => {
            await getUserById(params.id)
                .then(user => {
                    user.confirmEmail = user.email
                    setUser(user)
                })
                .catch(error => console.error(error));
        };
        fetchData();
    }, [params.id]);

    if (user === null) {
        // TODO: Criar uma div de carregando bonitinha
        return <div>Carregando...</div>;
    }

    return (
        <main id="l-main">
            <p className="h1 register-title">Atualizar Usuário</p>
            <FormMesseges />
            <form ref={formRef} className='form mb-5' autoComplete="off">
                <Input
                    text="Nome"
                    type="name"
                    name="name"
                    defaultValue={user.name}
                />

                <Input
                    text="Email"
                    type="email"
                    name="email"                    
                    defaultValue={user.email}
                />

                <Input
                    text="Confirmação de email"
                    type="email"
                    name="confirmEmail"                    
                    defaultValue={user.email}
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

                <div className="form-button">
                    <button type="submit" onClick={(e) => handleSubmit(e, formRef, editUser)} className='mt-5'>Editar</button>
                    <button type="submit" onClick={(e) => handleDelete(e, formRef, deleteUser)} className='mt-5'>Excluir</button>
                </div>
            </form>
        </main>
    );
};

export default EditUser;