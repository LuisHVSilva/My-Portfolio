const useBlogRender = () => {
    const getTagName = (blogId, blogTags, tags) => {
        const matchingTags = blogTags
            .filter(blogTag => blogTag.blog === blogId)
            .map(({ tag }) => tags.find(t => t.id === tag));

        const uniqueTags = [...new Set(matchingTags.map(tag => tag.id))].map(id => {
            const tag = matchingTags.find(t => t.id === id);
            return { id: tag.id, name: tag.name };
        });

        return (
            <>
                {uniqueTags.map((tag, index) => (
                    <a href={`/tag/${tag.id}`} key={index}>{`#${tag.name}`}</a>
                ))}
            </>
        );
    };

    const renderBlogList = (objects, blogTags, tags, cssClass) => {
        return (
            <>
                {objects.map((item, index) => (
                    <div className={`${cssClass}-card mb-10`} key={index}>
                        <div className={`${cssClass}-image mb-10`}>
                            <img src={item.image_one} alt={item.image_one} />
                        </div>
                        <div className={`${cssClass}-text`}>
                            <p className="card-title mb-5">{item.title}</p>
                            <p className="card-text mb-5">{item.subtitle}</p>
                            <a href={`blog/${item.id}`} className="card-link"><span>Continue lendo ...</span></a>
                            <div className="card-tags mt-10">
                                {getTagName(item.id, blogTags, tags)}
                            </div>
                        </div>
                    </div>
                ))}
            </>
        );
    };

    const getHighlights = (objects) => {
        try {
            const highlights = {}

            for (const key in objects) {
                if (objects[key].highlight) {
                    highlights[key] = objects[key];
                }
            }

            return highlights;
        } catch (err) {
            throw new Error(`Erro ao obter destaques: ${err.message}`);
        }
    };

    const getImageName = (url) => {
        const nomeDaImagemComExtensao = url.match(/-----([^\.]+\.(png|jpg|jpeg|gif))\?/);
        const nomeDaImagem = nomeDaImagemComExtensao ? nomeDaImagemComExtensao[1] : url;

        return nomeDaImagem;
    };

    return { getTagName, renderBlogList, getHighlights, getImageName };
};

export default useBlogRender;

// const renderBlogList = (objects, blogTags, tags, cssClass) => {
//     return (
//         <>
//             {objects.map((item, index) => (
//                 <div className={`${cssClass}-card mb-10`} key={index}>
//                     <div className={`${cssClass}-image mb-10`}>
//                         <img src={item.image_one} alt={item.image_one} />
//                     </div>
//                     <div className={`${cssClass}-text`}>
//                         <p className="card-title mb-5">{item.title}</p>
//                         <p className="card-text mb-5">{item.subtitle}</p>
//                         <a href={`blog/${item.id}`} className="card-link"><span>Continue lendo ...</span></a>
//                         <div className="card-tags mt-10">
//                             {getTagName(item.id, blogTags, tags)}
//                         </div>
//                     </div>
//                 </div>
//             ))}
//         </>
//     );
// };