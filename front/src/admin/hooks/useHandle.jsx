// React modules
import { useState } from 'react';

const useHandle = () => {
    const [previewUrls, setPreviewUrls] = useState({})
    const [imageName, setImageName] = useState({})

    /**
     * Handles the change of a file input element.
     * @param {Event} e - The event object.
     */
    const handleFileChange = (e) => {
        e.preventDefault();

        const file = e.target.files[0];
        const name = e.target.name;

        setImageName({ ...imageName, [name]: file.name });

        const reader = new FileReader();
        reader.onload = () => {
            setPreviewUrls({ ...previewUrls, [name]: reader.result });
        };

        reader.readAsDataURL(file);
    };

    /**
     * Handles the deletion of a file from a form.
     * @param {Event} e - The event object.
     * @param {React.RefObject} formRef - Reference to the form element.
     * @param {string} name - The name of the file input field.
     */
    const handleDeleteFile = (e, formRef, name) => {
        e.preventDefault();

        formRef.current[name].value = null;

        const updatedImageName = { ...imageName };
        delete updatedImageName[name];

        setImageName(updatedImageName);
        setPreviewUrls({ ...previewUrls, [name]: null });
    };


    function handleBlogPreview(e, formRef) {
        e.preventDefault();
        const formData = new FormData(formRef.current);

        if (typeof formRef.current.getEditor === 'function') {
            const content = formRef.current.getEditor().root.innerHTML;
            formData.append('text', content);
        }

        const formValues = {};

        formData.forEach((value, key) => {
            formValues[key] = value;

            if (!value) { delete formValues[key] }
            if (value === 'on' && key !== 'highlight') { delete formValues[key] }
            // if (value.type === 'application/octet-stream') { delete formValues[key] }
            // if (value.key === 'image_one') { delete formValues[key] }
            // if (value.key === 'image_two') { delete formValues[key] }
            // if (value.key === 'image_three') { delete formValues[key] }
        });

        const queryString = Object.entries(formValues)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');

        window.open(`preview?${queryString}`, '_blank');
    }

    /**
     * Handles the click event on an element, and updates the active state.
     * @param {Event} e - The event object.
     * @param {Object} active - The current active state.
     * @param {Function} setActive - A function to update the active state.
     */
    function handleOnClick(e, active, setActive) {
        const id = e.target.id;
        const name = e.target.name;
        const checked = e.target.checked;

        if (checked) {
            const item = {
                id: id,
                name: name
            };
            setActive((prev) => ({ ...prev, [id]: item }));
        } else {
            const { [id]: _, ...rest } = active;
            setActive(rest);
        };
    };

    /**
     * Handles the form submission event.
     * @param {Event} e - The event object.
     * @param {React.RefObject} formRef - Reference to the form element.
     * @param {Function} registerFunction - The function to register the form data.
     * @param {...any} data - Additional data to pass to the register function.
     */
    const handleSubmit = (e, formRef, registerFunction, ...data) => {
        e.preventDefault();
        const formData = new FormData(formRef.current);

        if (typeof formRef.current.getEditor === 'function') {
            const content = formRef.current.getEditor().root.innerHTML;
            formData.append('text', content);
        }

        const formValues = {};

        formData.forEach((value, key) => {
            formValues[key] = value;

            if (!value) { delete formValues[key] }
            if (value === 'on' && key !== 'highlight') { delete formValues[key] }
            if (value.type === 'application/octet-stream') { delete formValues[key] }
        });
        
        registerFunction(formValues, ...data);
    };

    /**
     * Handles the delete action.
     * @param {Event} e - The event object.
     * @param {React.RefObject} formRef - Reference to the form element.
     * @param {Function} deleteFunction - The function to delete the item.
     */
    function handleDelete(e, formRef, deleteFunction) {
        e.preventDefault();
        const id = formRef.current['id'].value;
        const shouldDelete = window.confirm(`Tem certeza que deseja excluir?`);

        if (shouldDelete) {
            deleteFunction(id);
        };
    };

    return {
        previewUrls, imageName, setPreviewUrls, setImageName,
        handleFileChange, handleDeleteFile, handleBlogPreview,
        handleOnClick, handleSubmit, handleDelete
    };
};

export default useHandle;