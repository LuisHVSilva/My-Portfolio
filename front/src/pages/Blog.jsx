import React, { useEffect, useState } from 'react'
import Highlights from '../components/Highlights'
import Tags from '../components/Tags'
import Categories from '../components/Categories'
import OtherPosts from '../components/OtherPosts'

// Hooks
import useBlogs from '../admin/hooks/useBlogs'
import useCategories from '../admin/hooks/useCategories';
import useTags from '../admin/hooks/useTags';
import useBlogCategories from '../admin/hooks/useBlogCategories';
import useBlogTags from '../admin/hooks/useBlogTags'
import useBlogRender from '../hook/useBlogRender'

const Blog = () => {
  const { getHighlights } = useBlogRender();
  const { getAllBlogs } = useBlogs();
  const { getAllCategories } = useCategories();
  const { getAllBlogCategorie } = useBlogCategories();
  const { getAllTags } = useTags();
  const { getAllBlogTags } = useBlogTags();

  const [allBlogs, setAllBlogs] = useState({});
  const [highlightsBlogs, setHighlightsBlogs] = useState({});
  const [allCategories, setAllCategories] = useState({});
  const [allBlogCategories, setAllBlogCategories] = useState({});
  const [allTags, setAllTags] = useState({});
  const [allBlogTags, setAllBlogTags] = useState({});


  useEffect(() => {
    const fetchData = async () => {
      try {
        setAllCategories(await getAllCategories());
        setAllBlogCategories(await getAllBlogCategorie());
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

          <Categories
            categories={allCategories}
            blogCategories={allBlogCategories} />
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