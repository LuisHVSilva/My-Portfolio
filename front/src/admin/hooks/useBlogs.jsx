// API
import api from '../util/api';

// Google FireBase
import { storage } from '../firebase';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

// Sensitive Datas
import {URL} from '../sensitiveData/config';

// Hooks
import useFlashMessages from './useFlashMessages';
import useBlogCategories from './useBlogCategories';
import useBlogTags from './useBlogTags';

function validateFields(blog) {
    if (!blog.title || !blog.subtitle || !blog.text) {
        const msgText = 'Campo titulo, subtitulo ou texto vazio';
        return msgText;
    };
}

function getImageCheckboxesURL(blog) {
    const formImageURL = {};

    for (const key in blog) {
        if (key.startsWith("newURL_image_")) {
            const name = key.replace(/^newURL_/, '');
            formImageURL[name] = blog[key];
            delete blog[key];
        }
    }

    return formImageURL;
}

const useBlogs = () => {
    const { registerBlogCategorie, deleteBlogCategorie } = useBlogCategories();
    const { registerBlogTag, deleteBlogTag } = useBlogTags();

    const { setFlashMessage } = useFlashMessages();    

    /**
     * Fetches all blogs from the API.
     * @return {Promise} A promise that resolves to an array of blogs.
     */
    async function getAllBlogs() {
        try {
            const response = await api.get(URL.BLOG);
            const data = response.data.result;

            return data;
        } catch (err) {
            console.error(err);
        };
    };

    /**
     * Fetches blog based on blog id from the API.
     * @return {Promise} A promise that resolves to an array of blog.
     */
    async function getBlogById(id) {
        try {
            const response = await api.get(`${URL.BLOG}/${id}`);
            const data = response.data.result;

            return data;
        } catch (err) {
            const msgText = err.response.data.error;
            const msgType = 'error';
            setFlashMessage(msgText, msgType);
        };
    };

    /**
     * Registers a new blog with specified categories and tags.
     * @param {Object} blog - The blog object to be registered.
     * @param {Array} categories - An array of category objects associated with the blog.
     * @param {Array} tags - An array of tag objects associated with the blog.
     * @return {Promise} A promise that resolves once the blog is registered.
     */
    async function registerBlog(blog, categories, tags) {
        for (const key in blog) {
            if (key.startsWith('newURL_image_')) {
                delete blog[key];
            }
        }

        try {
            const blogError = validateFields(blog);
            if (blogError) {
                setFlashMessage(blogError, 'error');
                return null;
            };

            const image_one = await registerImage(blog.image_one);
            const image_two = await registerImage(blog.image_two);
            const image_three = await registerImage(blog.image_three);

            blog.image_one = image_one;
            blog.image_two = image_two;
            blog.image_three = image_three;

            const response = await api.post(`${URL.BLOG}`, blog);
            const blogRegistered = response.data.blog;

            await registerBlogCategorie(blogRegistered, categories);
            await registerBlogTag(blogRegistered, tags);

            window.location.reload();
        } catch (err) {
            const msgText = err.response.data.error;
            const msgType = 'error';
            setFlashMessage(msgText, msgType);
        };
    };

    /**
     * Delete a blog.
     * @param {Object} blog - The blog object to be deleted.     
     * @return {Promise} A promise that resolves once the blog is deleted.
     */
    async function deleteBlog(id) {
        try {
            await api.delete(`${URL.BLOG}/${id}`);

            window.location.reload();
        } catch (err) {
            const msgText = err.response.data.error;
            const msgType = 'error';
            setFlashMessage(msgText, msgType);
        };
    };

    /**
     * Edits an existing blog with specified categories and tags.
     * @param {Object} blog - The updated blog object.
     * @param {Array} categories - An array of category objects associated with the blog.
     * @param {Array} tags - An array of tag objects associated with the blog.
     * @return {Promise} A promise that resolves once the blog is successfully edited.
     */
    async function editBlog(blog, categories, tags) {
        try {
            const imageCheckboxesURL = getImageCheckboxesURL(blog);
            const oldBlog = await getBlogById(blog.id);

            blog.image_one = await updateImage(imageCheckboxesURL.image_one, oldBlog.image_one, blog.image_one)
            blog.image_two = await updateImage(imageCheckboxesURL.image_two, oldBlog.image_two, blog.image_two)
            blog.image_three = await updateImage(imageCheckboxesURL.image_three, oldBlog.image_three, blog.image_three)

            blog.highlight = oldBlog.highlight && true

            await api.patch(`${URL.BLOG}/${blog.id}`, blog);

            await registerBlogCategorie(blog, categories)
            await deleteBlogCategorie(blog, categories)

            await registerBlogTag(blog, tags);
            await deleteBlogTag(blog, tags)

            window.location.reload();
        } catch (err) {
            const msgText = err.response.data.error;
            const msgType = 'error';
            setFlashMessage(msgText, msgType);
        }
    }

    /**
     * Updates the image for a blog.
     * @param {string} imageCheckboxesURL - The URL of the new image.
     * @param {string|null} oldBlog - The URL of the old image.
     * @param {File} newImageFile - The new image file to be uploaded.
     * @return {Promise} A promise that resolves to the URL of the updated image.
     */
    async function updateImage(imageCheckboxesURL, oldBlog, newImageFile) {
        try {
            if (imageCheckboxesURL !== oldBlog) {
                let newImage = null;

                if (oldBlog) {
                    await deleteImage(oldBlog)
                }

                if (imageCheckboxesURL) {
                    newImage = await registerImage(newImageFile)
                }

                return newImage;
            }

            return oldBlog;
        } catch (error) {
            console.error(error)
        }
    }

    /**
     * Registers and uploads an image to the storage.
     * @param {File} image - The image file to be registered and uploaded.
     * @return {Promise} A promise that resolves to the URL of the registered image.
     */
    async function registerImage(image) {
        try {
            const image_name = image.name.replace(/\s/g, "");
            const uniqueFileName = `${uuidv4()}-----${image_name}`;
            const imageRef = ref(storage, `blogImages/${uniqueFileName}`);

            await uploadBytes(imageRef, image);
            const imageURL = await getDownloadURL(imageRef);

            return imageURL;
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * Deletes an image from the storage.
     * @param {string} imagePath - The path of the image to be deleted.
     * @return {Promise} A promise that resolves once the image is deleted.
     */
    async function deleteImage(imagePath) {
        const desertRef = ref(storage, imagePath);

        try {
            await deleteObject(desertRef);
        } catch (error) {
            console.error(error);
        }
    }

    return { getAllBlogs, getBlogById, registerBlog, editBlog, deleteBlog };
};

export default useBlogs;