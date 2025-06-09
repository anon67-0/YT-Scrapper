# YouTube Comment Scraper

A web application that allows you to extract and analyze comments from any YouTube video. Built with React, TypeScript, Vite, and Express.

## Features

- Extract comments from any public YouTube video
- Specify the number of comments to fetch (10, 20, 50, 100, or all)
- Clean, responsive user interface
- Real-time feedback during scraping
- Error handling for invalid inputs

## Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher) or yarn
- YouTube Data API v3 key (get it from [Google Cloud Console](https://console.cloud.google.com/))

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd yt-scrapper
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```
   VITE_YOUTUBE_API_KEY=your_youtube_api_key_here
   PORT=3001
   ```

4. **Start the development server**
   ```bash
   # Start both frontend and backend
   npm run dev:full
   ```
   
   Or run them separately:
   ```bash
   # Start backend server
   npm run server
   
   # In a new terminal, start frontend
   npm run dev
   ```

5. **Open the app**
   The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start the Vite development server
- `npm run build` - Build the app for production
- `npm run server` - Start the backend server with nodemon
- `npm run client` - Start the frontend development server
- `npm run dev:full` - Start both frontend and backend in development mode
- `npm start` - Start the production server
- `npm run preview` - Preview the production build locally

## How to Use

1. Enter a YouTube video URL or video ID in the input field
2. Select the number of comments you want to fetch
3. Click "Scrape Comments"
4. View the extracted comments in the results section

## Project Structure

- `/src` - Frontend React application
  - `App.tsx` - Main application component
  - `App.css` - Main styles
- `server.js` - Backend Express server
- `package.json` - Project dependencies and scripts

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- YouTube Data API v3
- React
- Vite
- Express
- TypeScript
  },
})
```
