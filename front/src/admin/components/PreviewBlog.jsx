import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import useBlogRender from '../../hook/useBlogRender';

const PreviewBlog = () => {
  const { getImageName } = useBlogRender();

  const [blog, setBlog] = useState('');

  useEffect(() => {
    const currentUrl = window.location.href;
    const searchParams = new URLSearchParams(new URL(currentUrl).search);
    const paramNames = Array.from(searchParams.keys());

    const params = {};
    paramNames.forEach(name => {
      const value = searchParams.get(name);
      params[name] = value;
    });

    blogFormat(params)
  }, []);

  const blogFormat = (blog) => {
    blog.text = blog.text.replace(/<p><br><\/p>/g, '');    
    blog.updatedAt = format(new Date(), 'dd/MM/yyyy HH:mm');;

    setBlog(blog);
  };
  
  return (
    <>
      <section id='post-section' className="post">
        <h1>{blog.title}</h1>
        {/* {blog.image_one && <img src={blog.image_one} alt={getImageName(blog.image_one)} />} */}
        <h1>IMAGEM UM FICA AQUI</h1>
        <h2 className='subtitle'>{blog.subtitle}</h2>
        <small>{blog.updatedAt}</small><br />

        <div dangerouslySetInnerHTML={{ __html: blog.text }} />        
      </section>
    </>
  )
}

export default PreviewBlog