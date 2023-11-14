// API
import api from '../util/api';

// Sensitive Datas
import { URL } from '../sensitiveData/config';

const useBlogTags = () => {
    /**
     * Fetches all blog tags from the API.
     * @return {Promise} A promise that resolves to an array of blog tags.
     */
    async function getAllBlogTags() {
        try {
            const response = await api.get(URL.BLOG_TAG);
            const data = response.data.result;

            return data;
        } catch (err) {
            console.error(err);
        };
    };

    /**
     * Fetches blog tags based on blog id from the API.
     * @return {Promise} A promise that resolves to an array of blog tags.
     */
    async function getBlogTagsByTagId(id) {
        try {
            const response = await api.get(`${URL.BLOG_TAG}/${id}`);
            const data = response.data.result;

            return data;
        } catch (err) {
            console.error(err);
        };
    };

    /**
     * Fetches blog tags based on blog id from the API.
     * @return {Promise} A promise that resolves to an array of blog tags.
     */
    async function getBlogTagByBlogId(blogId) {
        try {
            const response = await api.get(`${URL.BLOG_TAG}/blog/${blogId}`);
            const data = response.data.result;

            return data;
        } catch (err) {
            console.error(err);
        };
    };

    /**
     * Registers tags for a specific blog.
     * @param {Object} blog - The blog object.
     * @param {Array} tags - An array of category objects to be registered.
     * @return {Promise} A promise that resolves once all tags are registered.
     */
    async function registerBlogTag(blog, tags) {
        console.log('Entrou')
        const currentBlogTags = await getBlogTagByBlogId(blog.id)
            .then(result => { return result })
            .catch(error => {
                console.log(error)
                return null
            });


        const currentBlogTagsIds = []
        for (const key in currentBlogTags) {
            currentBlogTagsIds.push(+currentBlogTags[key].tag);
        };

        const newBlogTags = [];
        for (const key in tags) {
            newBlogTags.push(+tags[key].id);
        }

        const differentValues = newBlogTags.filter(valor => !currentBlogTagsIds.includes(valor));
        for (let i = 0; i < differentValues.length; i++) {
            try {
                const includeData = {
                    blogId: blog.id,
                    tagId: differentValues[i]
                };

                await api.post(URL.BLOG_TAG, includeData);
            } catch (err) {
                console.error(err);
            }
        };
    };

    /**
     * Delete tags for a specific blog.
     * @param {Object} blog - The blog object.
     * @param {Array} tags - An array of category objects to be deleted.
     * @return {Promise} A promise that resolves once all tags are deleted.
     */
    async function deleteBlogTag(blog, tags) {
        const currentBlogTags = await getBlogTagByBlogId(blog.id)
            .then(result => { return result })
            .catch(error => {
                console.log(error)
                return null
            });

        const currentBlogTagsIds = [];
        for (const key in currentBlogTags) {
            currentBlogTagsIds.push(+currentBlogTags[key].tag);
        };

        const newBlogTags = [];
        for (const key in tags) {
            newBlogTags.push(+tags[key].id);
        };

        const deleteBlogTags = currentBlogTagsIds.filter(valor => !newBlogTags.includes(valor));

        for (let i = 0; i < deleteBlogTags.length; i++) {
            try {
                await api.delete(`${URL.BLOG_TAG}/delete?blogId=${blog.id}&tagId=${deleteBlogTags[i]}`);
            } catch (err) {
                console.error(err);
            };
        };
    };

    return { getAllBlogTags, getBlogTagsByTagId, getBlogTagByBlogId, registerBlogTag, deleteBlogTag };
};

export default useBlogTags;