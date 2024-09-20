import React from 'react';
// mocks data
const initialState = [
    { name: 'Obi wan kenobi' },
    { name: 'Darth Vader' },
    { name: 'Look skywalker' },
    { name: 'R2D2' },
    { name: 'R2D3' },
];

export const StarWars = () => {

    // render
    console.log('render');
    return (
        <div>
            <li>
                {initialState.map((p, i) => { return <ul key={i}> {p.name}</ul> })}
            </li>
        </div>
    );
};
