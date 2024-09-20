import React from 'react';

import {
  CardMeta,
  CardHeader,
  CardDescription,
  CardContent,
  Button,
  Card,
  Image,
} from 'semantic-ui-react';

export const InboxMessages = () => {
  return (
    <>
      <Card>
        <CardContent>
          <Image
            floated='right'
            size='mini'
            src='/images/avatar/large/steve.jpg'
          />
          <CardHeader>Steve Sanders</CardHeader>
          <CardMeta>Friends of Elliot</CardMeta>
          <CardDescription>
            Steve wants to add you to the group <strong>best friends</strong>
          </CardDescription>
        </CardContent>
        <CardContent extra>
          <div className='ui two buttons'>
            <Button basic color='green'>
              Approve
            </Button>
            <Button basic color='red'>
              Decline
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Image
            floated='right'
            size='mini'
            src='/images/avatar/large/steve.jpg'
          />
          <CardHeader>Steve Sanders</CardHeader>
          <CardMeta>Friends of Elliot</CardMeta>
          <CardDescription>
            Steve wants to add you to the group <strong>best friends</strong>
          </CardDescription>
        </CardContent>
        <CardContent extra>
          <div className='ui two buttons'>
            <Button basic color='green'>
              Approve
            </Button>
            <Button basic color='red'>
              Decline
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  )
}