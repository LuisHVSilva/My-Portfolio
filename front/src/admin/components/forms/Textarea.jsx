// React modules
import React, { useRef, useEffect } from 'react';

// Quill modules
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// Components
import EditorToolbar, { modules, formats } from "./Quill/EditorToolbar";

const Textarea = ({ formRef, defaultValue, key, imageData }) => {
    const quillRef = useRef();    

    useEffect(() => {
        formRef.current.getEditor = () => {
            return quillRef.current.getEditor();
        };

    }, [formRef]);    

    if (defaultValue === undefined) {
        return <div>Carregando...</div>
    }

    return (
        <>
            <div className="textarea">
                <EditorToolbar
                    imageData={imageData}
                    quill={quillRef.current && quillRef.current.getEditor()}
                />
                <ReactQuill
                    key={key}
                    theme="snow"
                    modules={modules}
                    formats={formats}
                    className='mb-5'
                    ref={quillRef}
                    defaultValue={defaultValue}                    
                />
            </div>
        </>
    );
};

export default Textarea;
