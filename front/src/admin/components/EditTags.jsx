// React modules
import React, { useEffect, useRef, useState } from 'react';

// Hooks
import useHandle from '../hooks/useHandle';
import useTags from '../hooks/useTags'

// Forms Components
import Input from './forms/Input';
import Select from './forms/Select';
import FormMesseges from './forms/FormMesseges';

const EditTags = () => {
  const formRef = useRef(null);
  const { handleSubmit, handleDelete } = useHandle();
  const { getAllTags, getTagById, editTags, deleteTags } = useTags();

  const [allTags, setAllTags] = useState({});  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tags = await getAllTags();
        setAllTags(tags);

      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);  

  return (
    <main id="l-main">
      <p className="h1 register-title">Atualizar Tags</p>
      <FormMesseges />
      <form ref={formRef} className='form mb-5' autoComplete="off">
        <Select
          obj={allTags}
          label="Tag"
          handleOnChange={async (e) => { await getTagById(e.target.value) }}
        />

        <Input
          text="Novo nome"
          type="name"
          name="name"
          placeholder="Qual o nome novo da tag?"
        />

        <div className="form-button">
          <button type="submit" onClick={(e) => handleSubmit(e, formRef, editTags)} className='mt-5'>Editar</button>
          <button type="submit" onClick={(e) => handleDelete(e, formRef, deleteTags)} className='mt-5'>Excluir</button>
        </div>
      </form>
    </main>
  );
};

export default EditTags;