// React Modules
import React from 'react';

// Hooks 
import useBlogRender from '../hook/useBlogRender';

const OtherPosts = ({ allBlogs, blogTags, tags }) => {

    const { renderBlogList } = useBlogRender();
    const cssClass = 'blog';

    const dateSortedBlogs = Object.values(allBlogs).sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    const firstFourBlogs = dateSortedBlogs.slice(0, 4);

    return (
        <section id="bottom-blog">
            <p className="h1">Últimos posts</p>
            <div className="bottom-blog-container">
                {renderBlogList(firstFourBlogs, blogTags, tags, cssClass)}
            </div>
        </section>
    );
};

export default OtherPosts;