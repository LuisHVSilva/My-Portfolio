// 
import { useNavigate } from 'react-router-dom';

// API
import api from '../util/api';

// Sensitive Datas
import { URL } from '../sensitiveData/config';

// Hooks
import useFlashMessages from './useFlashMessages';

const useVerifyUser = () => {
    const { setFlashMessage } = useFlashMessages();
    const navigate = useNavigate();

    /**
     * Register a tag.
     * @param {Object} tag - The tag object to be registered.
     * @return {Promise} A promise that resolves once the tag is successfully registered.
     */
    async function activeUser(token, id) {
        try {
            const data = { 'token': Object.values(token).join('').toUpperCase() }
            await api.post(`${URL.VERIFY_TOKEN}/${id}`, data);

            navigate(URL.ADMIN);
        } catch (err) {
            const msgText = err.response.data.error;
            const msgType = 'error';
            setFlashMessage(msgText, msgType);
        };
    };

    return { activeUser };
};

export default useVerifyUser;