// React modules
import React from "react";

// Quill modules
import { Quill } from "react-quill";
import 'react-quill/dist/quill.snow.css';

const CustomImageOne = ({ onClick }) => (
    <button className="ql-imageOne" onClick={onClick}>
        Imagem Um
    </button>
);

const CustomImageTwo = ({ onClick }) => (
    <button className="ql-imageTwo" onClick={onClick}>
        Imagem Dois
    </button>
)

const CustomImageThree = ({ onClick }) => (
    <button className="ql-imageThree" onClick={onClick}>
        Imagem Três
    </button>
)

const Size = Quill.import("formats/size");
Size.whitelist = ["small", "medium", "large"];
Quill.register(Size, true);

const Font = Quill.import("formats/font");
Font.whitelist = [
    "arial",
];
Quill.register(Font, true);

export const modules = {
    toolbar: {
        container: "#toolbar",
    },
    history: {
        delay: 500,
        maxStack: 100,
        userOnly: true
    }
};


export const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "align",
    "strike",
    "script",
    "blockquote",
    "background",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "code-block"
];

const QuillToolbar = ({ imageData, quill }) => {
    const handleImageOneClick = (image, quill, alt, className) => {
        if (image && quill) {
            // const message = `<img alt="${alt}" class="${className}" src="${image}"/>`;
            const message = `<img class="${className}" />`;
            quill.clipboard.dangerouslyPasteHTML(quill.getLength(), message);
        }
    };

    return (
        <>
            <div id="toolbar" >
                <span className="ql-formats">
                    <select className="ql-font" defaultValue="arial">
                        <option value="arial">Arial</option>                                                
                    </select>
                    <select className="ql-size" defaultValue="medium">
                        <option value="small">Small</option>
                        <option value="medium">Paragraph</option>
                        <option value="large">H3</option>
                    </select>
                </span>
                <span className="ql-formats">
                    <button className="ql-bold" />
                    <button className="ql-italic" />
                    <button className="ql-underline" />
                    <button className="ql-strike" />
                </span>
                <span className="ql-formats">
                    <button className="ql-list" value="ordered" />
                    <button className="ql-list" value="bullet" />
                    <button className="ql-indent" value="-1" />
                    <button className="ql-indent" value="+1" />
                </span>
                <span className="ql-formats">
                    <button className="ql-script" value="super" />
                    <button className="ql-script" value="sub" />
                    <button className="ql-blockquote" />
                    <button className="ql-direction" />
                </span>
                <span className="ql-formats">
                    <select className="ql-align" />
                    <select className="ql-color" />
                    <select className="ql-background" />
                </span>
                <span className="ql-formats">
                    <button className="ql-link" />
                </span>
                <span className="ql-formats">
                    <button className="ql-formula" />
                    <button className="ql-code-block" />
                </span>
                {imageData &&
                    <span className="ql-formats imageButton">
                        {imageData.image_one &&
                            <CustomImageOne onClick={() => handleImageOneClick(imageData.image_one, quill, 'Image one', "image_one")} />
                        }
                        {imageData.image_two &&
                            <CustomImageTwo onClick={() => handleImageOneClick(imageData.image_two, quill, 'Image dois', "image_two")} />
                        }
                        {imageData.image_three &&
                            <CustomImageThree onClick={() => handleImageOneClick(imageData.image_three, quill, 'Image três', "image_three")} />
                        }
                    </span>
                }
            </div >
        </>
    )
};

export default QuillToolbar;