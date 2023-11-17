// API
import api from '../util/api';

// Sensitive Datas
import { URL } from '../sensitiveData/config';

// Hooks
import useFlashMessages from './useFlashMessages';

const useCategorys = () => {
    const { setFlashMessage } = useFlashMessages()

    /**
     * Fetches all categorys from the API.
     * @return {Promise} A promise that resolves to an array of categorys.
     */
    async function getAllCategorys() {
        try {
            const response = await api.get(URL.CATEGORY);
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
    async function getCategoryById(id) {
        try {
            const response = await api.get(`${URL.CATEGORY}/${id}`);
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
    async function registerCategorys(category) {
        try {
            await api.post(`${URL.CATEGORY}`, category);

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
    async function editCategorys(category) {
        try {
            const id = category.id;
            await api.patch(`${URL.CATEGORY}/${id}`, category)

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
    async function deleteCategorys(id) {
        try {
            await api.delete(`${URL.CATEGORY}/${id}`);

            window.location.reload();
        } catch (err) {
            const msgText = err.response.data.error;
            const msgType = 'error';
            setFlashMessage(msgText, msgType);
        };
    };

    return { getAllCategorys, getCategoryById, registerCategorys, editCategorys, deleteCategorys };
};

export default useCategorys;