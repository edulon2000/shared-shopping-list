import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ListPage from './pages/ListPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact component={Home} />
        <Route path="/lists/:id" component={ListPage} />
      </Routes>
    </Router>
  );
};

export default App;
