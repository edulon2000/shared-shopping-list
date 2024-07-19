import React, { useState } from 'react';
import Header from '../components/Header';
import ShoppingList from '../components/ShoppingList';
import UserForm from '../components/UserForm';

const Home = () => {
  const [lists, setLists] = useState([]);

  const addNewList = (newList) => {
    setLists(prevLists => [...prevLists, newList]);
  };

  return (
    <div>
      <Header />
      <UserForm onNewList={addNewList} />
      <ShoppingList lists={lists} />
    </div>
  );
};

export default Home;
