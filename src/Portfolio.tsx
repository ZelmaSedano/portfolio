import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './App.css'

function Portfolio() {
    // move window around
    const [position, setPosition] = useState(() => {
    if (typeof window !== 'undefined') {
        const savedPosition = sessionStorage.getItem('windowPosition');
        if (savedPosition) {
            return JSON.parse(savedPosition);
        }
    }
    return { x: 0, y: 0 }; // Default if no saved position
    });
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const windowRef = useRef(null);
    // decides if something is visible on the page or not
    const [isVisible, setIsVisible] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    // ==================== NEW CODE START ====================
    // 1. Load saved position from sessionStorage on initial render
    useEffect(() => {
        const savedPosition = sessionStorage.getItem('windowPosition');
        if (savedPosition && !isMobile) {
            setPosition(JSON.parse(savedPosition));
        }
    }, [isMobile]);

    // 2. Save position to sessionStorage whenever it changes
    useEffect(() => {
        if (!isMobile) {
            sessionStorage.setItem('windowPosition', JSON.stringify(position));
        }
    }, [position, isMobile]);
    // ==================== NEW CODE END ====================

    // button/PSYCH message
    const handleClick = () => {
        setIsVisible(false);
        console.log('working')
    };
    
    // puts the window in the middle of viewport
    useEffect(() => {
        if (!isMobile && windowRef.current) {
            const windowWidth = windowRef.current.offsetWidth;
            const windowHeight = windowRef.current.offsetHeight;
            
            // ==================== MODIFIED CODE START ====================
            // Only center if position is at origin (0,0)
            if (position.x === 0 && position.y === 0) {
                const centerX = (window.innerWidth - windowWidth) / 2;
                const centerY = (window.innerHeight - windowHeight) / 2;
                
                setPosition({
                    x: centerX,
                    y: centerY
                });
            }
            // ==================== MODIFIED CODE END ====================
            setIsVisible(true);
        }
    }, [isMobile, position]); // Added position to dependencies

    // handle when the user clicks blue-bar
    const handleMouseDown = (e) => {
        if (!isMobile && e.target.closest('.blue-bar') && !e.target.closest('.rotate-button')) {
            setIsDragging(true);
            const rect = windowRef.current.getBoundingClientRect();
            setDragOffset({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            });
        }
    };

    // handle the movement of the mouse
    const handleMouseMove = (e) => {
        if (isDragging && windowRef.current) {
            const windowWidth = windowRef.current.offsetWidth;
            const windowHeight = windowRef.current.offsetHeight;
            
            // Calculate new position with boundaries
            let newX = e.clientX - dragOffset.x;
            let newY = e.clientY - dragOffset.y;
            
            // Constrain to viewport boundaries
            newX = Math.max(0, Math.min(newX, window.innerWidth - windowWidth));
            newY = Math.max(0, Math.min(newY, window.innerHeight - windowHeight));
            
            setPosition({
                x: newX,
                y: newY
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        } else {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, dragOffset]);

    return (
        <>
        <div className={`window ${isVisible ? 'visible' : ''}`}
            ref={windowRef}
                style={!isMobile ? {
                    position: 'absolute',
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    cursor: isDragging ? 'grabbing' : 'default'
                } : undefined }
                onMouseDown={isMobile ? undefined : handleMouseDown}
            >
            {/* HEADER */}
            <header>
                <section className='blue-bar'>
                    <img src="/src/assets/connections.ico" className='icon'></img>
                    <section className='blue-bar-text'>Valentia Sedano</section>

                    {/* ROTATING BUTTON */}
                    <div className="button-container">
                        <button className= 'x-button' onClick={handleClick}>
                            ✕
                        </button>
                    </div>
                </section>

                {/* NAVBAR */}
                <nav className='navbar'>
                    <ul>
                        <li className='button left-button'>
                            <Link to="/">
                                <img src="/src/assets/Starfield.ico" className='home-icon'></img>
                                <p>Home</p>
                            </Link>
                        </li>
                        <li className='button'>
                            <Link to="/portfolio">
                                <img src="/src/assets/painting.ico" className='paint-icon'></img>
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
            
            {/* CONTENT */}
            <div className='content'>
                <p className='banner'>Welcome to my Portfolio!</p>

                {/* PORTFOLIO CONTENT WOULD GO HERE */}
                <div className='portfolio-items'>
                    {/* Your portfolio items would be rendered here */}
                    <p>Portfolio items coming soon!</p>
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
        
        {/* Windows 98 Taskbar */}
        <div className="taskbar">
            <button className="start-button" onClick={() => setIsVisible(true)}>
                <img src="/src/assets/flag.png" className="start-icon"></img>
                <span className="start-text">Start</span>
            </button>
            <div className="taskbar-items">
                <div className="taskbar-item">test</div>
                <div className="clock">
                    {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
            </div>
        </div>
        </>
    )
}

export default Portfolio