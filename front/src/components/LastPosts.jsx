import React, { useEffect } from 'react'

const LastPosts = () => {
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const id = params.id;
                replaceImageURL(await getBlogById(id))
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [])
    return (
        <section id="last-posts-index">
            <p className="h1">Últimos posts</p>
            <div className="last-posts-index-content">
                <div className="last-posts-index-information">
                    <img src="images/last-post.png" alt="" />
                    <a href="#">XXXXX XXXXX XXXXX XXXXX XXXXX XXXXX</a>
                </div>
                <span className="last-posts-index-date">DD/MM/YYYY</span>
            </div>
            <div className="last-posts-index-content">
                <div className="last-posts-index-information">
                    <img src="images/last-post.png" alt="" />
                    <a href="#">XXXXX XXXXX XXXXX XXXXX XXXXX XXXXX</a>
                </div>
                <span className="last-posts-index-date">DD/MM/YYYY</span>
            </div>
            <div className="last-posts-index-content">
                <div className="last-posts-index-information">
                    <img src="images/last-post.png" alt="" />
                    <a href="#">XXXXX XXXXX XXXXX XXXXX XXXXX XXXXX</a>
                </div>
                <span className="last-posts-index-date">DD/MM/YYYY</span>
            </div>
        </section>
    )
}

export default LastPosts