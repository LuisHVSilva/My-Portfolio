// React Modules
import React from 'react';

const Categories = ({ categories, blogCategories }) => {
    /**
     * Counts the occurrences of each category in a list of blog categories.
     * @param {Object} blogCategories - The list of blog categories.
     * @return {Object} An object containing the counts of each category.
     */
    function countCategoryOccurrences(blogCategories) {
        const ocurrences = {};
        for (const key in blogCategories) {
            const category = blogCategories[key].categorie;
            if (ocurrences[category]) {
                ocurrences[category] += 1;
            } else {
                ocurrences[category] = 1;
            };
        };
        return ocurrences;
    };

    const renderListCategories = (allCategories, blogCategories) => {
        // TODO: arrumar o link da tag 'a';
        const categoryOcurrences = countCategoryOccurrences(blogCategories)

        return (
            <>
                {allCategories.map((category, index) => (
                    <div className="categories-item" key={index}>
                        <a href={`/categorie/${category.id}`}>{category.name}</a>
                        {categoryOcurrences[category.id] ? <p>{categoryOcurrences[category.id]}</p> : <p>0</p>}
                    </div>
                ))}
            </>
        );
    };

    return (
        <div className="categories">
            <p className="h4 mb-5">Categorias</p>
            {renderListCategories(Object.values(categories), blogCategories)}
        </div>
    );
};

export default Categories;