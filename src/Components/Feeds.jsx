import React from 'react';import { useState, useEffect } from 'react';
const defaultNews = {
  status: 'ok',
  totalResult: 0,
  articles: [],
};
const endpoint =
  'https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=cad82b04d8734204ade8411de722f112https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=cad82b04d8734204ade8411de722f112';
const Feeds = () => {
  const [news, setNews] = useState(defaultNews);
  const [page, setPage] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [isRefresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${endpoint}&page=${page}`);
        const result = await response.json();
        setNews((current) => {
          return {
            ...result,
            articles: [...current.articles, ...result.articles],
            totalResult: result.totalResult,
            status: result.status,
          };
        });
        if (result.status != 'ok') {
          throw new Error('error');
        }
      } catch (error) {
        setError(true);
      }
      setLoading(false);
    };
    fetchData();
  });
  return (
    <>
      <h3>Nest Feed</h3>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error thrown</p>}
      <ol>
        {news.articles.map((item, index) => {
          <li key={index}>{item.title}</li>;
        })}
      </ol>
      <button disabled={isLoading}>Load more...</button>
      <button disabled={isLoading}>Refresh</button>
    </>
  );
};

export default Feeds;
