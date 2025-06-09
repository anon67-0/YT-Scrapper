import { useState } from 'react';
import './App.css';

interface Comment {
  commentNumber: number;
  author: string;
  comment: string;
}

function App() {
  const [videoUrl, setVideoUrl] = useState('');
  const [commentLimit, setCommentLimit] = useState('10');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [apiKey] = useState('AIzaSyDbq34h8MimTTR0rVmyYG2jdMO-blTm0hw');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoUrl.trim()) {
      setError('Please enter a YouTube video URL or ID');
      return;
    }

    setIsLoading(true);
    setError('');
    setComments([]);

    try {
      const response = await fetch('http://localhost:3001/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          videoUrl,
          commentLimit: commentLimit === 'all' ? 'all' : parseInt(commentLimit, 10),
          apiKey,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch comments');
      }

      const data = await response.json();
      setComments(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <header>
        <h1>YouTube Comment Scraper</h1>
        <p>Extract and analyze comments from any YouTube video</p>
      </header>


      <main>
        <form onSubmit={handleSubmit} className="scraper-form">
          <div className="form-group">
            <label htmlFor="videoUrl">YouTube Video URL or ID:</label>
            <input
              type="text"
              id="videoUrl"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="e.g., https://www.youtube.com/watch?v=..."
              disabled={isLoading}
            />
          </div>


          <div className="form-group">
            <label htmlFor="commentLimit">Number of Comments:</label>
            <div className="comment-limit-input">
              <input
                type="number"
                id="commentLimit"
                min="1"
                value={commentLimit === 'all' ? '' : commentLimit}
                onChange={(e) => {
                  const value = e.target.value;
                  setCommentLimit(value === '' ? 'all' : value);
                }}
                placeholder="Enter number or leave empty for all"
                disabled={isLoading}
              />
              <button 
                type="button" 
                className="all-comments-btn"
                onClick={() => setCommentLimit('all')}
                disabled={isLoading}
              >
                All Comments
              </button>
            </div>
          </div>


          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Scraping...' : 'Scrape Comments'}
          </button>
        </form>


        {error && <div className="error">{error}</div>}


        {comments.length > 0 && (
          <div className="results">
            <h2>Comments ({comments.length})</h2>
            <div className="comments-list">
              {comments.map((comment) => (
                <div key={comment.commentNumber} className="comment">
                  <div className="comment-header">
                    <span className="comment-number">#{comment.commentNumber}</span>
                    <span className="comment-author">{comment.author}</span>
                  </div>
                  <div className="comment-text">{comment.comment}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>


      <footer>
        <p>YouTube Comment Scraper &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;
