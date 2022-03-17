import React, {useCallback, useEffect, useRef, useState} from 'react';
import classes from './Morse.module.css';

function decodeMorse(morseCode: string): string {
    const codeMap: { [index: string]: string } = {
        '.-': 'a',
        '-...': 'b',
        '-.-.': 'c',
        '-..': 'd',
        '.': 'e',
        '..-.': 'f',
        '--.': 'g',
        '....': 'h',
        '..': 'i',
        '.---': 'j',
        '-.-': 'k',
        '.-..': 'l',
        '--': 'm',
        '-.': 'n',
        '---': 'o',
        '.--.': 'p',
        '--.-': 'q',
        '.-.': 'r',
        '...': 's',
        '-': 't',
        '..-': 'u',
        '...-': 'v',
        '.--': 'w',
        '-..-': 'x',
        '-.--': 'y',
        '--..': 'z',
        '.----': '1',
        '..---': '2',
        '...--': '3',
        '....-': '4',
        '.....': '5',
        '-....': '6',
        '--...': '7',
        '---..': '8',
        '----.': '9',
        '-----': '0',
    };
    return codeMap[morseCode]
}

const Morse = (): JSX.Element => {
    const [text, setText] = useState<string>("");
    const [code, setCode] = useState<string>("");
    const codeRef = useRef(code);
    const timer = useRef(0);

    codeRef.current = code;
    let mousedownTime: number = 0;
    let keydownTime: number = 0;


    function mouseDownHandler(ev: React.MouseEvent<HTMLButtonElement>) {
        if (ev.button === 0) {
            mousedownTime = new Date().getTime();
            clearTimeout(timer.current)
        }
    }

    const mouseUpHandler = (ev: React.MouseEvent<HTMLButtonElement>) => {
        if (ev.button === 0) {
            const timeDifference = new Date().getTime() - mousedownTime;
            timer.current = window.setTimeout(() => applyCode(), 900)
            setCode(c => {
                return c + (timeDifference < 300 ? "." : "-")
            })
        }
    };

    const keyDownHandler = useCallback((ev: KeyboardEvent) => {
        clearTimeout(timer.current)
        if (!ev.repeat && ev.code === "Space") {
            keydownTime = new Date().getTime();
        }
    }, []);

    const keyUpHandler = useCallback((ev: KeyboardEvent) => {
        if (ev.key === " ") {
            const timeDifference = new Date().getTime() - keydownTime;
            timer.current = window.setTimeout(() => applyCode(), 900)
            setCode(c => {
                return c + (timeDifference < 300 ? "." : "-")
            })
        } else if (ev.code === "Escape") {
            setCode("")
            setText("")
        }
    }, [])

    const applyCode = () => {
        const m = decodeMorse(codeRef.current)
        if (m) {
            setText(t => t + m)
        }
        setCode("")
    };


    useEffect(() => {
        window.addEventListener("keydown", keyDownHandler)
        window.addEventListener("keyup", keyUpHandler)
        return () => {
            clearTimeout(timer.current);
            window.removeEventListener("keydown", keyDownHandler)
            window.removeEventListener("keyup", keyUpHandler)
        }
    }, [keyUpHandler, keyDownHandler])

    return (
        <div className={classes.morse}>
            <h1>Press [Space] or click red button to code or [Esc] to clear.</h1>
            <div style={{display: "flex", gap: "1rem"}}>
                <button
                    onMouseDown={mouseDownHandler}
                    onMouseUp={mouseUpHandler}
                >Push
                </button>
                <h2>{code}</h2>
            </div>
            <div><h2>{text}</h2></div>
        </div>
    );
};

export default Morse;
