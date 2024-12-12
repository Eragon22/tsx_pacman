import React, { useState, useEffect, useRef } from 'react';

import './CenterPane.less';
import Title from './center/Title';
import Toplist from './center/toplist/Toplist';
import GameCanvas from './center/game/GameCanvas';

interface CenterPaneProps {
    className?: string;
}

/**
 * CenterPane component renders the main content area of the application.
 * It includes a title, a start button, and a difficulty slider.
 * When the start button is clicked, the game canvas is displayed.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.className=''] - Optional additional class name for the component.
 *
 * @returns {JSX.Element} The rendered CenterPane component.
 */
export default function CenterPane({ className = '' }: CenterPaneProps) {
    const [hideElement, setHideElement] = useState<string | null>(null);
    const gameContainerRef = useRef<HTMLDivElement>(null);

    const handleClick = (element: string) => {
        setHideElement(element);
    };

    const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = (e.target as HTMLInputElement).value;
        localStorage.setItem('speed', value);
        const difficultySliderLabel = document.querySelector('.difficultySliderLabel');
        if (difficultySliderLabel) {
            difficultySliderLabel.textContent = `Difficulty: [${value}]`;
        }
    };

    useEffect(() => {
        if (hideElement && gameContainerRef.current) {
            gameContainerRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [hideElement]);

    return (
        <div className={`CenterPane ${className}`}>
            {hideElement !== 'button' && (
                <div className="w-100 h-100">
                    <Title />
                    <p>
                        <button className="btn btn-light mb-3 StartButton" onClick={() => { handleClick('button'); }}>
                            Start Game
                        </button>
                    </p>
                    <p>
                        <label htmlFor="difficultySlider" className="form-label difficultySliderLabel">
                            Difficulty: [{localStorage.getItem('speed') || '3'}]
                        </label><br />
                        <input
                            type="range"
                            className="form-range difficultySlider"
                            id="difficultySlider"
                            min="1"
                            max="5"
                            step="1"
                            defaultValue={localStorage.getItem('speed') || '3'}
                            onChange={(e) => { handleSlider(e); }}
                        />
                    </p>
                </div>
            )
            }
            {
                hideElement && (
                    <GameCanvas ref={gameContainerRef} />
                )
            }
        </div >
    );
}