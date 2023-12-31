// React modules
import React, { useEffect, useRef, useState } from 'react';

// Hooks
import useHandle from '../hooks/useHandle';
import useUpdateFormData from '../hooks/useUpdateFormData'
import useBlogs from '../hooks/useBlogs';
import useTags from '../hooks/useTags'
import useCategorys from '../hooks/useCategorys';
import useBlogTags from '../hooks/useBlogTags';
import useBlogCategorys from '../hooks/useBlogCategorys';

// Forms Components
import FormMesseges from './forms/FormMesseges';
import Select from './forms/Select';
import Input from './forms/Input';
import Textarea from './forms/Textarea';
import ImageInput from './forms/ImageInput';
import Checkbox from './forms/Checkbox';

const EditBlog = () => {
    // Helper Hooks
    const formRef = useRef(null);
    const { handleSubmit, handleDelete } = useHandle();
    const { updateActiveTags, updateActiveCategorys } = useUpdateFormData();

    // Blog hooks and useStates
    const { getAllBlogs, getBlogById, editBlog, deleteBlog } = useBlogs();
    const [allBlogs, setAllBlogs] = useState({});
    const [newBlog, setNewBlog] = useState({});
    const [highlight, setHighlight] = useState(false);
    const [image, setImage] = useState({});

    // Tags Hooks and useStates
    const { getAllTags } = useTags();
    const [allTags, setAllTags] = useState({});
    const [activeTags, setActiveTags] = useState({});

    // Categorys Hooks and useStates
    const { getAllCategorys } = useCategorys();
    const [allCategorys, setAllCategorys] = useState({});
    const [activeCategorys, setActiveCategorys] = useState({})

    // Blogtags Hooks 
    const { getBlogTagByBlogId } = useBlogTags();

    // BlogCategorys Hooks
    const { getBlogCategoryByBlogId } = useBlogCategorys();

    useEffect(() => {
        const fetchData = async () => {
            setAllTags(await getAllTags());
            setAllCategorys(await getAllCategorys());

            const blogs = await getAllBlogs();
            setAllBlogs(blogs);

            await fetchDataAndSetState(blogs[0].id)
        };

        fetchData();
    }, []);


    const fetchDataAndSetState = async (blogId) => {
        const newBlog = await getBlogById(blogId);
        setNewBlog(newBlog);

        setHighlight(newBlog.highlight);
        const image = {
            image_one: newBlog.image_one ? newBlog.image_one : null,
            image_two: newBlog.image_two ? newBlog.image_two : null,
            image_three: newBlog.image_three ? newBlog.image_three : null,
        }
        setImage(image);

        const tags = await getBlogTagByBlogId(blogId);

        const activeTags = await updateActiveTags(tags);
        setActiveTags(activeTags);

        const categorys = await getBlogCategoryByBlogId(blogId)

        const activeBlogs = await updateActiveCategorys(categorys);
        setActiveCategorys(activeBlogs);
    };

    /**
     * Invert the highlight blog checkbox.
     */
    const changeHighlightChecked = () => {
        setHighlight(!highlight);
    }

    return (
        <main id="l-main">
            <p className="h1 register-title">Atualizar Blog</p>
            <FormMesseges />
            <form ref={formRef} className='register-blog  form mb-5' autoComplete="off">
                <Select
                    obj={allBlogs}
                    label="Blog"
                    handleOnChange={async (e) => { await fetchDataAndSetState(e.target.value) }}
                />
                <Input
                    text="Título"
                    type="text"
                    name="title"
                    placeholder={newBlog.title}
                />

                <Input
                    text="Subtítulo"
                    type="name"
                    name="subtitle"
                    placeholder={newBlog.subtitle}
                />

                <div className="form-image mb-5">
                    <ImageInput
                        text='Imagem um'
                        name='image_one'
                        formRef={formRef}
                        initialValue={newBlog.image_one ? newBlog.image_one : null}
                    />

                    <ImageInput
                        text='Imagem dois'
                        name='image_two'
                        formRef={formRef}
                        initialValue={newBlog.image_two ? newBlog.image_two : null}
                    />

                    <ImageInput
                        text='Imagem três'
                        name='image_three'
                        formRef={formRef}
                        initialValue={newBlog.image_three ? newBlog.image_three : null}
                    />
                </div>

                <Textarea
                    formRef={formRef}
                    defaultValue={newBlog.text}
                    key={newBlog.id}
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
                            checked={highlight}
                            onClick={changeHighlightChecked}
                        />
                    </div>
                </fieldset>

                <Checkbox
                    legend='Tags'
                    allObject={allTags}
                    activeObject={activeTags}
                    setActiveObject={setActiveTags}
                />

                <Checkbox
                    legend='Categorias'
                    allObject={allCategorys}
                    activeObject={activeCategorys}
                    setActiveObject={setActiveCategorys}
                />

                <div className="form-button">
                    <button type="submit" onClick={(e) => handleSubmit(e, formRef, editBlog, activeCategorys, activeTags)} className='mt-5'>Editar</button>
                    <button type="submit" onClick={(e) => handleDelete(e, formRef, deleteBlog)} className='mt-5'>Excluir</button>
                </div>
            </form>
        </main >
    );
};

export default EditBlog;