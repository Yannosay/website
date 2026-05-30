export const useNews = () => {
  const config = useRuntimeConfig()
  const base = config.public.newsApi

  const fetchList = async () => {
    const { data } = await useFetch(`${base}/api/news`, {
      key: 'news-list',
      transform: (items) =>
        items.map((item) => ({
          ...item,
          _path: `/news/${item.slug}`,
        })),
    })
    return data
  }

  const fetchArticle = async (slug) => {
    const { data } = await useFetch(`${base}/api/news/${slug}`, {
      key: `news-article-${slug}`,
    })
    return data
  }

  return { fetchList, fetchArticle }
}