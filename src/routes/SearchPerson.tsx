import React, { useEffect, useState } from 'react';
import { ListItem, List, Input } from 'semantic-ui-react'


const API_URL = 'http://localhost:3000/api/persons/';

//http://localhost:3000/api/persons?search=

export const SearchPerson = () => {

    const [persons, setPersons] = useState([]);

    useEffect(() => {
        fetch(API_URL)
            .then(response => response.json())
            .then(data => {
                setPersons(data);
                console.log(data)
            })
    }, []);

    return (
        <>
            <h1>Search Person</h1>
            <div style={{
                margin: '10px 0'
            }}><Input placeholder='Search...' /></div>

            <div style={{ height: 400, overflow: 'auto' }}>
                <List>
                    {persons.map((person: any) => (
                        <ListItem key={person.id}>{person.name}</ListItem>
                    ))}
                </List>
            </div>

        </>

    );
}