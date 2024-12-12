import { forwardRef, useEffect, useState } from 'react';

import './Toplist.less';
import SaveRecord from './SaveRecord';

interface ToplistItem {
    id: number;
    name: string;
    score: number;
    date: string;
}

/**
 * A React component that displays a toplist of items.
 * 
 * @component
 * @param {React.Ref<HTMLDivElement>} ref - A ref to the div element.
 * 
 * @returns {JSX.Element} The rendered Toplist component.
 * 
 * @example
 * <Toplist ref={someRef} />
 * 
 * @remarks
 * The component retrieves the toplist data from the local storage and displays it in a table format.
 * Each row in the table represents an item in the toplist with columns for name, score, and date.
 * 
 * @function
 * @name Toplist
 * 
 * @hook
 * @name useEffect
 * @description Fetches the toplist data from local storage when the component mounts.
 * 
 * @hook
 * @name useState
 * @description Manages the state of the toplist items.
 * 
 * @button
 * @description A button that reloads the page when clicked.
 * 
 * @typedef {Object} ToplistItem
 * @property {string} id - The unique identifier of the toplist item.
 * @property {string} name - The name of the toplist item.
 * @property {number} score - The score of the toplist item.
 * @property {string} date - The date of the toplist item.
 */
const Toplist = forwardRef<HTMLDivElement>((_, ref) => {
    const [toplist, setToplist] = useState<ToplistItem[]>([]);

    useEffect(() => {
        const storedToplist = localStorage.getItem('toplist');
        if (storedToplist) {
            setToplist(JSON.parse(storedToplist));
        }
    }, []);

    return (
        <div className="Toplist" ref={ref}>
            <h2 className="my-3 display-4">Toplist</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Score</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {toplist.map((item) => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.score}</td>
                            <td>{new Date(item.date).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={() => window.location.reload()} className="btn btn-light mt-3 w-50 m-auto">
                Back
            </button>
        </div>
    );
});

export default Toplist;