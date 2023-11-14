// API
import api from '../util/api';

// React Modules
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

// Sensitive Datas
import { URL } from '../sensitiveData/config';

// Hooks
import useFlashMessages from './useFlashMessages';

const userAuth = () => {
    const { setFlashMessage } = useFlashMessages();
    const [authenticated, setAuthenticated] = useState(false);
    const navigate = useNavigate();
    const cookies = new Cookies();

    useEffect(() => {
        const token = cookies.get('token');
        if (token) {
            setAuthenticated(true);
        };
    }, []);

    /**
     * Performs a login operation.
     * @param {Object} user - The user object containing login credentials.
     * @return {null} - This function does not return anything explicitly.
     */
    async function login(user) {
        try {
            await api.post(`${URL.ADMIN}/`, user);

            setAuthenticated(true);

        } catch (err) {
            const msgText = err.response.data.error;
            const msgType = 'error';
            setFlashMessage(msgText, msgType);
        };
    };

    /**
     * Performs a logout operation.
     * @param {Object} user - The user object containing login credentials.
     * @return {null} - This function does not return anything explicitly.
     */
    async function logout() {
        try {
            await api.post(`${URL.ADMIN}/logout`);
            setAuthenticated(false);
            navigate('/');

        } catch (error) {
            console.error(error);
        }
    };

    return { authenticated, login, logout };
};

export default userAuth;
