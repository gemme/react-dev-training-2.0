import { create } from 'lodash';
import React, { useState, useEffect } from 'react';
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
    Dimmer, Loader, Image, Segment
} from 'semantic-ui-react'
import { useFetch } from '../hooks/useFetch';
import { useMutation } from '../hooks/useMutation';
import { useForm } from '../hooks/useForm';

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

const API_URL = 'http://localhost:3000/api/users/';

interface Users {
    name: string;
    lastName: string;
    currency: string;
}

export const FormsWithCustomHooks = () => {
    /* const [name, setName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('');
    const [currency, setCurrency] = useState<string>(''); */
    const { values, handleChange, resetForm } = useForm<Users>({
        name: '',
        lastName: '',
        currency: ''
    });
    const { name, lastName, currency } = values;
    const { data: users, error: usersError, isLoading: usersIsLoading, refetch } = useFetch<Users>(API_URL);
    const { asyncMutate } = useMutation<Users>(API_URL, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
    });


    const createUser = async () => {
        const data = await asyncMutate({
            name,
            lastName,
            currency
        });
        console.log(data);
        resetForm();
    }

    const getUsers = async () => {
        refetch()
    }

    const processApi = async () => {
        try {
            await createUser();
            await getUsers();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>

            <Form onSubmit={(event) => {
                event.preventDefault();
                processApi();
            }}>
                <FormField>
                    <label>First Name</label>
                    <input type='text' value={name} name='name' onChange={(event) => {
                        //setName(event.target.value);
                        console.log('event', event);
                        handleChange(event)
                    }} />
                </FormField>
                <FormField>
                    <label>Last Name</label>
                    <input type='text' value={lastName} name='lastName' onChange={(event) => {
                        //setLastName(event.target.value);
                        handleChange(event);
                    }} />
                </FormField>
                <FormField>
                    <label>Currencies</label>
                    <Dropdown placeholder='Currencies' name='currency' search selection options={stateOptions} onChange={(event, data) => {
                        //setCurrency(data.value);
                        const _event = {
                            target: {
                                name: data.name,
                                value: data.value
                            }
                        }
                        handleChange(_event);
                    }} />
                </FormField>
                <Button type='submit'>Submit</Button>
            </Form>
            {usersIsLoading
                &&
                <div >
                    <Segment style={{
                        height: 300
                    }}>
                        <Dimmer active>
                            <Loader>Loading</Loader>
                        </Dimmer>
                    </Segment>
                </div>
            }
            {!usersIsLoading
                &&
                <Table celled>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderCell>First Name</TableHeaderCell>
                            <TableHeaderCell>Last Name</TableHeaderCell>
                            <TableHeaderCell>Currency</TableHeaderCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {usersError
                            ? <p>{usersError}</p>
                            :
                            users?.map(value => {
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
            }
        </>
    );
}