import React from 'react';

import {
    CardMeta,
    CardHeader,
    CardDescription,
    CardContent,
    Card,
    Icon,
    Image,
    Button,
    Input,
    List,
    ListContent,
    ListItem,
    ListHeader,
    ListDescription
} from 'semantic-ui-react'
import './Flicker.css';

export const Flicker = () => {

    return (
        <>
            <Input placeholder='Search...' /><Button> Search</Button>

            <div className='container'>
                <div>
                    <Card>
                        <Image src='/images/avatar/large/matthew.png' wrapped ui={false} />
                        <CardContent>
                            <CardHeader>Matthew</CardHeader>
                            <CardMeta>
                                <span className='date'>Joined in 2015</span>
                            </CardMeta>
                            <CardDescription>
                                Matthew is a musician living in Nashville.
                            </CardDescription>
                        </CardContent>
                        <CardContent extra>
                            <a>
                                <Icon name='user' />
                                22 Friends
                            </a>
                        </CardContent>
                    </Card>
                </div>
                <div>
                    <List>
                        <ListItem>
                            <Image src='/images/wireframe/square-image.png' avatar />
                            <ListContent>
                                <ListHeader>John Wayne</ListHeader>
                                <ListDescription>
                                    This text will always have a left margin to make sure it sits
                                    alongside your icon
                                </ListDescription>
                            </ListContent>
                        </ListItem>
                        <ListItem>
                            <Image src='/images/wireframe/square-image.png' avatar />
                            <ListContent>
                                <ListHeader>John Wayne</ListHeader>
                                <ListDescription>
                                    This text will always have a left margin to make sure it sits
                                    alongside your icon
                                </ListDescription>
                            </ListContent>
                        </ListItem>
                        <ListItem>
                            <Image src='/images/wireframe/square-image.png' avatar />
                            <ListContent>
                                <ListHeader>John Wayne</ListHeader>
                                <ListDescription>
                                    This text will always have a left margin to make sure it sits
                                    alongside your icon
                                </ListDescription>
                            </ListContent>
                        </ListItem>
                    </List>

                </div>
            </div>
        </>
    );
};

