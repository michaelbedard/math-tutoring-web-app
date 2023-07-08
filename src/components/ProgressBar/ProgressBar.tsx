import React from 'react';
import "./ProgressBar.css"

interface ProgressBarProps {
    percentage: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage }) => {
    return (
        <div className="progress-bar">
            <div
                className="progress-bar__fill"
                style={{ width: `${percentage}%` }}
            ></div>
        </div>
    );
};

export default ProgressBar;