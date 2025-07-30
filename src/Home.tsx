import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

import wassup from './assets/wassup.gif'

// hi justine, feel free to look at the comments in the modal section to learn more about how to render modals.  the component is in DesktopIcon.tsx :)

// component imports
import Taskbar from './components/Taskbar'
import './components/Taskbar.css'
import DesktopIcon from './components/DesktopIcon';
import './components/DesktopIcon.css'; // contains both icon + modal styles

function Home() {
    // JUSTINE: useRef is used to access DOM nodes, this line initiates a useRef hook with the value of null
    const windowRef = useRef(null);
    // states
    const [position, setPosition] = useState(() => {
        const saved = sessionStorage.getItem('windowPosition');
        // if there isn't a saved position, center the window on default load
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
    


    // save the position of the window to session storage
    useEffect(() => {
        sessionStorage.setItem('windowPosition', JSON.stringify(position));
    }, [position]);

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, dragOffset]);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer); // Cleanup
    }, []);

    // event handler functions
    const handleMouseDown = (e) => {
        if (
            e.target.closest('.blue-bar') && 
            !e.target.closest('.x-button')) {
            setIsDragging(true);
            // gets the draggable window's current position/size via the DOM ref
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
                            <span>I know what you did last summer</span>
                            <button className='x-button' onClick={() => setShowHoroscopeModal(false)}>✕</button>
                        </div>

                        <div className="modal-body">
                            test
                        </div>
                        </div>
                    </div>
                )}
            </div>

            {/* if isVisible is true, */}
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
            <Taskbar 
                isVisible={isVisible} 
                toggleWindow={toggleWindow}
                currentTime={currentTime}
            />
        </>
    );
}

export default Home;