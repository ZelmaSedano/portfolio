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

function Resume() {
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

    useEffect(() => {
    const timer = setInterval(() => {
        setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer); // Cleanup
}, []);

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
        if (
            e.target.closest('.blue-bar') && 
            !e.target.closest('.x-button')) {
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



    // RENDERED PART
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
                        <div className='cat-buttons'>
                            <button className='cat-button'>
                                Yes
                            </button>
                            <button className='cat-button'>
                                Yes, I do 
                            </button>
                        </div>
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
                <div className = 'url-bar'>
                    <div className = 'url-bar-small-1'>Address</div>
                    <div className = 'url-bar-large'>
                        <div className='dropdown-container'>
                            <div className='url-text'>http://www.geocities.com/valentia_is_best_dev</div>
                        </div>
                        <button className='url-dropdown-button'>▼</button>
                    </div>
                    <div className = 'url-bar-small-2'>Links</div>
                </div>
            </div>


            {/* Window Content */}
            <div className='resume-content'>
                <div className="resume-container">
                    <div className='resume-column-1'>
                        <div className='top-resume-column-1'>
                            <img src='/src/assets/_.jpeg' className='gif'></img>
                        </div>
                        <div className='middle-resume-column-1'>
                            <div className='stats-section-text'>
                                <p className='resume-blue-text'>NAME:</p>
                                <p className='resume-big-black-text'>Valentia Sedano</p>
                            </div>
                            <div className='stats-section-text'>
                                <p className='resume-blue-text'>LOCATION:</p>
                                <p className='resume-big-black-text'>Chicagoland, USA</p>
                            </div>
                            <div className='stats-section-text'>
                                <p className='resume-blue-text'>EMAIL:</p>
                                <p className='resume-big-black-text'>zvsedano@gmail.com</p>
                            </div>
                            <div className='stats-section-text'>
                                <p className='resume-blue-text'>MOBILE:</p>
                                <p className='resume-big-black-text'>+1 (224) 482-8189</p>
                            </div>
                        </div>
                        <div className='bottom-resume-column-1'>
                            <p className='resume-about-section'>
                                <p className='resume-about-title'>ABOUT</p>
                                <p className='resume-about-text'>Passionate about both design and development, Valentia is someone who is able to inspire devs & clients alike</p>
                            </p>
                        </div>
                    </div>
                    <div className='resume-column-2'>
                        <p className='employment-title'>EMPLOYMENT HISTORY</p>

                        <p className='employment-job-title'><span className='job-title-underline'>Software Engineer I</span> - (2025-present)</p>
                        <p className='employment-job-location'>WebCraft Labs - Austin, TX</p>
                        <ul>
                            <li className='employment-job-description'>Craft seamless digital experiences that balance functionality with visual appeal. Manage all CI/CD, testing, and maintenance for primary web app.</li>
                        </ul>
                        <p className='employment-job-title'><span className='job-title-underline'>Associate Software Engineer</span> - (2021-2025)</p>
                        <p className='employment-job-location'>Sony PlayStation - San Francisco, CA</p>
                        <ul>
                            <li className='employment-job-description'>Contribute features, maintain, and test client-side web applications</li>
                            <li className='employment-job-description-1'>Identify test cases and testing strategies for the PS5 console using PyTest. Utilize technologies such as WebDrivers & XPATH to test the UI of the console.</li>
                        </ul>

                    </div>

                    <div className='resume-column-3'>
                        <div className='top-resume-column-3'>
                            <p className='education-title'>EDUCATION</p>
                            
                            <div>
                                <p className='education-title-text'><span className='job-title-underline'>Techtonica</span> | Engineering Certificate - 2021</p>
                                <p className='education-title-text'><span className='job-title-underline'>Ole Miss</span> | B.A. in Psychology - 2011</p>
                            </div>
                        </div>
                        <div className='middle-resume-column-3'>
                            <img src='/src/assets/world.gif' className='obra-dinn'></img>
                        </div>
                        <div className='bottom-resume-column-3'>
                            <p className='resume-about-section'>
                                <p className='resume-about-title'>SKILLS</p>
                                <div className='skills'>
                                    <ul className='unordered-list'>
                                        <li>React.js</li>
                                        <li>TypeScript</li>
                                        <li>Jest</li>
                                    </ul>
                                    <ul className='unordered-list'>
                                        <li>Redux.js</li>
                                        <li>Python</li>
                                        <li>PyTest</li>
                                    </ul>
                                    <ul className='unordered-list'>
                                        <li>Git</li>
                                        <li>SQL</li>
                                    </ul>
                                </div>
                            </p>
                        </div>
                    </div>
                    
                </div>
            </div>

                {/* CONTENT FOOTER */}
                <div className="footer">
                    <div className='footer-section footer-large'></div>
                    <div className = 'footer-section footer-small'></div>
                    <div className = 'footer-section footer-small'></div>
                    <div className = 'footer-section footer-small'></div>
                    <div className='footer-section footer-medium'>
                        <img src="/src/assets/earth.ico" className='content-footer-icon'></img>
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

export default Resume;