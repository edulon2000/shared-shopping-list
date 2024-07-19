import React, { useState, useEffect } from 'react';
import api from '../api';
import ShoppingListItem from './ShoppingListItem';

const ShoppingList = () => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const response = await api.get('/shopping-lists');
        setLists(response.data);
      } catch (error) {
        console.error('Error fetching shopping lists', error);
      }
    };
    fetchLists();
  }, []);

  return (
    <div>
      <h2>Shopping Lists</h2>
      <ul>
        {lists.map(list => (
          <ShoppingListItem key={list.id} item={list} />
        ))}
      </ul>
    </div>
  );
};

export default ShoppingList;
