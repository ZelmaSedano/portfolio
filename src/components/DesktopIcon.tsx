import './DesktopIcon.css';

interface DesktopIconProps {
    icon: string;
    label: string;
    x: number;
    y: number;
    onClick: () => void;
    className?: string;
    imgClassName?: string;
}

// try and make this the standard, too many varying react function declarations imho 
const DesktopIcon: React.FC<DesktopIconProps> = ({icon, label, x, y, onClick, className='', imgClassName = '',}) => {
    return (
        <div
        className={`desktop-icon ${className}`}
        style={{ position: 'absolute', left: x, top: y }}
        onClick={onClick}
        >
        <img src={icon} alt={label} className={imgClassName}/>
        <span>{label}</span>
        </div>
    );
}

export default DesktopIcon;