import React, { useEffect, useState } from 'react';
import './Tooltip.css';

const Tooltip = ({ text, children, direction }) => {

    const [directionTooltip, setDirection] = useState(null);

    useEffect(() => {
        if (direction === 'top') {
            setDirection('top')
        } else if (direction === 'bottom') {
            setDirection('bottom')
        }
    }, []);
    return (
        <div className="tooltip">
            {children}
            <span className={`tooltip-text ${directionTooltip}`}>{text}</span>
        </div>
    );
};

export default Tooltip;
