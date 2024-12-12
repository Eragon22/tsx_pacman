import { useState } from 'react';
import Toplist from './Toplist';

interface ToplistItem {
    id: number;
    name: string;
    score: number;
    date: string;
}

/**
 * SaveRecord component allows users to save their game score with their name.
 * It displays a form to input the name and save the score to the local storage.
 * Once saved, it displays the Toplist component.
 *
 * @param {Object} props - The component props.
 * @param {number} props.score - The score to be saved.
 * @param {string} props.text - The text to be displayed as a heading.
 *
 * @returns {JSX.Element} The SaveRecord component.
 */
export default function SaveRecord({ score, text }: { score: number, text: string }) {
    const [name, setName] = useState('');
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        const newRecord: ToplistItem = {
            id: Date.now(),
            name,
            score,
            date: new Date().toISOString(),
        };

        const existingRecords = JSON.parse(localStorage.getItem('toplist') || '[]');
        existingRecords.push(newRecord);
        existingRecords.sort((a: ToplistItem, b: ToplistItem) => b.score - a.score);
        localStorage.setItem('toplist', JSON.stringify(existingRecords));
        setSaved(true);
    };

    return (
        <div className="SaveRecord">
            {saved ? (
                <Toplist />
            ) : (
                <>
                    <h1 className="my-3 display-3" id="GameOver">{text}</h1>
                    <h2 className="my-3 display-4">Score: {score}</h2>
                    <form className="w-50 m-auto" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                className="form-control"
                                value={name}
                                onChange={(e) => setName((e.target as HTMLInputElement).value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-light btn-lg my-3">Save</button>
                    </form>
                </>
            )}
        </div>
    );
}