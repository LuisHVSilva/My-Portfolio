// API
import api from '../util/api';

// Sensitive Datas
import { URL } from '../sensitiveData/config';

const useBlogCategorys = () => {
    /**
     * Fetches all blog categorys from the API.
     * @return {Promise} A promise that resolves to an array of blog categorys.
     */
    async function getAllBlogCategory() {
        try {
            const response = await api.get(URL.BLOG_CATEGORY);
            const data = response.data.result;

            return data;
        } catch (err) {
            console.error(err);
        };
    };

    /**
     * Fetches blog categorys based on blog id from the API.
     * @return {Promise} A promise that resolves to an array of blog categorys.
     */
    async function getBlogCategorysByCategoryId(id) {
        try {
            const response = await api.get(`${URL.BLOG_CATEGORY}/${id}`);
            const data = response.data.result;

            return data;
        } catch (err) {
            console.error(err);
        };
    };

    /**
     * Fetches blog categorys based on blog id from the API.
     * @return {Promise} A promise that resolves to an array of blog categorys.
     */
    async function getBlogCategoryByBlogId(blogId) {
        try {
            const response = await api.get(`${URL.BLOG_CATEGORY}/blog/${blogId}`);
            const data = response.data.result;

            return data;
        } catch (err) {
            console.error(err);
        };
    };

    /**
     * Registers categorys for a specific blog.
     * @param {Object} blog - The blog object.
     * @param {Array} categorys - An array of category objects to be registered.
     * @return {Promise} A promise that resolves once all categorys are registered.
     */
    async function registerBlogCategory(blog, categorys) {
        const currentBlogCategorys = await getBlogCategoryByBlogId(blog.id)
            .then(result => { return result })
            .catch(error => {
                console.log(error)
                return null
            })

        const currentBlogCategorysIds = [];
        for (const key in currentBlogCategorys) {
            currentBlogCategorysIds.push(+currentBlogCategorys[key].category);
        };

        const newBlogCategorys = [];
        for (const key in categorys) {
            newBlogCategorys.push(+categorys[key].id);
        };

        const differentValues = newBlogCategorys.filter(valor => !currentBlogCategorysIds.includes(valor));
        for (let i = 0; i < differentValues.length; i++) {
            try {
                const includeData = {
                    blogId: blog.id,
                    categoryId: differentValues[i]
                };

                await api.post(URL.BLOG_CATEGORY, includeData);
            } catch (err) {
                console.error(err);
            };
        };
    };

    /**
     * Delete categorys for a specific blog.
     * @param {Object} blog - The blog object.
     * @param {Array} categorys - An array of category objects to be deleted.
     * @return {Promise} A promise that resolves once all categorys are deleted.
     */
    async function deleteBlogCategory(blog, categorys) {
        const currentBlogCategorys = await getBlogCategoryByBlogId(blog.id)
            .then(result => { return result })
            .catch(error => {
                console.log(error)
                return null
            })

        const currentBlogCategorysIds = [];
        for (const key in currentBlogCategorys) {
            currentBlogCategorysIds.push(+currentBlogCategorys[key].category);
        };

        const newBlogCategorys = [];
        for (const key in categorys) {
            newBlogCategorys.push(+categorys[key].id);
        };

        const deleteBlogCategorys = currentBlogCategorysIds.filter(valor => !newBlogCategorys.includes(valor));

        for (let i = 0; i < deleteBlogCategorys.length; i++) {
            try {
                await api.delete(`${URL.BLOG_CATEGORY}/delete?blogId=${blog.id}&categoryId=${deleteBlogCategorys[i]}`);
            } catch (err) {
                console.error(err);
            };
        };
    };

    return { getAllBlogCategory, getBlogCategorysByCategoryId, getBlogCategoryByBlogId, registerBlogCategory, deleteBlogCategory };
};

export default useBlogCategorys;