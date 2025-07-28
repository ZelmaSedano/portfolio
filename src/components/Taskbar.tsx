import React from 'react';

interface TaskbarProps {
    isVisible: boolean;
    toggleWindow: () => void;
    currentTime: Date;
}

const Taskbar: React.FC<TaskbarProps> = ({isVisible, toggleWindow, currentTime}) => {
    return (
        <div className="taskbar">
            <button className="start-button">
                <img src="/src/assets/flag.png" className="start-icon" alt="start"/>
                <span className="start-text">Start</span>
            </button>

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