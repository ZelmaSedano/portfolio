import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './App.css';

import Taskbar from './components/Taskbar'
import './components/Taskbar.css'
import DesktopIcon from './components/DesktopIcon';
import './components/DesktopIcon.css';


function Portfolio() {
    const windowRef = useRef(null);
    const location = useLocation();


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
    const [showYesModal, setShowYesModal] = useState(false);
    const [showLoveModal, setShowLoveModal] = useState(false);

    const [showScreamModal, setShowScreamModal] = useState(false);


    // save the state to sessionStorage
    useEffect(() => {
        sessionStorage.setItem('windowPosition', JSON.stringify(position));
    }, [position]);
    // timer
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer); // Cleanup
    }, []);
    // event listeners
    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, dragOffset]);


    // mouse event handlers
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


    // toggle visibility
    const toggleWindow = () => setIsVisible(!isVisible);

    const images = [
        {
            title:'WebCraft Labs',
            id: 'webcraft_labs',
            url: 'https://www.figma.com/design/229APkMFR2DqP819VYDmyY/WebCraft?m=auto&t=vZjGYwJcDZPGZLwW-1' // Keep url for external links
        },
        {
            title:'Personal Projects',
            id: 'scandique',
            url: 'https://www.pinterest.com/pin/9077636744660963/' // Keep url for external links
        },
        {
            title:'UX/UI Design',
            id: 'webcraft_labs',
            url: 'https://www.pinterest.com/pin/9077636744660963/' // Keep url for external links
        },
        {
            title:'Testing & Python',
            id: 'AI',
            url: 'https://www.pinterest.com/pin/9077636744660963/'
        }
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
                y={75}
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
                            <button 
                                className='cat-button'
                                onClick={() => {
                                    setShowCatModal(false);
                                    setShowYesModal(true);
                                }}
                            >
                                Yes
                            </button>
                            <button 
                                    className='cat-button'
                                    onClick={() => {
                                        setShowCatModal(false);
                                        setShowLoveModal(true);
                                    }}
                            >
                                Yes, I do 
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
        {/* define what showYesModal is */}
            {showYesModal && (
                <div className="modal-overlay" onClick={() => setShowYesModal(false)}>
                    <div className="modal cat-response-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <span>Smart Answer</span>
                            <button className='x-button' onClick={() => setShowYesModal(false)}>✕</button>
                        </div>
                        <div className="modal-body">
                            <div className="image-container">
                                <img src="/src/assets/evil_cat.gif" alt="evil_cat" />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showLoveModal && (
                <div className="modal-overlay" onClick={() => setShowLoveModal(false)}>
                    <div className="modal cat-response-modals" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <span>That's right, MINION</span>
                            <button className='x-button' onClick={() => setShowLoveModal(false)}>✕</button>
                        </div>
                        <div className="modal-body">
                            <div className="image-container">
                                <img src="/src/assets/evil_cat.gif" alt="evil_cat" />
                            </div>
                        </div>
                    </div>
                </div>
            )}

        {/* scream icon */}
            <div className="desktop">
                <DesktopIcon
                    icon="/src/assets/scream.png"
                    label="RING RING"
                    x={50}
                    y={175}
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
                {/* header */}
                <header>
                    <section className='blue-bar'>
                        <img src="/src/assets/connections.ico" className='icon' alt="icon"/>
                        <section className='blue-bar-text'>DevScape - Valentia Sedano</section>
                        <div className="button-container">
                            <button className='x-button' onClick={toggleWindow}>✕</button>
                        </div>
                    </section>

                    {/* navbar */}
                    <nav className='navbar'>
                        <ul>
                            <li className='button left-button'>
                                <Link to="/">
                                    <img src="/src/assets/Starfield.ico" className='home-icon' alt="home"/>
                                    <p>Home</p>
                                </Link>
                            </li>
                            <li className={`button ${location.pathname === '/portfolio' ? 'active-portfolio' : ''}`}>
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
                                <Link to="/about">
                                    <img src="/src/assets/resume.png" className='resume-icon' alt='about'></img>
                                    <p>About</p>
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

                {/* URL bar */}
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

                {/* window content */}
                <div className='content'>
                    {/* <div className='portfolio-banner'>PORTFOLIO</div> */}

                    <div className="img-grid">
                        {images.map((image, index) => (
                            <div key={index}>
                                <div className='image-container'>
                                    <div className='image-title'>{image.title}</div>

                                    <a href={image.url} target="_blank" rel="noopener noreferrer">
                                        <img
                                            src={`/src/assets/${image.id}.jpg`}
                                            title={`${image.id} website`}
                                            style={{ width: '320px', height: '180px' }}
                                            alt={image.id}
                                            className='image clickable-image'
                                        />
                                    </a>
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

        {/* taskbar */}
        <Taskbar 
            isVisible={isVisible} 
            toggleWindow={toggleWindow}
            currentTime={currentTime}
        />
    </>
);
}

export default Portfolio;