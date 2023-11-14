// Utils imports
import bus from '../util/bus';

const useFlashMessages = () => {
    /**
     * Sets a flash message to be displayed.
     * @param {string} msg - The message to be displayed.
     * @param {string} type - The type of the flash message (e.g., 'error', 'success', etc.).
     */
    function setFlashMessage(msg, type) {
        bus.emit('flash', {
            message: msg,
            type: type,
        });
    };

    return { setFlashMessage };
};

export default useFlashMessages;