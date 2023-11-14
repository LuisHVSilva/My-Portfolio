// API
import api from '../util/api';

// Sensitive Datas
import { URL } from '../sensitiveData/config';

// Hooks
import useFlashMessages from './useFlashMessages';

const useTags = () => {
    const { setFlashMessage } = useFlashMessages();

    /**
     * Fetches all tags from the API.
     * @return {Promise} A promise that resolves to an array of tags.
     */
    async function getAllTags() {
        try {
            const response = await api.get(URL.TAG);
            const data = response.data.result;

            return data;
        } catch (err) {
            console.error(err);
        };
    };

    /**
     * Fetches tag based on tag id from the API.
     * @return {Promise} A promise that resolves to an array of tag.
     */
    async function getTagById(id) {
        try {
            const response = await api.get(`${URL.TAG}/${id}`);
            const data = response.data.result;

            return data;
        } catch (err) {
            console.error(err);
        };
    };

    /**
     * Register a tag.
     * @param {Object} tag - The tag object to be registered.
     * @return {Promise} A promise that resolves once the tag is successfully registered.
     */
    async function registerTag(tag) {
        try {
            await api.post(`${URL.TAG}`, tag);

            window.location.reload();
        } catch (err) {
            const msgText = err.response.data.error;

            const msgType = 'error';
            setFlashMessage(msgText, msgType);
        };
    };

    /**
     * Edits a tag.
     * @param {Object} tag - The tag object to be edited.
     * @return {Promise} A promise that resolves once the tag is successfully edited.
     */
    async function editTags(tag) {
        try {
            await api.patch(`${URL.TAG}/${tag.id}`, tag);

            window.location.reload();
        } catch (err) {
            const msgText = err.response.data.error;
            const msgType = 'error';
            setFlashMessage(msgText, msgType);
        };
    };

    /**
     * Delete a tag.
     * @param {Object} tag - The tag object to be deleted.
     * @return {Promise} A promise that resolves once the tag is successfully deleted.
     */
    async function deleteTags(id) {
        try {
            await api.delete(`${URL.TAG}/${id}`);

            window.location.reload();
        } catch (err) {
            const msgText = err.response.data.error;
            const msgType = 'error';
            setFlashMessage(msgText, msgType);
        };
    };

    return { getAllTags, getTagById, registerTag, editTags, deleteTags };
};

export default useTags;