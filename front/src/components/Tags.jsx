import React from 'react'

const Tags = ({ tags }) => {    
    const renderListTags = (allTags) => {
        // TODO: arrumar o link da tag 'a';
        return (
            <>
                {allTags.map((tag, index) => (
                    <a href={`/tag/${tag.id}`} key={index}>{`#${tag.name}`}</a>
                ))}
            </>
        );
    };
    return (
        <div className="tags mb-15">
            <p className="h4 mb-5">Tags</p>
            <div className="tags-container">
                {renderListTags(Object.values(tags))}                
            </div>
        </div>
    )
}

export default Tags