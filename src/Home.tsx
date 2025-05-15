import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './App.css'

function Home() {
    const [isRotated, setIsRotated] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [currentMessage, setCurrentMessage] = useState('');

    const messages = [
        "PSYCH!!"
    ];

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
        }, 3000);
        }
        return () => clearTimeout(timer);
    }, [showMessage]);

    
    return (
        <>
        <div className="window">
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

            {/* navbar */}
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
        </>
    )
}

export default Home