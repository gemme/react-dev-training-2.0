import React, { createContext, useState, type ReactElement, useContext } from 'react';

interface CounterContext {
    count: number;
    setCount: (c: any) => void;
}

// inicializar estos valores con un estado inicial
// al crear nuestro contexto
export const CounterContext = createContext<CounterContext>({
    count: 0,
    setCount: () => { },
});

/*
    <>
    <CounterContext.Provider value={{
        count: 10
    }}>
        <div>
            <Component />
        </div>
    </CounterContext.Provider>
    <ComponentWithoutContext />
    </>
*/

// Redux
// selectors leer el estado ---> useSelector
// actions para modificar el estado ---> useDispatch


interface CounterProvider {
    children: ReactElement
}

// crear nuestro provider con algun estado que queramos compartir
export const CounterProvider = ({ children }: CounterProvider) => {
    const [count, setCount] = useState<number>(20);
    return (
        <CounterContext.Provider value={{
            count,
            setCount,
        }}>
            {children}
        </CounterContext.Provider>
    )
}
// definir una funcion como si fiera un custom hook
// con un nombre mas representativo
export const useCounter = () => useContext(CounterContext);

// useCounter()
// useCounter.count
// useCounter.setCount
// {count, setCount}