import React, { useState, useRef, forwardRef, RefObject } from 'react';

import {
    TableRow,
    TableHeaderCell,
    TableHeader,
    TableFooter,
    TableCell,
    TableBody,
    MenuItem,
    Icon,
    Label,/*  */
    Menu,
    Table
} from 'semantic-ui-react'
import { type Users } from '../types/users';

interface UsersTableProps {
    headers: string[]
    users: Users[];
    usersError: string;
}

export const UsersTable = ({
    headers = [],
    users,
    usersError
}: UsersTableProps) => {
    return (
        <Table celled>
            <TableHeader>
                <TableRow>
                    {headers.map((header: string) => {
                        return <TableHeaderCell>{header}</TableHeaderCell>
                    })}
                </TableRow>
            </TableHeader>
            <TableBody>
                {usersError
                    ? <p>{usersError}</p>
                    :
                    users?.map((value, index) => {
                        return (
                            <TableRow key={value.name + index}>
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
    )
}