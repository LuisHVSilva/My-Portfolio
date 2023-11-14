// API
import api from '../util/api';

// React modules
import { useNavigate } from 'react-router-dom';

// Sensitive Datas
import { URL, ROUTES } from '../sensitiveData/config';

// Hooks
import useFlashMessages from './useFlashMessages';

const useUser = () => {
    const { setFlashMessage } = useFlashMessages();
    const navigate = useNavigate();

    /**
     * Fetches all users from the API.
     * @return {Promise} A promise that resolves to an array of users.
     */
    async function getAllUser() {
        try {
            const response = await api.get(URL.USER);
            const data = response.data.result;

            return data;
        } catch (err) {
            const msgText = err.response.data.error;
            const msgType = 'error';
            setFlashMessage(msgText, msgType);
        };
    };

    /**
     * Fetches users based on users id from the API.
     * @return {Promise} A promise that resolves to an array of users.
     */
    async function getUserById(id) {
        try {
            const response = await api.get(`${URL.USER}/${id}`);
            const data = response.data.result;

            return data;
        } catch (err) {
            const msgText = err.response.data.error;
            const msgType = 'error';
            setFlashMessage(msgText, msgType);
        };
    };

    /**
     * Register a user.
     * @param {Object} user - The user object to be registered.
     * @return {Promise} A promise that resolves once the user is successfully registered.
     */
    async function registerUser(user) {
        try {
            const response = await api.post(URL.USER, user);
            const newUser = response.data.result

            navigate(`${ROUTES.ACTIVE_USER}/${newUser.id}/${newUser.name}`);
        } catch (err) {
            const msgText = err.response.data.error;
            const msgType = 'error';
            setFlashMessage(msgText, msgType);
        };
    };

    /**
     * Edits a user.
     * @param {Object} user - The user object to be edited.
     * @return {Promise} A promise that resolves once the user is successfully edited.
     */
    async function editUser(user) {
        try {
            await api.patch(`${URL.USER}/${user.id}`, user);

            navigate(URL.ADMIN);
        } catch (err) {
            const msgText = err.response.data.error;
            const msgType = 'error';
            setFlashMessage(msgText, msgType);
        }
    }

    /**
     * Delete a user.
     * @param {Object} user - The user object to be deleted.
     * @return {Promise} A promise that resolves once the user is successfully deleted.
     */
    async function deleteUser(id) {
        try {
            const response = await api.delete(`${URL.USER}/${id}`);
            const data = response.data.result;
            setFlashMessage(data, 'success');

            window.location.reload();
        } catch (err) {
            const msgText = err.response.data.error;
            const msgType = 'error';
            setFlashMessage(msgText, msgType);
        };
    };

    return { getAllUser, getUserById, registerUser, editUser, deleteUser };
};

export default useUser;