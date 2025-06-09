import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Import the fetchYouTubeComments function from yt-backend
import { fetchYouTubeComments } from '../yt-backend/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

// API endpoint to scrape YouTube comments
app.post('/scrape', async (req, res) => {
  try {
    const { videoUrl, commentLimit, apiKey } = req.body;

    if (!videoUrl) {
      return res.status(400).json({ 
        error: 'Video URL is required' 
      });
    }

    // Use the API key from request or fallback to environment variable
    const youtubeApiKey = apiKey || process.env.VITE_YOUTUBE_API_KEY;
    
    if (!youtubeApiKey) {
      return res.status(400).json({ 
        error: 'YouTube API key is required' 
      });
    }

    console.log(`Starting to fetch comments for: ${videoUrl}`);
    
    // Use the fetchYouTubeComments function from yt-backend
    const comments = await fetchYouTubeComments(videoUrl, youtubeApiKey, commentLimit);
    
    if (!comments || comments.length === 0) {
      return res.status(404).json({
        error: 'No comments found or failed to fetch comments'
      });
    }

    res.json(comments);
  } catch (error) {
    console.error('Error in /scrape endpoint:', error);
    const statusCode = error.response?.status || 500;
    const errorMessage = error.response?.data?.error?.message || error.message || 'Failed to fetch comments';
    res.status(statusCode).json({ 
      error: errorMessage 
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Serve the React app for any other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: err.message 
  });
});

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  server.close(() => process.exit(1));
});
