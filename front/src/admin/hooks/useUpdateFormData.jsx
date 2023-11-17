// Hooks
import useCategorys from "./useCategorys";
import useTags from "./useTags";

const useUpdateFormData = () => {        
    const { getCategoryById } = useCategorys();
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
     * Updates active categorys for a blog.
     * @param {Object} blogCategory - The active categorys associated with the blog.
     * @return {Promise} A promise that resolves to an updated object of active categorys.
     */
    async function updateActiveCategorys(blogCategory) {
        const updatedCategorys = {}; 

        try {
            for (const key in blogCategory) {
                const category = await getCategoryById(blogCategory[key].category);
                const newCategory = {
                    id: category.id,
                    name: category.name,
                };
                updatedCategorys[blogCategory[key].category] = newCategory;
            }

            return updatedCategorys;
        } catch (error) {
            console.error(error);
        }
    };
    
    return { updateActiveTags, updateActiveCategorys };
};

export default useUpdateFormData;
