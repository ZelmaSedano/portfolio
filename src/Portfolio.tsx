import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function Portfolio() {
    // 1. State initialization with proper defaults
    const [position, setPosition] = useState(() => {
        const saved = sessionStorage.getItem('windowPosition');
        return saved ? JSON.parse(saved) : { 
            x: Math.max(0, (window.innerWidth - 800) / 2),
            y: Math.max(0, (window.innerHeight - 600) / 2)
        };
    });

    const [isVisible, setIsVisible] = useState(true);
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const windowRef = useRef(null);

    // 2. Save state to sessionStorage
    useEffect(() => {
        sessionStorage.setItem('windowPosition', JSON.stringify(position));
    }, [position]);

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

    return (
        <>
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
                            <section className='blue-bar-text'>Valentia Sedano</section>

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
                                <li className='button'><a>
                                    <img src="/src/assets/resume.png" className='resume-icon'></img>
                                    <p>Resume</p>
                                </a></li>
                                <li className='button'><a>
                                    <img src="/src/assets/send.png" className='contact-icon'></img>
                                    <p>Contact</p>
                                </a></li>   
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
                    <div className='content'>
                        <p className='banner'>Welcome to my lil corner of the internet!</p>
                        <div className='bio-section'>
                            <img src="/src/assets/mee.jpg" className='bio-image' alt="bio"/>
                            <p className='bio-p'>This site is my homage to vintage web design.</p>
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
                </div>
            )}

            {/* Taskbar */}
            <div className="taskbar">
                <button className="start-button" onClick={toggleWindow}>
                    <img src="/src/assets/flag.png" className="start-icon" alt="start"/>
                    <span className="start-text">Start</span>
                </button>
                <div className="taskbar-items">
                    <div className="clock">
                        {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Portfolio;