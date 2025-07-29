import React, { useState, useRef, useEffect } from 'react';

interface TaskbarProps {
    isVisible: boolean;
    toggleWindow: () => void;
    currentTime: Date;
}

const Taskbar: React.FC<TaskbarProps> = ({isVisible, toggleWindow, currentTime}) => {
    // states 
    // is menu open?
    const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
    // useRefs can access DOM nodes directly
    const startMenuRef = useRef<HTMLDivElement>(null);
    const startButtonRef = useRef<HTMLButtonElement>(null);

    // close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                startMenuRef.current && 
                !startMenuRef.current.contains(event.target as Node) &&
                startButtonRef.current &&
                !startButtonRef.current.contains(event.target as Node)
            ) {
                setIsStartMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // event handlers
    const toggleStartMenu = () => {
        setIsStartMenuOpen(!isStartMenuOpen);
    };


    return (
        <div className="taskbar">
            <button 
                ref={startButtonRef}
                className={`start-button ${isStartMenuOpen ? 'active' : ''}`}
                onClick={toggleStartMenu}
            >
                <img src="/src/assets/flag.png" className="start-icon" alt="start"/>
                <span className="start-text">Start</span>
            </button>

            {isStartMenuOpen && (
                <div ref={startMenuRef} className="start-menu">
                    <div className="start-menu-items">
                        <div className="start-menu-item"><span className='underline'>L</span>inkedIn</div>
                        <div className="start-menu-item"><span className='underline'>G</span>itHub</div>
                        <div className="start-menu-item"><span className='underline'>W</span>ebCraftian Labs</div>
                    </div>
                </div>
            )}

            <div className='devscape-section'>
                <button 
                className={`devscape-button ${isVisible ? 'window-visible' : ''}`}
                onClick={toggleWindow}
                >
                <img src="/src/assets/connections.ico" className='connections-icon' alt="icon"/>
                <span className="devscape-text">DevScape</span>
                </button>
            </div>

            <div className="taskbar-items">
                <div className="clock">
                {currentTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
            </div>
        </div>
    )
}

export default Taskbar;