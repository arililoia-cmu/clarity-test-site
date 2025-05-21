import { useState, useEffect, useRef, useMemo } from "react";
import { numberToPastelRainbowColor } from '../assets/javascript/color_helper.ts';
import exampleImage from '../assets/images/example.png'

export default function Counter() {
    const [count, setCount] = useState(0);
    const [visible, setVisible] = useState(false);
    const imageRef = useRef<HTMLDivElement>(null);
    const index = 33

    function handleIncrement() {
        setCount(count + 1);
    }

    const color = useMemo(
        () => numberToPastelRainbowColor(index),
        [index]
    );

    useEffect(() => {
        document.title = `Count variable is ${count}`
        if (!visible && count == 10) {
            setVisible(true);
        }
    }, [count])

    return (
        <div>
            <h1>Count variable is {count}</h1>
            <button onClick={handleIncrement}>Increment</button>
            <div
                style={{ display: visible ? 'block' : 'none', backgroundColor: color }}
                className="congrats-graphic"
            >
                <h2 className="congrats-graphic-text">You Clicked 10 Times ~('_')~</h2>
                <div ref={imageRef} className="congrats-graphic-image" >
                    <img src={exampleImage} />
                </div>
            </div>
        </div>

    );
}
