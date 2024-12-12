import { useEffect, useRef, forwardRef, useState } from 'react';

import './gameCanvas.less';

import Animate from './CanvasAnimator';
import Controls from './CanvasControls';
import InitializeGame from './CanvasInitializer';
import Score from './CanvasScore';

import PacMan from './PacMan';
import GraphicObject from './GraphicObject';
import SaveRecord from '../toplist/SaveRecord';

/**
 * `GameCanvas` is a React functional component that renders the game canvas and handles the game logic.
 * It uses various hooks and refs to manage the game state, including the game objects, score, lives, and audio.
 * 
 * @param _ - Unused props parameter.
 * @param ref - A ref to the game container div.
 * 
 * @returns A JSX element representing the game container.
 * 
 * @remarks
 * - The component sets up event listeners for keydown events to prevent default actions for specific keys.
 * - It initializes the game objects and controls, and starts the game animation and score tracking.
 * - The component uses `useEffect` to manage intervals for updating the score and lives display, and to handle game over logic.
 * - Another `useEffect` is used to manage background and Pac-Man audio playback.
 * - When the game is over, it displays a `SaveRecord` component with the final score and a message.
 * 
 * @component
 * @example
 * ```tsx
 * <GameCanvas ref={gameContainerRef} />
 * ```
 */
const GameCanvas = forwardRef<HTMLDivElement>((_, ref) => {
    window.addEventListener("keydown", function (e) {
        if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
            e.preventDefault();
        }
    }, false);

    const [gameOver, setGameOver] = useState(false);
    const wallsRef = useRef<GraphicObject[] | null>(null);
    const spawnTilesRef = useRef<GraphicObject[] | null>(null);
    const pelletsRef = useRef<GraphicObject[] | null>(null);
    const pacmanRef = useRef<PacMan | null>(null);
    const directionRef = useRef<string | null>(null);
    const scoreRef = useRef<number>(0);
    const livesRef = useRef<number>(3);
    const ghostsRef = useRef<GraphicObject[] | null>(null);
    const scattersRef = useRef<GraphicObject[] | null>(null);
    const spawnRef = useRef<GraphicObject | null>(null);
    const [saveText, setSaveText] = useState('Game Over!');
    let backgroundAudio: HTMLAudioElement;
    let pacmanAudio: HTMLAudioElement;

    InitializeGame(wallsRef, pelletsRef, pacmanRef, ghostsRef, scattersRef, spawnRef, spawnTilesRef);
    Controls(directionRef);
    Animate(wallsRef, pelletsRef, pacmanRef, ghostsRef, scattersRef, spawnRef, directionRef, livesRef, spawnTilesRef);
    Score(pacmanRef, pelletsRef, scoreRef, ghostsRef, directionRef, livesRef);

    useEffect(() => {
        const interval = setInterval(() => {
            if (document.getElementById('score')) {
                document.getElementById('score')!.innerHTML = `${scoreRef.current} `;
                document.getElementById('lives')!.innerHTML = `${livesRef.current} `;
            }
            if (livesRef.current === 0) {
                if (pelletsRef.current.length === 0) {
                    setSaveText('You won!');
                }
                setGameOver(true);
                clearInterval(interval);
            }
            if (pacmanRef.current.velocity.x == 0 && pacmanRef.current.velocity.y == 0) {
                pacmanAudio.volume = Math.max(0, pacmanAudio.volume - 0.03);
            } else {
                pacmanAudio.volume = Math.min(1, pacmanAudio.volume + 0.03);
            }
        }, 1);

        return () => clearInterval(interval);
    }, [gameOver]);

    useEffect(() => {
        backgroundAudio = new Audio('src/assets/sound/background.wav');
        pacmanAudio = new Audio('src/assets/sound/pacman.wav');
        backgroundAudio.volume = 1;
        pacmanAudio.volume = 0;
        backgroundAudio.play();
        pacmanAudio.play();
        backgroundAudio.loop = true;
        pacmanAudio.loop = true;

        pacmanAudio.addEventListener('ended', function () {
            pacmanAudio.currentTime = 0;
            pacmanAudio.play();
        });
        backgroundAudio.addEventListener('ended', function () {
            backgroundAudio.currentTime = 0;
            backgroundAudio.play();
        });

        return () => {
            backgroundAudio.pause();
            pacmanAudio.pause();
        };
    }, []);

    return (
        <div ref={ref} className="GameContainer">
            {gameOver ? (
                <SaveRecord score={scoreRef.current} text={saveText} />
            ) : (
                <>
                    <canvas id="gameArea" className="GameArea">
                        Your browser does not support the HTML5 canvas tag.
                    </canvas>
                    <p className="Statistics">
                        <span>Lives: </span> <span id="lives"> 3</span>
                        <span> | Score: </span> <span id="score">0</span>
                    </p>
                </>
            )}
        </div>
    );
});

export default GameCanvas;