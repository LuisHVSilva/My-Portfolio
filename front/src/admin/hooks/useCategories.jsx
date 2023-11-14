// API
import api from '../util/api';

// Sensitive Datas
import { URL } from '../sensitiveData/config';

// Hooks
import useFlashMessages from './useFlashMessages';

const useCategories = () => {
    const { setFlashMessage } = useFlashMessages()

    /**
     * Fetches all categories from the API.
     * @return {Promise} A promise that resolves to an array of categories.
     */
    async function getAllCategories() {
        try {
            const response = await api.get(URL.CATEGORIE);
            const data = response.data.result;

            return data;
        } catch (err) {
            console.error(err);
        };
    };

    /**
     * Fetches category based on category id from the API.
     * @return {Promise} A promise that resolves to an array of category.
     */
    async function getCategorieById(id) {
        try {
            const response = await api.get(`${URL.CATEGORIE}/${id}`);
            const data = response.data.result;

            return data;
        } catch (err) {
            console.error(err);
        };
    };

    /**
     * Register a category.
     * @param {Object} category - The category object to be registered.
     * @return {Promise} A promise that resolves once the category is successfully registered.
     */
    async function registerCategories(category) {
        try {
            await api.post(`${URL.CATEGORIE}`, category);

            window.location.reload();
        } catch (err) {
            const msgText = err.response.data.error;
            const msgType = 'error';
            setFlashMessage(msgText, msgType);
        };
    };

    /**
     * Edits a category.
     * @param {Object} category - The category object to be edited.
     * @return {Promise} A promise that resolves once the category is successfully edited.
     */
    async function editCategories(category) {
        try {
            const id = category.id;
            await api.patch(`${URL.CATEGORIE}/${id}`, category)

            window.location.reload();
        } catch (err) {
            const msgText = err.response.data.error;
            const msgType = 'error';
            setFlashMessage(msgText, msgType);
        };
    };

    /**
     * Delete a category.
     * @param {Object} category - The category object to be deleted.
     * @return {Promise} A promise that resolves once the category is successfully deleted.
     */
    async function deleteCategories(id) {
        try {
            await api.delete(`${URL.CATEGORIE}/${id}`);

            window.location.reload();
        } catch (err) {
            const msgText = err.response.data.error;
            const msgType = 'error';
            setFlashMessage(msgText, msgType);
        };
    };

    return { getAllCategories, getCategorieById, registerCategories, editCategories, deleteCategories };
};

export default useCategories;