// React Modules
import React from 'react';

const Categorys = ({ categorys, blogCategorys }) => {
    /**
     * Counts the occurrences of each category in a list of blog categorys.
     * @param {Object} blogCategorys - The list of blog categorys.
     * @return {Object} An object containing the counts of each category.
     */
    function countCategoryOccurrences(blogCategorys) {
        const ocurrences = {};
        for (const key in blogCategorys) {
            const category = blogCategorys[key].category;
            if (ocurrences[category]) {
                ocurrences[category] += 1;
            } else {
                ocurrences[category] = 1;
            };
        };
        return ocurrences;
    };

    const renderListCategorys = (allCategorys, blogCategorys) => {
        // TODO: arrumar o link da tag 'a';
        const categoryOcurrences = countCategoryOccurrences(blogCategorys)

        return (
            <>
                {allCategorys.map((category, index) => (
                    <div className="categorys-item" key={index}>
                        <a href={`/category/${category.id}`}>{category.name}</a>
                        {categoryOcurrences[category.id] ? <p>{categoryOcurrences[category.id]}</p> : <p>0</p>}
                    </div>
                ))}
            </>
        );
    };

    return (
        <div className="categorys">
            <p className="h4 mb-5">Categorias</p>
            {categorys ?
                renderListCategorys(Object.values(categorys), blogCategorys)
                :
                <div className="categorys-item">
                    <p>Sem categoria cadastrada</p>
                </div>}
            {/* {renderListCategorys(Object.values(categorys), blogCategorys)} */}
        </div>
    );
};

export default Categorys;