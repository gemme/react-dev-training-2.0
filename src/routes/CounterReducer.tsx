import React, { useState, useReducer } from 'react';


// Redux
// reducer
// son funciones puras / pasar argumentos
// (state, action) => new state

// subValores { country: 'Mexico' , address: {  street: '' } }  
// estado depende del estado anterior

interface State {
    count: number;
}
interface Action {
    type: 'INCREASE_VALUE' | 'DECREASE_VALUE'
}

const initialState = { count: 100 }

// react
// el estado es inmutable

const reducer = (state: State, action: Action) => {
    console.log(state);
    switch (action.type) {
        case 'INCREASE_VALUE':
            // BAD, no mutar el estado
            //state.count = state.count + 20;
            console.log(state);
            return { ...state, count: state.count + 20 };
        case 'DECREASE_VALUE':
            // BAD, no mutar el estado
            //state.count = state.count - 20;
            console.log(state);
            return { ...state, count: state.count - 20 };
        default:
            return state;
    }

}

export const CounterReducer = () => {
    //const [count, setCount] = useState(0);
    const [state, dispatch] = useReducer(reducer, initialState);

    const increase = () => {
        dispatch({
            type: 'INCREASE_VALUE'
        })
    }

    const decrease = () => {
        dispatch({ type: 'DECREASE_VALUE' })
    }

    console.log('component', state)

    return (
        <>
            counter reducer
            <div><h1>{state.count}</h1></div>
            <button onClick={increase}>Increase</button>
            <button onClick={decrease}>Decrease</button>
        </>
    );
}

// react Context Provider
// redux // HOC // actions // selectors
// middlewares // SAGAS // yield // generators
// props
// mobx

// preferable Context Provider

// useState
// Context Provider