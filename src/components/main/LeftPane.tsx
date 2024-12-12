import React, { useState } from 'react';

import './LeftPane.less';

import KeyBindButton from './left/KeyBindButton';

interface LeftPaneProps {
    className?: string;
}

/**
 * LeftPane component is responsible for rendering the configuration panel
 * where users can set key bindings for game controls.
 *
 * @param {LeftPaneProps} props - The properties for the LeftPane component.
 * @param {string} props.className - Additional class name for styling the component.
 *
 * @returns {JSX.Element} The rendered LeftPane component.
 *
 * The component initializes default key bindings for "Move Up", "Move Down",
 * "Move Left", and "Move Right" if they are not already set in localStorage.
 * It uses the useState hook to manage the state of the control keys.
 *
 * The handleInputChange function updates the state when a key binding is changed.
 * The component renders input fields for each control key and displays an error
 * message if any of the control keys are not unique.
 */
export default function LeftPane({ className }: LeftPaneProps) {
    if (!localStorage.getItem("Move Up")) localStorage.setItem("Move Up", 'ArrowUp');
    if (!localStorage.getItem("Move Down")) localStorage.setItem("Move Down", 'ArrowDown');
    if (!localStorage.getItem("Move Left")) localStorage.setItem("Move Left", 'ArrowLeft');
    if (!localStorage.getItem("Move Right")) localStorage.setItem("Move Right", 'ArrowRight');

    const [controls, setControls] = useState({
        keyUp: localStorage.getItem("Move Up"),
        keyDown: localStorage.getItem("Move Down"),
        keyLeft: localStorage.getItem("Move Left"),
        keyRight: localStorage.getItem("Move Right")
    });

    const handleInputChange = (key: string, value: string) => {
        setControls(prevControls => ({
            ...prevControls,
            [key]: value
        }));
    };

    return <div className={`LeftPane ${className}`}>
        <div className="LeftPane_header">
            <h1>Configuration</h1>
        </div>
        <div className="LeftPane_content">
            <p>Click on the input fields below and press the desired key to change the keybind.</p>
            <KeyBindButton label="Move Up" value={window.localStorage.getItem("Move Up")} onChange={(e) => handleInputChange('keyUp', (e.target as HTMLInputElement).value)} />
            <KeyBindButton label="Move Down" value={window.localStorage.getItem("Move Down")} onChange={(e) => handleInputChange('keyDown', (e.target as HTMLInputElement).value)} />
            <KeyBindButton label="Move Left" value={window.localStorage.getItem("Move Left")} onChange={(e) => handleInputChange('keyLeft', (e.target as HTMLInputElement).value)} />
            <KeyBindButton label="Move Right" value={window.localStorage.getItem("Move Right")} onChange={(e) => handleInputChange('keyRight', (e.target as HTMLInputElement).value)} />

            {Object.values(controls).some((value, index, self) => self.indexOf(value) !== index) && (
                <p className="error">Each control must have a unique key binding for the game to work properly.</p>
            )}
        </div>
    </div>
}