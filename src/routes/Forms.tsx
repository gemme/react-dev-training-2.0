import { create } from 'lodash';
import React, { useState, useEffect, useReducer } from 'react';
import { FormField, Button, Checkbox, Form, Dropdown } from 'semantic-ui-react'
import {
    TableRow,
    TableHeaderCell,
    TableHeader,
    TableFooter,
    TableCell,
    TableBody,
    MenuItem,
    Icon,
    Label,
    Menu,
    Table,
} from 'semantic-ui-react'
import { useUserName } from '../providers/UserProvider';

const stateOptions = [
    {
        key: 1,
        text: 'USD',
        value: 'USD'
    }, {
        key: 2,
        text: 'EUR',
        value: 'EUR'
    }, {
        key: 3,
        text: 'MXN',
        value: 'MXN'
    }
]

//const users = [{ "name": "Ernesto", "lastName": "Martinez", "currency": "EUR", "id": "2ccbfef23451e4ce7554" }, { "name": "Ernesto", "lastName": "Martinez", "currency": "EUR", "id": "2ccbfef23451e4ce7554" }];
// react query
// react hook forms

// useFormStatus, useActioState  experimental  React 19 version

const API_URL = 'http://localhost:3000/api/users/';
const initialState = {
    name: '',
    lastName: '',
    currency: ''
}
const reducer = (state: any, action: any) => {
    let newState = state;
    switch (action.type) {
        case 'UPDATE_NAME':
            newState = { ...state, name: action.payload };
            break;
        case 'UPDATE_LASTNAME':
            newState = { ...state, lastName: action.payload };
            break;
        case 'UPDATE_CURRENCY':
            newState = { ...state, currency: action.payload };
            break;
        default:
            return newState;
    }
    return newState;
}

export const Forms = () => {
    // const [name, setName] = useState<string>('')
    // const [lastName, setLastName] = useState<string>('')
    // const [currency, setCurrency] = useState<string>('')
    const [{ name, lastName, currency }, dispatch] = useReducer(reducer, initialState)
    const [users, setUsers] = useState([]);
    const { setUserName } = useUserName();


    const createUser = async () => {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                lastName,
                currency
            })
        })

        if (response.ok) {
            const data = await response.json();
            console.log('data', data)
            setUserName(data.name);
            //cualquier de los dos modos deberia funcionar
            // setUserName(name);
        }
    }

    const getUsers = async () => {
        const response = await fetch(API_URL, {
            method: 'GET',
        })

        if (response.ok) {
            const data = await response.json();
            console.log('data', data)
            setUsers(data);
        }
    }

    const processApi = async () => {
        try {
            await createUser();
            await getUsers();
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getUsers();
    }, [])
    return (
        <>

            <Form onSubmit={(event) => {
                event.preventDefault();
                processApi();
            }}>
                <FormField>
                    <label>First Name</label>
                    <input type='text' value={name} onChange={(event) => {
                        dispatch({
                            payload: event.target.value,
                            type: "UPDATE_NAME"
                        });
                    }} />
                </FormField>
                <FormField>
                    <label>Last Name</label>
                    <input type='text' value={lastName} onChange={(event) => {
                        dispatch({
                            payload: event.target.value,
                            type: "UPDATE_LASTNAME"
                        });
                    }} />
                </FormField>
                <FormField>
                    <label>Currencies</label>
                    <Dropdown placeholder='Currencies' search selection options={stateOptions} onChange={(event, data) => {
                        dispatch({
                            payload: data.value,
                            type: "UPDATE_CURRENCY"
                        });
                    }} />
                </FormField>
                <Button type='submit'>Submit</Button>
            </Form>

            <Table celled>
                <TableHeader>
                    <TableRow>
                        <TableHeaderCell>First Name</TableHeaderCell>
                        <TableHeaderCell>Last Name</TableHeaderCell>
                        <TableHeaderCell>Currency</TableHeaderCell>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {
                        users.map(value => {
                            return (
                                <TableRow key={value.name}>
                                    <TableCell>
                                        <Label>{value.name}</Label>
                                    </TableCell>
                                    <TableCell>{value.lastName}</TableCell>
                                    <TableCell>{value.currency}</TableCell>
                                </TableRow>
                            )
                        })
                    }

                </TableBody>

                <TableFooter>
                    <TableRow>
                        <TableHeaderCell colSpan='3'>
                            <Menu floated='right' pagination>
                                <MenuItem as='a' icon>
                                    <Icon name='chevron left' />
                                </MenuItem>
                                <MenuItem as='a'>1</MenuItem>
                                <MenuItem as='a'>2</MenuItem>
                                <MenuItem as='a'>3</MenuItem>
                                <MenuItem as='a'>4</MenuItem>
                                <MenuItem as='a' icon>
                                    <Icon name='chevron right' />
                                </MenuItem>
                            </Menu>
                        </TableHeaderCell>
                    </TableRow>
                </TableFooter>
            </Table>

        </>
    );
}