import React from 'react';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import Stack from 'react-bootstrap/Stack';
const defaultNews = {
  status: 'ok',
  totalResult: 0,
  articles: [],
};
const endpoint =
  'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=cad82b04d8734204ade8411de722f112';
const Feeds = () => {
  const [news, setNews] = useState(defaultNews);
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [isRefresh, setRefresh] = useState(false);
  const handleRefresh = () => {
    setNews(defaultNews);
    setPage(1);
    setLoading(false);
    setRefresh(false);
  };

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
            totalResults: result.totalResults,
            status: result.status,
          };
        });
        if (result.status !== 'ok') {
          throw new Error('error');
        }
      } catch (error) {
        setError(true);
      }
      setLoading(false);
    };
    fetchData();
  }, [page, isRefresh]);
  return (
    <>
      <h3
        style={{
          display: 'flex',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        Nest Feed
      </h3>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error thrown</p>}
      <ul>
        {news.articles.map((item, index) => (
          <>
            <li key={index}>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </li>
            <img
              src={item.urlToImage}
              style={{ width: '500px', height: 'auto' }}
              alt={index}
            />
            <p>{item.content}</p>
          </>
        ))}
      </ul>
      <Stack gap={3} direction="horizontal" className="mx-auto">
        {news.articles.length < parseInt(news.totalResults) ? (
          <Button
            variant="primary"
            onClick={() => setPage((c) => c + 1)}
            disabled={isLoading}
          >
            Load more...
          </Button>
        ) : null}
        <Button
          variant="outline-primary"
          onClick={handleRefresh}
          disabled={isLoading}
        >
          Refresh
        </Button>

        <Button variant="primary"> Bootstrap</Button>
      </Stack>
    </>
  );
};

export default Feeds;
