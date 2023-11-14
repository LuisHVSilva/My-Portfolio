// API
import api from '../util/api';

// Sensitive Datas
import { URL } from '../sensitiveData/config';

const useDatabaseInfo = () => {
    /**
     * Fetches a list of tables.
     * @return {Promise} A promise that resolves to an array of table data.
     */
    async function getTables() {
        try {
            const response = await api.get(URL.TABLE);
            const data = response.data.result;

            return data;
        } catch (err) {
            console.error(err);
        };
    };

    /**
     * Fetches a list of columns for a specific table.
     * @param {string} tableName - The name of the table.
     * @return {Promise} A promise that resolves to an array of column data.
     */
    async function getColumns(tableName) {
        try {
            const response = await api.get(`${URL.TABLE}/${tableName}`);
            const data = response.data.result;

            return data;
        } catch (err) {
            console.error(err);
        };
    };

    /**
     * Fetches the list of database logs     
     * @return {Promise} A promise that resolves to an array of database log.
     */
    async function getLogs() {
        try {
            const response = await api.get(`${URL.LOG}`);
            const data = response.data.result;

            return data;
        } catch (err) {
            console.error(err);
        };
    };

    /**
     * Fetches the list of database logs     
     * @return {Promise} A promise that resolves to an array of database log.
     */
    async function getLogs() {
        try {
            const response = await api.get(`${URL.LOG}`);
            const data = response.data.result;

            return data;
        } catch (err) {
            console.error(err);
        };
    };

    async function deleteVerifyToken() {
        try {
            await api.delete(`${URL.VERIFY_TOKEN}/delete`);

            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    }

    return { getTables, getColumns, getLogs, getLogs, deleteVerifyToken };
};

export default useDatabaseInfo;