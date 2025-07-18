
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const API_KEY = '10ac01847e70463f8fc3be32969eb471' // 🔥 Replace this with your NewsAPI key
const BASE_URL = 'https://newsapi.org/v2/top-headlines'

const App = () => {
  const [articles, setArticles] = useState([])
  const [category, setCategory] = useState('technology')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchNews = async (selectedCategory) => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          country: 'us',
          category: selectedCategory,
          apiKey: API_KEY,
        },
      })
      setArticles(response.data.articles)
    } catch (err) {
      setError('⚠️ Failed to fetch news. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNews(category)
  }, [category])

  return (
    <>
      <style>{`
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          background-color: #f4f4f4;
        }
        .header {
          background-color: #2c3e50;
          color: white;
          padding: 1rem;
          text-align: center;
        }
        .category-selector {
          display: flex;
          justify-content: center;
          margin: 1rem 0;
          gap: 10px;
          flex-wrap: wrap;
        }
        .category-selector button {
          padding: 0.5rem 1rem;
          border: none;
          background-color: #ecf0f1;
          cursor: pointer;
          border-radius: 5px;
          font-size: 1rem;
        }
        .category-selector button.active {
          background-color: #2980b9;
          color: white;
        }
        .news-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1rem;
          padding: 1rem;
        }
        .news-card {
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          display: flex;
          flex-direction: column;
        }
        .news-card img {
          width: 100%;
          height: 180px;
          object-fit: cover;
        }
        .news-content {
          padding: 0.75rem;
        }
        .news-content h2 {
          font-size: 1.1rem;
          margin: 0 0 0.5rem 0;
        }
        .news-content .source {
          color: #7f8c8d;
          font-size: 0.9rem;
        }
        .news-content a {
          color: #3498db;
          text-decoration: none;
          font-weight: bold;
        }
        .loading,
        .error {
          text-align: center;
          margin-top: 2rem;
          color: #7f8c8d;
        }
      `}</style>

      <div>
        <header className="header">
          <h1>📰 React News App</h1>
        </header>

        <div className="category-selector">
          {['technology', 'sports', 'business', 'health'].map((cat) => (
            <button
              key={cat}
              className={cat === category ? 'active' : ''}
              onClick={() => setCategory(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {loading && <p className="loading">Loading news...</p>}
        {error && <p className="error">{error}</p>}

        <div className="news-grid">
          {!loading && !error && articles.map((article, index) => (
            <div key={index} className="news-card">
              <img src={article.urlToImage} alt={article.title} />
              <div className="news-content">
                <h2>{article.title}</h2>
                <p className="source">{article.source.name}</p>
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  Read More
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
