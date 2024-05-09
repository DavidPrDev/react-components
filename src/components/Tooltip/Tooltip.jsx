import React, { useEffect, useState } from 'react';
import './Tooltip.css';
import PropTypes from 'prop-types';

const Tooltip = ({ text, children, direction }) => {

    const [directionTooltip, setDirection] = useState(null);

    useEffect(() => {
        if (direction === 'top') {
            setDirection('top')
        } else if (direction === 'bottom') {
            setDirection('bottom')
        }
    }, [direction]);

    return (
        <div className="tooltip">
            {children}
            <span className={`tooltip-text ${directionTooltip}`}>{text}</span>
        </div>
    );
};
Tooltip.propTypes = {
    direction: PropTypes.oneOf(['top', 'bottom']).isRequired,
    children: PropTypes.node,
    text: PropTypes.string.isRequired,
};
export default Tooltip;
