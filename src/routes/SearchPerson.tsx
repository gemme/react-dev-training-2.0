import React, { useEffect, useState } from 'react';
import { Input, List, ListItem } from 'semantic-ui-react';
import useDebounce from '../hooks/useDebounce';

const API_URL = 'http://localhost:3000/api/persons?search=';

export const SearchPerson = () => {
  const [search, setSearch] = useState('');

  const [persons, setPersons] = useState([]);

  const { query } = useDebounce(search, 1500);

  useEffect(() => {
    fetch(`${API_URL}${query}`)
      .then((response) => response.json())
      .then((data) => {
        setPersons(data);
        console.log(data);
      });
  }, [query]);

  return (
    <>
      <h1>Search Person</h1>
      <div
        style={{
          margin: '10px 0',
        }}
      >
        <Input
          placeholder="Search..."
          onChange={({ target: { value } }) => setSearch(value)}
        />
      </div>

      <div style={{ height: 400, overflow: 'auto' }}>
        <List>
          {persons.map((person: any) => (
            <ListItem key={person.id}>{person.name}</ListItem>
          ))}
        </List>
      </div>
    </>
  );
};
