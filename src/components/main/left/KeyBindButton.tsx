import React from 'react';

import './KeyBindButton.less';

interface ButtonInputProps {
    label: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * KeyBindButton component allows users to bind a key to a specific action.
 * 
 * @param {Object} props - The properties object.
 * @param {string} props.label - The label for the key binding input.
 * @param {string} props.value - The current value of the key binding input.
 * @param {function} props.onChange - The function to call when the key binding value changes.
 * 
 * @returns {JSX.Element} The rendered KeyBindButton component.
 */
export default function KeyBindButton({ label, value, onChange }: ButtonInputProps) {
    return (
        <div className="container mt-3">
            <div className="mb-3">
                <div className="d-flex align-items-center row">
                    <label className="me-2 col-6">{label}</label>
                    <input
                        type="text"
                        className="form-control col-6 text-center"
                        value={value}
                        onChange={onChange}
                        placeholder={`Enter ${label} button value`}
                        onKeyDown={(e) => {
                            e.preventDefault();
                            const key = e.key === ' ' ? 'Space' : e.key;
                            onChange({
                                ...e,
                                target: {
                                    ...e.target,
                                    value: key,
                                },
                            } as React.ChangeEvent<HTMLInputElement>);
                            window.localStorage.setItem(label, key);
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
