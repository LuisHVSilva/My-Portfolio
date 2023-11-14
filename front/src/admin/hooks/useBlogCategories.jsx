// API
import api from '../util/api';

// Sensitive Datas
import { URL } from '../sensitiveData/config';

const useBlogCategories = () => {
    /**
     * Fetches all blog categories from the API.
     * @return {Promise} A promise that resolves to an array of blog categories.
     */
    async function getAllBlogCategorie() {
        try {
            const response = await api.get(URL.BLOG_CATEGORIE);
            const data = response.data.result;

            return data;
        } catch (err) {
            console.error(err);
        };
    };

    /**
     * Fetches blog categories based on blog id from the API.
     * @return {Promise} A promise that resolves to an array of blog categories.
     */
    async function getBlogCategoriesByCategorieId(id) {
        try {
            const response = await api.get(`${URL.BLOG_CATEGORIE}/${id}`);
            const data = response.data.result;

            return data;
        } catch (err) {
            console.error(err);
        };
    };

    /**
     * Fetches blog categories based on blog id from the API.
     * @return {Promise} A promise that resolves to an array of blog categories.
     */
    async function getBlogCategorieByBlogId(blogId) {
        try {
            const response = await api.get(`${URL.BLOG_CATEGORIE}/blog/${blogId}`);
            const data = response.data.result;

            return data;
        } catch (err) {
            console.error(err);
        };
    };

    /**
     * Registers categories for a specific blog.
     * @param {Object} blog - The blog object.
     * @param {Array} categories - An array of category objects to be registered.
     * @return {Promise} A promise that resolves once all categories are registered.
     */
    async function registerBlogCategorie(blog, categories) {
        const currentBlogCategories = await getBlogCategorieByBlogId(blog.id)
            .then(result => { return result })
            .catch(error => {
                console.log(error)
                return null
            })

        const currentBlogCategoriesIds = [];
        for (const key in currentBlogCategories) {
            currentBlogCategoriesIds.push(+currentBlogCategories[key].categorie);
        };

        const newBlogCategories = [];
        for (const key in categories) {
            newBlogCategories.push(+categories[key].id);
        };

        const differentValues = newBlogCategories.filter(valor => !currentBlogCategoriesIds.includes(valor));
        for (let i = 0; i < differentValues.length; i++) {
            try {
                const includeData = {
                    blogId: blog.id,
                    categorieId: differentValues[i]
                };

                await api.post(URL.BLOG_CATEGORIE, includeData);
            } catch (err) {
                console.error(err);
            };
        };
    };

    /**
     * Delete categories for a specific blog.
     * @param {Object} blog - The blog object.
     * @param {Array} categories - An array of category objects to be deleted.
     * @return {Promise} A promise that resolves once all categories are deleted.
     */
    async function deleteBlogCategorie(blog, categories) {
        const currentBlogCategories = await getBlogCategorieByBlogId(blog.id)
            .then(result => { return result })
            .catch(error => {
                console.log(error)
                return null
            })

        const currentBlogCategoriesIds = [];
        for (const key in currentBlogCategories) {
            currentBlogCategoriesIds.push(+currentBlogCategories[key].categorie);
        };

        const newBlogCategories = [];
        for (const key in categories) {
            newBlogCategories.push(+categories[key].id);
        };

        const deleteBlogCategories = currentBlogCategoriesIds.filter(valor => !newBlogCategories.includes(valor));

        for (let i = 0; i < deleteBlogCategories.length; i++) {
            try {
                await api.delete(`${URL.BLOG_CATEGORIE}/delete?blogId=${blog.id}&categorieId=${deleteBlogCategories[i]}`);
            } catch (err) {
                console.error(err);
            };
        };
    };

    return { getAllBlogCategorie, getBlogCategoriesByCategorieId, getBlogCategorieByBlogId, registerBlogCategorie, deleteBlogCategorie };
};

export default useBlogCategories;