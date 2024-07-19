import React, { useState } from 'react';
import api from '../api';

const UserForm = () => {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/shopping-lists', { name });
      setName('');
      // Optionally, fetch the updated list
    } catch (error) {
      console.error('Error adding shopping list', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Add new list"
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default UserForm;
