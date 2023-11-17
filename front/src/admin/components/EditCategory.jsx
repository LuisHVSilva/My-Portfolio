// React modules
import React, { useEffect, useRef, useState } from 'react';

// Hooks
import useHandle from '../hooks/useHandle';
import useCategorys from '../hooks/useCategorys'

// Forms Components
import Input from './forms/Input';
import Select from './forms/Select';
import FormMesseges from './forms/FormMesseges';

const EditCategory = () => {
    const formRef = useRef(null);
    const { handleSubmit, handleDelete } = useHandle();
    const { getAllCategorys, getCategoryById, editCategorys, deleteCategorys } = useCategorys();

    const [allCategorys, setAllCategorys] = useState({});    
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const categorys = await getAllCategorys();
                setAllCategorys(categorys);
                       
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
                    obj={allCategorys}
                    label="Categorias"
                    handleOnChange={async (e) => { await getCategoryById(e.target.value) }}
                />

                <Input
                    text="Novo nome"
                    type="name"
                    name="name"
                    placeholder="Qual o nome novo da tag?"                    
                />

                <div className="form-button">
                    <button type="submit" onClick={(e) => handleSubmit(e, formRef, editCategorys)} className='mt-5'>Editar</button>
                    <button type="submit" onClick={(e) => handleDelete(e, formRef, deleteCategorys)} className='mt-5'>Excluir</button>
                </div>
            </form>
        </main>
    );
};

export default EditCategory;