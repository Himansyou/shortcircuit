import './App.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import UsernameInputPage from './UsernameInputPage';

function App() {
  const [longUrl, setLongUrl] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const backend = import.meta.env.VITE_BACKEND_URL;
  const [refresh, setRefresh] = useState(0); 
  const [shortenedUrls, setShortenedUrls] = useState([]);
  
  
  const id = localStorage.getItem("id"); 

  const getShortenedUrls = async () => {
    try {
      const response = await axios.get(`${backend}/byUser/${id}`); 
      setShortenedUrls(response.data);
      console.log("Fetched shortened URLs:", response.data);
    } catch (error) {
      console.error("Error fetching shortened URLs:", error);
    }
  }

  useEffect(() => {
    getShortenedUrls();
  }, [refresh]);

  const handleShorten = async () => {
    try {
   await axios.post(`${backend}/shorten`, {
      originalUrl: longUrl,
      userId: id, 
    }) 
    console.log("Shortening URL:", longUrl);
    setRefresh(refresh + 1);
    setLongUrl(''); }
    catch (error) {
      console.error("Error shortening URL:", error);
    }
  };

  const deleteUrl = async (linkId) => {
    try {
      await axios.delete(`${backend}/delete/${linkId}`); 
      setRefresh(refresh + 1); 
    } catch (error) {
      console.error("Error deleting URL:", error);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (!id) {
    return <UsernameInputPage />;
  }

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Circuit Lines - Only show on larger screens */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden hidden md:block">
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

      <div className="flex flex-col min-h-screen border border-teal-400/30 rounded-lg m-4 overflow-hidden z-10 relative">

        {/* Header with brand */}
        <div className="flex border-b border-teal-400/30">
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center pl-4">
            <button onClick={toggleSidebar} className="text-teal-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
          
          <div className="w-full md:w-64 p-4 md:p-6 border-r border-teal-400/30 flex items-center">
            <div className="text-teal-400 mr-2 md:mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 md:w-8 md:h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
            </div>
            <h1 className="text-xl md:text-2xl lg:text-s xl:text-2xl font-bold truncate">Short-Circuit</h1>
          </div>
          <div className="hidden md:flex flex-1 p-6">
            <h2 className="text-3xl font-bold">URL Shortening</h2>
          </div>
        </div>

        <div className="flex flex-1 relative">
          {/* Mobile sidebar overlay */}
          {isSidebarOpen && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
              onClick={toggleSidebar}
            ></div>
          )}
          
          {/* Left sidebar - hidden on mobile by default */}
          <div className={`w-64 border-r border-teal-400/30 p-6 absolute md:relative z-30 bg-black h-full transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}>
            <a
                href="https://github.com/himansyou"
                target="_blank"
                 rel="noopener noreferrer"
                className="flex items-center text-s font-medium hover:text-teal-400 transition-colors"
                >
  <img
    src="/githubb.png"
    alt="Socials Icon"
    className="w-6 h-6 mr-2 invert"
  />
visit my GitHub
</a>
           
          </div>

          {/* Main content */}
          <div className="flex-1 p-4 md:p-6 relative">
            {/* Mobile title */}
            <div className="md:hidden mb-6">
              <h2 className="text-2xl font-bold">URL Shortening</h2>
            </div>
            
            {/* URL input section */}
            <div className="mb-6 md:mb-10 relative">
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Enter the long URL"
                  className="flex-1 bg-transparent border border-teal-400/30 rounded-lg p-3 md:p-4 text-white"
                  value={longUrl}
                  onChange={(e) => setLongUrl(e.target.value)}
                />
                <button
                  onClick={handleShorten}
                  className="bg-teal-400 text-black font-medium px-6 py-3 md:px-8 md:py-4 rounded-lg hover:bg-teal-300 transition-colors"
                >
                  Shorten
                </button>
              </div>
            </div>
            

            {/* Shortened URLs table */}
            <div>
              <h3 className="text-xl md:text-3xl font-bold mb-4 md:mb-6">Shortened URLs</h3>
              <div className="border border-teal-400/30 rounded-lg overflow-x-auto">
                {/* Table for laptops screens */}
                <div className="hidden md:grid grid-cols-3 gap-6 bg-black border-b border-teal-400/30 p-4 font-medium">
                  <div>Short URL</div>
                  <div>Original URL</div>
                  <div>Visits</div>
                </div>

                {/* Table Content for laptops screens */}
                <div className="hidden md:block divide-y divide-teal-400/30">
                    {shortenedUrls.map((url, index) => (
                         <div key={index} className="grid grid-cols-[1fr_2fr_1fr_auto_auto] gap-8 items-center p-4">
                         <a href={`${backend}/${url.shortUrl}`} target="_blank" rel="noopener noreferrer">
                         <div className="text-teal-400">{backend}/{url.shortUrl}</div> </a>
                         <div className="truncate">{url.originalUrl}</div>
                         <div className='ml-24'>{url.count}</div>
                         <div className="flex gap-2 justify-end">
                           <button
                             onClick={() => deleteUrl(url.id)}
                             className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400 transition-colors"
                           >
                             Delete
                           </button>
                           <button
                             onClick={() => navigator.clipboard.writeText(`${backend}/${url.shortUrl}`)}
                             className="bg-teal-400 text-black font-medium px-4 py-2 rounded hover:bg-teal-300 transition-colors"
                           >
                             Copy
                           </button>
                         </div>
                       </div>
                       
                         ))}
                        </div>

                
                {/* Card layout for mobile */}
                <div className="md:hidden divide-y divide-teal-400/30">
                  {shortenedUrls.map((url, index) => (
                    <div key={index} className="p-4">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">Short URL:</span>
                        <a href={`${backend}/${url.shortUrl}`} target="_blank" rel="noopener noreferrer">
                        <span className="text-teal-400">{backend}/{url.shortUrl}</span></a>
                      </div>
                      <div className="mb-2">
                        <span className="font-medium">Original URL:</span>
                        <div className="truncate text-sm text-gray-300">{url.originalUrl}</div>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Visits:    {url.count}</span>
                        <button
                             onClick={() => deleteUrl(url.id)}
                             className="bg-red-500 text-white px-4 py-2 ml-35 rounded hover:bg-red-400 transition-colors"
                           >
                             Delete
                           </button>
                        <button className="bg-teal-400 text-black font-medium px-4 py-2 rounded-lg hover:bg-teal-300 transition-colors"
                          onClick={() => navigator.clipboard.writeText(`${backend}/${url.shortUrl}`)} >
                          Copy
                        </button>
                      </div>
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