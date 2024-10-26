import React, { useState, useMemo, useCallback } from "react";
import { useContext } from 'react';
import { GlobalContext } from '../index';

const computeFactorial = (n: number): number => {

    console.log('computeFactorial', n)

    if (n === 1 || n === 0) {
        return 1
    }

    if (n === 100) {
        for (let i = 0; i <= 1000000000; i++) {
            // delay
            //console.log(i)
        }
    }
    return n * computeFactorial(n - 1)
}

export const Factorial = () => {
    const { name } = useContext(GlobalContext);
    const [num, setNum] = useState(100);
    const [value, setValue] = useState('');
    // n = 5
    // 1x2x3x4x5
    // 0 y 1 = 1

    /* const computeFactorial = useCallback((n: number): number => {
        console.log('computeFactorial', n)

        if (n === 1 || n === 0) {
            return 1
        }

        if (n === 100) {
            for (let i = 0; i <= 1000000000; i++) {
                // delay
                //console.log(i)
            }
        }
        return n * computeFactorial(n - 1)
    }, []) */


    const result = useMemo(() => computeFactorial(num), [num]);
    //const result = computeFactorial(num);

    console.log('render', value)

    return (<>
        <h1>Bienvenido {name} al factorial</h1>
        <div><h1>fatorial de {num} = {result}</h1></div>
        <button onClick={() => setNum(num + 1)}>factorial</button>
        <div>
            <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
        </div>
    </>)
};