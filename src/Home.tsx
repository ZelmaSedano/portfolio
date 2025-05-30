import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './App.css'

function Home() {
    const [isRotated, setIsRotated] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [currentMessage, setCurrentMessage] = useState('');
    // move window around
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const windowRef = useRef(null);
    // decides if something is visible on the page or not
    const [isVisible, setIsVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const messages = [
        "PSYCH!!"
    ];

    // button/PSYCH message
    const handleClick = () => {
        setIsRotated(!isRotated);
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        setCurrentMessage(randomMessage);
        setShowMessage(true);
    };
    useEffect(() => {
        // when something isn't working or is acting weird, console.log inside the function to test
        console.log('test useEffect')
        // declare a timer variable
        let timer;
        // if showMessage boolean is true, set timer to timeout after 5000 milliseconds
        if (showMessage) {
        timer = setTimeout(() => {
            setShowMessage(false);
        }, 1500);
        }
        return () => clearTimeout(timer);
    }, [showMessage]);

    // drag window
    // Check for mobile view on mount and resize
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkIfMobile(); // Initial check
        window.addEventListener('resize', checkIfMobile);
        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);
    
    // puts the window in the middle of viewport
    useEffect(() => {
        if (!isMobile && windowRef.current) {
            const windowWidth = windowRef.current.offsetWidth;
            const windowHeight = windowRef.current.offsetHeight;
            
            const centerX = (window.innerWidth - windowWidth) / 2;
            const centerY = (window.innerHeight - windowHeight) / 2;
            
            setPosition({
                x: centerX,
                y: centerY
            });
            setIsVisible(true);
        }
    }, [isMobile]); // re-run when mobile state changes

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
    // blocks the user from pulling window outside of viewport 
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
                {showMessage && (
                    <div className={`message ${showMessage ? 'visible' : ''}`}>
                    {currentMessage}
                    </div>
                )}
                <button
                    className={`rotate-button ${isRotated ? 'rotated' : ''}`}
                    onClick={handleClick}
                >
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
                            {/* you need this to ensure the button doesn't leave the url-bar when position:absolute is applied */}
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
                <p className='banner'>Welcome to my lil corner of the internet!</p>

                {/* BIO SECTION */}
                <div className='bio-section'>
                    <img src="/src/assets/mee.jpg" className='bio-image'></img>

                    <p className='bio-p'>This site is my homage to vintage web design. </p>
                </div>

                {/* CONTENT FOOTER */}
                {/* use the footer section for the border styling */}
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
                {/* end content section*/}
            </div>
        {/* end of window */}
        
        {/* Windows 98 Taskbar */}
        <div className="taskbar">
            <button className="start-button">
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

export default Home