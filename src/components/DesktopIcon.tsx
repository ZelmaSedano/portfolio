import './DesktopIcon.css';

interface DesktopIconProps {
    icon: string;
    label: string;
    x: number;
    y: number;
    onClick: () => void;
}

// try and make this the standard, too many varying react function declarations imho 
const DesktopIcon: React.FC<DesktopIconProps> = ({icon, label, x, y, onClick}) => {
    return (
        <div
        className="desktop-icon"
        style={{ position: 'absolute', left: x, top: y }}
        onClick={onClick}
        >
        <img src={icon} alt={label} />
        <span>{label}</span>
        </div>
    );
}

export default DesktopIcon;