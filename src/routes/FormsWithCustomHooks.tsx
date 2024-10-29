import { create } from 'lodash';
import React, { useState, useRef, forwardRef, RefObject } from 'react';
import { FormField, Button, Checkbox, Form, Dropdown } from 'semantic-ui-react'
import {
    Dimmer, Loader, Segment
} from 'semantic-ui-react'
import { useFetch } from '../hooks/useFetch';
import { useMutation } from '../hooks/useMutation';
import { useForm } from '../hooks/useForm';
import { CustomInput } from '../components/CustomInput';
import { UsersTable } from '../components/UsersTable';
import { type Users } from '../types/users';

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


export const FormsWithCustomHooks = () => {
    /* const [name, setName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('');
    const [currency, setCurrency] = useState<string>(''); */
    const [error, setError] = useState({
        name: '',
        lastName: '',
        currency: ''
    });
    const nameRef = useRef<HTMLInputElement | null>(null);
    const lastNameRef = useRef<any | null>(null);
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
        setError({
            name: '',
            lastName: '',
            currency: ''
        })
    }

    const getUsers = async () => {
        refetch()
    }

    const processApi = async () => {
        try {
            if (name.length < 5) {
                setError(prevState => {
                    return {
                        ...prevState,
                        name: 'name must be at least 5 characters length'
                    }
                });
                nameRef?.current?.focus?.();
                return;
            } else if (!error.lastName) {
                setError(prevState => {
                    return {
                        ...prevState,
                        name: ''
                    }
                });
            }
            if (lastName.length < 5) {
                setError(prevState => {
                    return {
                        ...prevState,
                        lastName: 'last name must be at least 5 characters length'
                    }
                });
                lastNameRef?.current?.focus?.();
                return;
            } else if (!error.lastName) {
                setError(prevState => {
                    return {
                        ...prevState,
                        lastName: ''
                    }
                });
            }

            await createUser();
            await getUsers();
        } catch (error) {
            console.error(error);
        }
    }
    console.log('FormsWithCustomHooks::Forms::testing::provider');


    return (
        <>

            <Form onSubmit={(event) => {
                event.preventDefault();
                processApi();
            }}>
                <FormField >
                    <CustomInput label={'Name'} ref={nameRef} type='text' value={name} name='name' handleChange={handleChange} error={error.name} />
                </FormField>
                <FormField>
                    <CustomInput label={'Last name'} ref={lastNameRef} type='text' value={lastName} name='lastName' handleChange={handleChange} error={error.lastName} />
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
                <UsersTable
                    users={users}
                    usersError={usersError ?? ''}
                    headers={['Name', 'Last Name', 'Currency']}
                />
            }
        </>
    );
}