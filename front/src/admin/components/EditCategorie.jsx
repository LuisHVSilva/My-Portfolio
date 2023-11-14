// React modules
import React, { useEffect, useRef, useState } from 'react';

// Hooks
import useHandle from '../hooks/useHandle';
import useCategories from '../hooks/useCategories'

// Forms Components
import Input from './forms/Input';
import Select from './forms/Select';
import FormMesseges from './forms/FormMesseges';

const EditCategorie = () => {
    const formRef = useRef(null);
    const { handleSubmit, handleDelete } = useHandle();
    const { getAllCategories, getCategorieById, editCategories, deleteCategories } = useCategories();

    const [allCategories, setAllCategories] = useState({});    
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const categories = await getAllCategories();
                setAllCategories(categories);
                       
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <main id="l-main">            
            <p className="h1 register-title">Atualizar Categorias</p>
            <FormMesseges />
            <form ref={formRef} className='form mb-5' autoComplete="off">
                <Select
                    obj={allCategories}
                    label="Categorias"
                    handleOnChange={async (e) => { await getCategorieById(e.target.value) }}
                />

                <Input
                    text="Novo nome"
                    type="name"
                    name="name"
                    placeholder="Qual o nome novo da tag?"                    
                />

                <div className="form-button">
                    <button type="submit" onClick={(e) => handleSubmit(e, formRef, editCategories)} className='mt-5'>Editar</button>
                    <button type="submit" onClick={(e) => handleDelete(e, formRef, deleteCategories)} className='mt-5'>Excluir</button>
                </div>
            </form>
        </main>
    );
};

export default EditCategorie;