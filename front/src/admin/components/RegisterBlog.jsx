// React modules
import React, { useEffect, useRef, useState } from 'react';

// Hooks
import useBlogs from '../hooks/useBlogs';
import useTags from '../hooks/useTags'
import useCategorys from '../hooks/useCategorys';
import useHandle from '../hooks/useHandle';

// Forms Components
import FormMesseges from './forms/FormMesseges';
import Input from './forms/Input';
import Checkbox from './forms/Checkbox';
import Textarea from './forms/Textarea';
import ImageInput from './forms/ImageInput';

const RegisterBlog = () => {
    const { handleSubmit, handleBlogPreview } = useHandle();
    const { registerBlog } = useBlogs();
    const { getAllTags } = useTags();
    const { getAllCategorys } = useCategorys();

    const [allTags, setAllTags] = useState({});
    const [tags, setTags] = useState({});
    const [allCategorys, setAllCategorys] = useState({});
    const [categorys, setCategorys] = useState({});
    const [image, setImage] = useState();

    const formRef = useRef(null);

    // Effects Inicializador
    useEffect(() => {
        const fetchData = async () => {
            setAllTags(await getAllTags());
            setAllCategorys(await getAllCategorys());
        };

        fetchData();
    }, []);

    const handleImageData = (data) => {
        setImage({ ...image, [Object.keys(data)]: Object.values(data)[0] })
    }

    return (
        <>
            <p className="h1 register-title">Registrar</p>
            <FormMesseges />

            <form ref={formRef} onSubmit={(e) => handleSubmit(e, formRef, registerBlog, categorys, tags)} className='register-blog form mb-5'>
                <Input
                    text="Título"
                    type="text"
                    name="title"
                />

                <Input
                    text="Subtítulo"
                    type="name"
                    name="subtitle"
                />

                <div className="form-image mb-5">
                    <ImageInput
                        text='Imagem um'
                        name='image_one'
                        formRef={formRef}
                        onData={handleImageData}
                    />

                    <ImageInput
                        text='Imagem dois'
                        name='image_two'
                        formRef={formRef}
                        onData={handleImageData}
                    />

                    <ImageInput
                        text='Imagem três'
                        name='image_three'
                        formRef={formRef}
                        onData={handleImageData}
                    />
                </div>

                <Textarea
                    formRef={formRef}
                    defaultValue={null}
                    imageData={image}
                />

                <fieldset className='mb-5'>
                    <legend>Destaque</legend>
                    <div className='checkbox'>
                        <label htmlFor='highlight'>Destaque?</label>
                        <input
                            type="checkbox"
                            id='highlight'
                            name='highlight'
                        />
                    </div>
                </fieldset>

                <Checkbox
                    legend='Tags'
                    allObject={allTags}
                    activeObject={tags}
                    setActiveObject={setTags}
                />

                <Checkbox
                    legend='Categorias'
                    allObject={allCategorys}
                    activeObject={categorys}
                    setActiveObject={setCategorys}
                />
                <div className="form-button">
                    <button type="submit">Cadastrar</button>
                    <button type="submit" onClick={(e) => handleBlogPreview(e, formRef)} className='mt-5'>Prévia do Blog</button>
                </div>
            </form>

        </>
    );
};

export default RegisterBlog;