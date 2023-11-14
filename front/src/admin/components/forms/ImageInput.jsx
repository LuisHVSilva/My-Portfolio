// React Modules
import React, { useEffect } from 'react';

// Hooks
import useHandle from '../../hooks/useHandle';

// Form Modules
import Input from './Input';

const ImageInput = ({ text, name, formRef, initialValue, onData }) => {
    const { previewUrls, imageName, setPreviewUrls, setImageName, handleFileChange, handleDeleteFile } = useHandle();

    useEffect(() => {
        if (initialValue) {
            setImageName({ ...imageName, [name]: initialValue });
            setPreviewUrls({ ...previewUrls, [name]: initialValue });
        }

    }, [initialValue]);


    useEffect(() => {
        if (Object.keys(previewUrls).length !== 0 && onData) {
            onData(previewUrls)
        }
    }, [previewUrls])


    /**
     * Get image name based on URL.
     * @param {string} url - Image URL.
     * @returns {string} - Image URL or the image path.
     */
    const getImageName = (url) => {
        const nomeDaImagemComExtensao = url.match(/-----([^\.]+\.(png|jpg|jpeg|gif))\?/);
        const nomeDaImagem = nomeDaImagemComExtensao ? nomeDaImagemComExtensao[1] : url;

        return nomeDaImagem;
    };

    return (
        <div className="image-selection">
            <Input
                text={imageName[name] ? getImageName(imageName[name]) : text}
                type="file"
                name={name}
                handleOnChange={(e) => handleFileChange(e)}
                defaultValue={initialValue}
            />

            {
                initialValue &&
                <>
                    <input
                        type="checkbox"
                        name={`newURL_${name}`}
                        checked={imageName[name] ? true : false}
                        defaultValue={imageName[name] ? imageName[name] : null}
                        style={{ display: 'none' }}
                    />
                </>
            }

            {previewUrls[name] &&
                <>
                    <small className='mb-2'>{name}</small>
                    <img
                        name={name}
                        src={previewUrls[name]}
                        alt={imageName[name] ? imageName[name] : previewUrls[name]}
                        style={{ maxWidth: '300px' }}
                        className='mb-2'
                    />
                    <button onClick={(e) => handleDeleteFile(e, formRef, name)}>Apagar</button>
                </>
            }

        </div >
    );
};

export default ImageInput;


