import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import './App.css';

function Contact() {
    // 1. State initialization with proper defaults
    const [position, setPosition] = useState(() => {
        const saved = sessionStorage.getItem('windowPosition');
        return saved ? JSON.parse(saved) : { 
            x: Math.max(0, (window.innerWidth - 800) / 2),
            y: Math.max(0, (window.innerHeight - 600) / 2)
        };
    });

    const [currentTime, setCurrentTime] = useState(new Date());
    const [isVisible, setIsVisible] = useState(true);
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const windowRef = useRef(null);

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
                                <label htmlFor="to" className='to-label'>To...</label> 
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
                                <label htmlFor="from" className='from-label'>From...</label>
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
                                <label htmlFor="subject" className='subject-label'> Subject:</label>
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
                                <label htmlFor="message">Message:</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                    className="form-textarea"
                                    placeholder="Type your message here..."
                                    rows="6" // this determines how many lines the box takes up
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
                        {currentTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Contact;