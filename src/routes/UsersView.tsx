import React from 'react';
import { UsersTable } from '../components/UsersTable';
import { useFetch } from '../hooks/useFetch';
import { type Users } from '../types/users';
import { API_URL } from '../constants/users';
import { Button } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';

export const UsersView = () => {

    const { data: users, error: usersError, isLoading: usersIsLoading, refetch } = useFetch<Users>(API_URL);
    const navigate = useNavigate();

    return <>
        <Button onClick={() => navigate('/users-create')}>New User</Button>
        <UsersTable
            users={users}
            usersError={usersError ?? ''}
            headers={['Name', 'Last Name', 'Currency']}
        />
    </>
}