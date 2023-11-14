// Módulos externos
import React, { useContext, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';

// Hooks
import useHandle from '../hooks/useHandle';
import useVerifyUser from '../hooks/useVerifyUser';

// Form Components
import FormMesseges from './forms/FormMesseges';
import Input from './forms/Input';

const ActiveUser = () => {
  const formRef = useRef(null);
  const { handleSubmit } = useHandle();
  const { activeUser } = useVerifyUser();

  const { id, username } = useParams();

  return (
    <>
      <p className='h1'>Olá, {username}, falta pouco para ser autenticado</p>
      <FormMesseges />
      <form ref={formRef} onSubmit={(e) => handleSubmit(e, formRef, activeUser, id)} className='form mb-5' autoComplete='off'>      
        <div className="active-user-input mb-5">
          <Input
            type="text"
            name="token-one"
            maxLength={1}
            minLength={1}
          />
          <Input
            type="text"
            name="token-two"
            maxLength={1}
            minLength={1}
          />
          <Input
            type="text"
            name="token-three"
            maxLength={1}
            minLength={1}
          />
          <Input
            type="text"
            name="token-four"
            maxLength={1}
            minLength={1}
          />
          <Input
            type="text"
            name="token-five"
            maxLength={1}
            minLength={1}
          />
        </div>

        <button type="submit">Ativar usuário</button>
      </form >
    </>
  )
}

export default ActiveUser