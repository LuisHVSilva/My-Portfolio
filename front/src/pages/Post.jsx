// React Modules.
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { format, parseISO } from 'date-fns';

// Hooks
import useBlogs from '../admin/hooks/useBlogs';
import useBlogRender from '../hook/useBlogRender';

const Post = () => {
    const params = useParams();
    const { getBlogById } = useBlogs();
    const { getImageName } = useBlogRender();
    const [blog, setBlog] = useState({});

    const blogFormat = (blog) => {
        blog.text = blog.text.replace(/<p><br><\/p>/g, '');
        blog.updatedAt = format(parseISO(blog.updatedAt), "dd/MM/yyyy HH:mm")
        setBlog(blog);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const id = params.id;
                blogFormat(await getBlogById(id));
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [params]);

    return (
        <>
            <section id='post-section' className="post">
                <h1>{blog.title}</h1>
                {blog.image_one && <img src={blog.image_one} alt={getImageName(blog.image_one)} />}
                <h2 className='subtitle'>{blog.subtitle}</h2>
                <small>{blog.updatedAt}</small><br />

                <div dangerouslySetInnerHTML={{ __html: blog.text }} />
                <a href="/blog" className='post-link'>Voltar</a>
            </section>
        </>
    )
};

export default Post;

{/* <div style={{ color: 'white' }}>{blog.text}</div> */ }