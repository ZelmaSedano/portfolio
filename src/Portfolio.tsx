import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

import Taskbar from './components/Taskbar'
import './components/Taskbar.css'
import DesktopIcon from './components/DesktopIcon';
import './components/DesktopIcon.css'; // contains both icon + modal 

type HoroscopeData = {
    data: {
        date: string;
        horoscope_data: string;
    };
};
function Portfolio() {
    // 1. State initialization with proper defaults
    const windowRef = useRef(null);
    // states
    const [position, setPosition] = useState(() => {
        const saved = sessionStorage.getItem('windowPosition');
        return saved ? JSON.parse(saved) : { 
            x: Math.max(0, (window.innerWidth - 1000) / 2),
            y: Math.max(0, (window.innerHeight - 600) / 2)
        };
    });

    const [currentTime, setCurrentTime] = useState(new Date());
    const [isVisible, setIsVisible] = useState(true);
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [showCatModal, setShowCatModal] = useState(false);
    const [showScreamModal, setShowScreamModal] = useState(false);
    const [showHoroscopeModal, setShowHoroscopeModal] = useState(false);
    // horoscope API states
    const [horoscopeData, setHoroscopeData] = useState<HoroscopeData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [sign, setSign] = useState('aries'); // Default sign

    // 2. Save state to sessionStorage
    useEffect(() => {
        sessionStorage.setItem('windowPosition', JSON.stringify(position));
    }, [position]);

    // fetch - VITE WAS BLOCKING THIS FROM WORKING, REMEMBER TO UPDATE VITE.CONFIG NEXT
    const fetchHoroscope = async (sign: string) => {
        setIsLoading(true);
        setError(null);
        
        try {
            const response = await fetch(`/api/horoscope?sign=${sign.toLowerCase()}`); // <-- No full URL needed
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const data = await response.json();
            setHoroscopeData(data);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Failed to fetch horoscope";
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGetHoroscope = () => {
    fetchHoroscope(sign);
    };



    // 3. Mouse event handlers
    const handleMouseDown = (e) => {
        if (e.target.closest('.blue-bar') && !e.target.closest('.x-button')) {
            setIsDragging(true);
            const rect = windowRef.current.getBoundingClientRect();
            setDragOffset({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            });
        }
    };

    const handleMouseMove = (e) => {
        if (isDragging && windowRef.current) {
            const newX = e.clientX - dragOffset.x;
            const newY = e.clientY - dragOffset.y;
            const { offsetWidth, offsetHeight } = windowRef.current;
            
            setPosition({
                x: Math.max(0, Math.min(newX, window.innerWidth - offsetWidth)),
                y: Math.max(0, Math.min(newY, window.innerHeight - offsetHeight))
            });
        }
    };

    const handleMouseUp = () => setIsDragging(false);

    // 4. Event listeners
    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, dragOffset]);

    // 5. Toggle visibility
    const toggleWindow = () => setIsVisible(!isVisible);

    const images = [
    'me', // Example video ID
    'mee',
    'me',
    'mee',
    'me',
    'mee',
    ];

    return (
    <>
         {/* cat icon */}
                    <div className="desktop">
                        {/* when you click the desktop icon, setShowModal is set to true */}
                        <DesktopIcon
                            icon="/src/assets/cat.png"
                            label="meowdy"
                            x={50}
                            y={100}
                            onClick={() => setShowCatModal(true)}
                        />
        
                        {showCatModal && (
                            <div className="modal-overlay" onClick={() => setShowCatModal(false)}>{/* when the user clicks again, setShowModal is set to false (modal isn't shown) */}
                            {/* if you click inside the modal, then setShowModal ISN'T set to false */}
                            {/* onClick takes the event, and returns 'don't propogate this event' function */}
                            <div className="modal" onClick={(e) => e.stopPropagation()}>
                                <div className="modal-header">
                                    {/* modal header text */}
                                    <span>Question...</span>
                                    {/* 'x' close button */}
                                    <button className='x-button' onClick={() => setShowCatModal(false)}>✕</button>
                                </div>
                                {/* body of modal */}
                                <div className="modal-body">Do you like cats?</div>
                                {/* CHALLENGE: add two buttons to this modal, 'yes', and 'I love them!', and return a message to the user based on their selection */}
                                </div>
                            </div>
                        )}
                    </div>
        
                    {/* scream icon */}
                    <div className="desktop">
                        <DesktopIcon
                            icon="/src/assets/scream.png"
                            label="RING RING"
                            x={50}
                            y={200}
                            onClick={() => setShowScreamModal(true)}
                        />
        
                        {showScreamModal && (
                            <div className="modal-overlay" onClick={() => setShowScreamModal(false)}>
        
                            <div className="modal" onClick={(e) => e.stopPropagation()}>
                                <div className="modal-header">
                                    <span>I know what you did last summer</span>
                                    <button className='x-button' onClick={() => setShowScreamModal(false)}>✕</button>
                                </div>
        
                                <div className="modal-body">
                                    <img src='/src/assets/wassup.gif' className='gif'></img>
                                </div>
                                </div>
                            </div>
                        )}
                    </div>
        
                    {/* horoscope icon */}
                    <div className="desktop">
                        <DesktopIcon
                            icon="/src/assets/crystal_ball.png"
                            label="horoscope"
                            x={50}
                            y={300}
                            onClick={() => setShowHoroscopeModal(true)}
                            className=''
                            imgClassName='horoscope-icon'
                        />
        
                        {showHoroscopeModal && (
                            <div className="modal-overlay" onClick={() => setShowHoroscopeModal(false)}>
                                <div className="modal" onClick={(e) => e.stopPropagation()}>
                                <div className="modal-header">
                                    <span>Your Horoscope</span>
                                    <button className='x-button' onClick={() => setShowHoroscopeModal(false)}>✕</button>
                                </div>
                                <div className="modal-body">
                                    <div className="horoscope-controls">
                                    <select 
                                        value={sign} 
                                        onChange={(e) => setSign(e.target.value)}
                                        className="horoscope-select"
                                    >
                                        {["aries", "taurus", "gemini", "cancer", "leo", "virgo", "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"].map((sign) => (
                                        <option key={sign} value={sign}>
                                            {sign.charAt(0).toUpperCase() + sign.slice(1)}
                                        </option>
                                        ))}
                                    </select>
                                    
                                    <button 
                                        onClick={handleGetHoroscope}
                                        className="horoscope-button"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? "Loading..." : "Get Horoscope"}
                                    </button>
                                    </div>
        
                                    {error && <div className="error">{error}</div>}
        
                                    {horoscopeData && (
                                    <div className="horoscope-results">
                                        <h3>{sign.charAt(0).toUpperCase() + sign.slice(1)}</h3>
                                        <p><strong>Date:</strong> {horoscopeData.data.date}</p>
                                        <p><strong>Horoscope Data:</strong> {horoscopeData.data.horoscope_data}</p>
                                    </div>
                                    )}
                                </div>
                                </div>
                            </div>
                            )}
                    </div>
        {isVisible && (
            <div 
                className={`window ${isVisible ? 'visible' : ''}`}
                ref={windowRef}
                style={{
                    position: 'absolute',
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    cursor: isDragging ? 'grabbing' : 'default'
                }}
                onMouseDown={handleMouseDown}
            >
                {/* HEADER */}
                <header>
                    <section className='blue-bar'>
                        <img src="/src/assets/connections.ico" className='icon' alt="icon"/>
                        <section className='blue-bar-text'>DevScape - Valentia Sedano</section>
                        <div className="button-container">
                            <button className='x-button' onClick={toggleWindow}>✕</button>
                        </div>
                    </section>

                    {/* NAVBAR */}
                    <nav className='navbar'>
                        <ul>
                            <li className='button left-button'>
                                <Link to="/">
                                    <img src="/src/assets/Starfield.ico" className='home-icon' alt="home"/>
                                    <p>Home</p>
                                </Link>
                            </li>
                            <li className='button'>
                                <Link to="/portfolio">
                                    <img src="/src/assets/painting.ico" className='paint-icon' alt="portfolio"/>
                                    <p>Portfolio</p>
                                </Link>
                            </li>
                            <li className='button'>
                                    <Link to="/resume">
                                        <img src="/src/assets/resume.png" className='resume-icon'></img>
                                        <p>Resume</p>
                                    </Link>
                            </li>
                            <li className='button'>
                                <Link to="/contact">
                                        <img src="/src/assets/send.png" className='contact-icon'></img>
                                        <p>Contact</p>
                                </Link>
                            </li>   
                        </ul>
                    </nav>
                </header>

                {/* URL BAR*/}
                <div className='url-container'>
                    <div className='url-bar'>
                        <div className='url-bar-small-1'>Address</div>
                        <div className='url-bar-large'>
                            <div className='dropdown-container'>
                                <div className='url-text'>http://www.geocities.com/valentia_is_best_dev</div>
                            </div>
                            <button className='url-dropdown-button'>▼</button>
                        </div>
                        <div className='url-bar-small-2'>Links</div>
                    </div>
                </div>

                {/* Window Content */}
                <div className='content'>

                    <div className="img-grid">
                        {images.map((videoId, index) => (
                            <div key={index}>
                                <div className='image-container' key={index}>
                                    <div className='image-title'>{`${videoId}`}</div>
                                        <img
                                            src={`/src/assets/${videoId}.jpg`}
                                            title={`${videoId} website`}
                                            style={{ width: '320px', height: '180px' }}
                                            alt={`YouTube video thumbnail ${index}`}
                                            className='image'
                                        />
                                    </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* CONTENT FOOTER */}
                <div className="footer">
                    <div className='footer-section footer-large'></div>
                    <div className='footer-section footer-small'></div>
                    <div className='footer-section footer-small'></div>
                    <div className='footer-section footer-small'></div>
                    <div className='footer-section footer-medium'>
                        <img src="/src/assets/earth.ico" className='content-footer-icon' alt="internet"/>
                        <p className='footer-section-text'>Internet</p>
                    </div>
                </div>
            </div>
        )}

        {/* Taskbar */}
        <Taskbar 
            isVisible={isVisible} 
            toggleWindow={toggleWindow}
            currentTime={currentTime}
        />
    </>
);
}

export default Portfolio;