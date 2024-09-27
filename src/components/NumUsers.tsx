import React from 'react';
import { useSelector } from 'react-redux'

interface NumUsersProps {
    numUsers?: number;
}

export const NumUsers = ({ numUsers = 0 }: NumUsersProps) => {
    const totalUsers = useSelector(state => state.users.value);
    return (<div>{'Number of users: ' + totalUsers}</div>)
}

/*
NumUsers.defaultProps = {
    numUsers: 0
}*/