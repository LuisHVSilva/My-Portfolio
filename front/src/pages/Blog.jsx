import React, { useEffect, useState } from 'react'
import Highlights from '../components/Highlights'
import Tags from '../components/Tags'
import Categorys from '../components/Categorys'
import OtherPosts from '../components/OtherPosts'

// Hooks
import useBlogs from '../admin/hooks/useBlogs'
import useCategorys from '../admin/hooks/useCategorys';
import useTags from '../admin/hooks/useTags';
import useBlogCategorys from '../admin/hooks/useBlogCategorys';
import useBlogTags from '../admin/hooks/useBlogTags'
import useBlogRender from '../hook/useBlogRender'

const Blog = () => {
  const { getHighlights } = useBlogRender();
  const { getAllBlogs } = useBlogs();
  const { getAllCategorys } = useCategorys();
  const { getAllBlogCategory } = useBlogCategorys();
  const { getAllTags } = useTags();
  const { getAllBlogTags } = useBlogTags();

  const [allBlogs, setAllBlogs] = useState({});
  const [highlightsBlogs, setHighlightsBlogs] = useState({});
  const [allCategorys, setAllCategorys] = useState({});
  const [allBlogCategorys, setAllBlogCategorys] = useState({});
  const [allTags, setAllTags] = useState({});
  const [allBlogTags, setAllBlogTags] = useState({});


  useEffect(() => {
    const fetchData = async () => {
      try {
        setAllCategorys(await getAllCategorys());
        setAllBlogCategorys(await getAllBlogCategory());
        setAllTags(await getAllTags());
        setAllBlogTags(await getAllBlogTags());

        const allBlogs = await getAllBlogs()
        setAllBlogs(allBlogs);
        setHighlightsBlogs(getHighlights(allBlogs))
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [])
    
  return (
    <main id="l-main">
      <section id="top-blog">
        <Highlights
          highlightsBlogs={highlightsBlogs}
          blogTags={allBlogTags}
          tags={allTags}
        />

        <section className="filter">
          <Tags
            tags={allTags}
          />

          <Categorys
            categorys={allCategorys}
            blogCategorys={allBlogCategorys} />
        </section>
      </section>

      <OtherPosts
        allBlogs={allBlogs}
        blogTags={allBlogTags}
        tags={allTags}
      />
    </main>
  )
}

export default Blog