
import './App.css'
// App.jsx
import { useState } from 'react';

function App() {
  const [longUrl, setLongUrl] = useState('');
  
  // Example data - you'll replace this with your API calls
  const [shortenedUrls, setShortenedUrls] = useState([
    { shortUrl: 'sc/xyz123', originalUrl: 'https://example.com/long-url', visits: 50 },
    { shortUrl: 'sc/abc456', originalUrl: 'https://another-url.com/sample', visits: 23 }
  ]);

  const handleShorten = () => {
    // This is where you'll integrate with your Spring Boot backend
    console.log("Shortening URL:", longUrl);
    // For now, we'll just clear the input
    setLongUrl('');
  };

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Circuit Lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top right circuit */}
        <div className="absolute top-16 right-0">
          <svg width="500" height="500" viewBox="0 0 500 500">
            <path d="M500,100 L350,100 L350,250 L250,250" stroke="#2DD4BF" strokeWidth="1" fill="none" />
            <circle cx="250" cy="250" r="4" fill="#2DD4BF" />
          </svg>
        </div>
        
        {/* Bottom left circuit */}
        <div className="absolute bottom-0 left-80">
          <svg width="300" height="400" viewBox="0 0 300 400">
            <path d="M0,0 L0,200 L150,200" stroke="#2DD4BF" strokeWidth="1" fill="none" />
            <circle cx="150" cy="200" r="4" fill="#2DD4BF" />
          </svg>
        </div>
        
        {/* Middle right circuit */}
        <div className="absolute top-1/2 right-0">
          <svg width="400" height="300" viewBox="0 0 400 300">
            <path d="M400,150 L200,150 L200,300" stroke="#2DD4BF" strokeWidth="1" fill="none" />
            <circle cx="200" cy="300" r="4" fill="#2DD4BF" />
          </svg>
        </div>
        
        {/* Middle left circuit */}
        <div className="absolute top-1/3 left-0">
          <svg width="400" height="300" viewBox="0 0 400 300">
            <path d="M0,150 L200,150 L200,0" stroke="#2DD4BF" strokeWidth="1" fill="none" />
            <circle cx="200" cy="0" r="4" fill="#2DD4BF" />
          </svg>
        </div>
      </div>

      <div className="flex flex-col h-screen border border-teal-400/30 rounded-lg m-4 overflow-hidden z-10 relative">
        {/* Header with brand */}
        <div className="flex border-b border-teal-400/30">
          <div className="w-64 p-6 border-r border-teal-400/30 flex items-center">
            <div className="text-teal-400 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold">Short-Circuit</h1>
          </div>
          <div className="flex-1 p-6">
            <h2 className="text-3xl font-bold">URL Shortening</h2>
          </div>
        </div>

        <div className="flex flex-1">
          {/* Left sidebar */}
          <div className="w-64 border-r border-teal-400/30 p-6">
            <div className="flex items-center text-lg font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
              </svg>
              Dashboard
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 p-6 relative">
            {/* URL input section */}
            <div className="mb-10 relative flex">
              <input
                type="text"
                placeholder="Enter the long URL"
                className="flex-1 bg-transparent border border-teal-400/30 rounded-lg p-4 text-white"
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
              />
              <button
                onClick={handleShorten}
                className="ml-4 bg-teal-400 text-black font-medium px-8 py-4 rounded-lg hover:bg-teal-300 transition-colors"
              >
                Shorten
              </button>
            </div>

            {/* Shortened URLs table */}
            <div>
              <h3 className="text-3xl font-bold mb-6">Shortened URLs</h3>
              <div className="border border-teal-400/30 rounded-lg overflow-hidden">
                {/* Table Header */}
                <div className="grid grid-cols-3 bg-black border-b border-teal-400/30 p-4 font-medium">
                  <div>Short URL</div>
                  <div>Original URL</div>
                  <div>Visits</div>
                </div>

                {/* Table Content */}
                <div className="divide-y divide-teal-400/30">
                  {shortenedUrls.map((url, index) => (
                    <div key={index} className="grid grid-cols-3 p-4">
                      <div className="text-teal-400">{url.shortUrl}</div>
                      <div className="truncate">{url.originalUrl}</div>
                      <div>{url.visits}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;