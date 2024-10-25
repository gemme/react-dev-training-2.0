import React, { useState } from 'react';
import { UsersTable } from '../components/UsersTable';
import { useFetch } from '../hooks/useFetch';
import { type Users } from '../types/users';
import { API_URL } from '../constants/users';
import { Button, FormField, Form, Dropdown } from 'semantic-ui-react';
import { CustomInput } from '../components/CustomInput';
import { useForm } from '../hooks/useForm';
import { useMutation } from '../hooks/useMutation';
import { stateOptions } from '../constants/users';
import { useNavigate } from 'react-router-dom';


export const UsersFormView = () => {
    const navigate = useNavigate();
    const { values, handleChange, resetForm } = useForm<Users>({
        name: '',
        lastName: '',
        currency: ''
    });
    const { name, lastName, currency } = values;
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

    return <>
        <Form onSubmit={async (event) => {
            event.preventDefault();
            await createUser();
            console.log('user created');
            navigate('/users');
            //ya diganme la verdad!!
        }}>
            <FormField >
                <CustomInput label={'Name'} type='text' value={name} name='name' handleChange={handleChange} />
            </FormField>
            <FormField>
                <CustomInput label={'Last name'} type='text' value={lastName} name='lastName' handleChange={handleChange} />
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
    </>
}