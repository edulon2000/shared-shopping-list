const express = require('express');
const app = express();
const pool = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const itemRoutes = require('./routes/itemRoutes');
const shoppingListRoutes = require('./routes/shoppingListRoutes');

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to the database', err.stack);
  } else {
    console.log('Connected to the database', res.rows);
  }
});

// Inicia o servidor na porta 3000
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});

// Middleware para JSON parsing
app.use(express.json());
// Rotas de usuário
app.use('/api', userRoutes);

// Rotas para itens da lista
app.use('/api', itemRoutes);

// Rotas para listas de compras
app.use('/api', shoppingListRoutes);






