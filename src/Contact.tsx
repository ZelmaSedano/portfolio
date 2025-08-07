import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
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

function Contact() {
    // states
    const windowRef = useRef(null);
    // states
    const [position, setPosition] = useState(() => {
        const saved = sessionStorage.getItem('windowPosition');
        return saved ? JSON.parse(saved) : { 
            x: Math.max(0, (window.innerWidth - 1000) / 2),
            y: Math.max(0, (window.innerHeight - 600) / 2)
        };
    });
    // timer state
    const [currentTime, setCurrentTime] = useState(new Date());
    // toggle state
    const [isVisible, setIsVisible] = useState(true);
    // dragging state
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

    // contact window size state - check size of window to resize textarea
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    // useEffects - 'save state to session storage'?
    // window position - window loads in middle of page
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
    // contact window size - resize textarea
    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
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

    // Calculate available height for textarea
    const calculateTextareaHeight = () => {
        // These are approximate values for header, form elements, etc.
        const otherElementsHeight = 300; 
        const minHeight = 180;
        
        // Calculate available height
        const availableHeight = windowSize.height - otherElementsHeight - position.y;
        
        // Return the larger of available height or minimum height
        return Math.max(minHeight, availableHeight);
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

    // form with useful comments
    const [formData, setFormData] = useState({
    to: 'webcraftian.laboratory@gmail.com',
    from: '',
    subject: '',
    message: ''
    });

    // new state for loading indicator
    const [isSending, setIsSending] = useState(false); 

    // handle input changes in the form fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // handle form submission - added emailjs code to actually send email
    const handleSubmit = (e) => {
        e.preventDefault();
        
        emailjs.send(
            'service_fiblai5',
            'template_bzci6ho',
            {
            to_email: 'webcraftian.laboratory@gmail.com',
            from_email: formData.from,
            subject: formData.subject,
            message: formData.message
            },
            'kM5UXATQMVrLI690I'
        )
        .then(() => alert("Email sent to webcraftian.laboratory@gmail.com!"))
        .catch((err) => console.error("Failed to send:", err)); // log the error
    };


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
                        <span>Question...</span>
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
            {/* actual window content */}
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
                    <div className='contact-content'>
                        <form onSubmit={handleSubmit} className="contact-form">
                            {/* First row - Recipient email (read-only) */}
                            <div className="form-row">
                                <label htmlFor="to" className='to-label'>T<span className='underline'>o.</span>..</label> 
                                <input
                                    type="email"
                                    id="to"
                                    name="to"
                                    value={formData.to}
                                    onChange={handleInputChange}
                                    readOnly
                                    className="form-input"
                                />
                            </div>
                            
                            {/* Second row - Sender email */}
                            <div className="form-row">
                                <label htmlFor="from" className='from-label'><span className='underline'>F</span>rom...</label>
                                <input
                                    type="email"
                                    id="from"
                                    name="from"
                                    value={formData.from}
                                    onChange={handleInputChange}
                                    required                   // ** field required **
                                    className="form-input"
                                    placeholder="Your email address"  
                                />
                            </div>
                            
                            {/* Third row - Email subject */}
                            <div className="form-row">
                                <label htmlFor="subject" className='subject-label'> S<span className='underline'>u</span>bject:</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    required
                                    className="form-input"
                                    placeholder="Message subject"
                                />
                            </div>
                            
                            {/* Fourth row - Message body */}
                            <div className="form-row">
                                <label htmlFor="message" className='message-label'>
                                    <span className='underline'>M</span>essage:</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                    className="form-textarea"
                                    placeholder="Type your message here..."
                                    style={{ height: `${calculateTextareaHeight()}px` }}
                                />
                            </div>
                            
                            {/* Submit button row */}
                            <div className="form-button">
                                <button 
                                    type="submit" 
                                    className="send-button"
                                    disabled={isSending}
                                >
                                    {isSending ? (
                                        'Sending...'
                                    ) : (
                                        <>
                                            <img src="/src/assets/send.png" className="send-icon" alt="Send"/>
                                            Send
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>

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
                    {/* contact-content */}
                    </div>
                {/* window */}
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

export default Contact;