// React Modules
import React from 'react'

// Hooks
import useBlogRender from '../hook/useBlogRender'

const Highlights = ({ highlightsBlogs, blogTags, tags }) => {    
    const { renderBlogList } = useBlogRender();
    const cssClass = 'highlights';

    return (
        <section className="highlights">
            <p className="h1">Destaques</p>
            <div className="highlights-container">
                {renderBlogList(Object.values(highlightsBlogs), blogTags, tags, cssClass)}
            </div>
        </section>
    )
}

export default Highlights