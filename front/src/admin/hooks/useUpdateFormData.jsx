// Hooks
import useCategories from "./useCategories";
import useTags from "./useTags";

const useUpdateFormData = () => {        
    const { getCategorieById } = useCategories();
    const { getTagById } = useTags();

    /**
     * Updates active tags for a blog.
     * @param {Object} blogTag - The active tags associated with the blog.
     * @return {Promise} A promise that resolves to an updated object of active tags.
     */
    async function updateActiveTags(blogTag) {
        const updatedTags = {}; 
        
        try {                       
            for (const key in blogTag) {
                const tag = await getTagById(blogTag[key].tag);                                
                const newTag = {
                    id: tag.id,
                    name: tag.name,
                };                                
                updatedTags[blogTag[key].tag] = newTag;
            };            
            
            return updatedTags;            
        } catch (error) {
            console.error(error);
        };
    };

    /**
     * Updates active categories for a blog.
     * @param {Object} blogCategorie - The active categories associated with the blog.
     * @return {Promise} A promise that resolves to an updated object of active categories.
     */
    async function updateActiveCategories(blogCategorie) {
        const updatedCategories = {}; 

        try {
            for (const key in blogCategorie) {
                const categorie = await getCategorieById(blogCategorie[key].categorie);
                const newCategorie = {
                    id: categorie.id,
                    name: categorie.name,
                };
                updatedCategories[blogCategorie[key].categorie] = newCategorie;
            }

            return updatedCategories;
        } catch (error) {
            console.error(error);
        }
    };
    
    return { updateActiveTags, updateActiveCategories };
};

export default useUpdateFormData;
