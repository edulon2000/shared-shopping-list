// controllers/shoppingListController.js

const pool = require('../config/db'); // Assumindo que você já configurou a conexão com o banco de dados PostgreSQL

// Lista todas as listas de compras do usuário
exports.getShoppingLists = async (req, res) => {
  const userId = req.params.userId;

  try {
    const shoppingLists = await pool.query('SELECT * FROM shopping_lists WHERE user_id = $1', [userId]);
    res.json(shoppingLists.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Busca uma lista de compras por ID
exports.getShoppingListById = async (req, res) => {
  const id = req.params.id;

  try {
    const shoppingList = await pool.query('SELECT * FROM shopping_lists WHERE id = $1', [id]);

    if (shoppingList.rows.length > 0) {
      res.json(shoppingList.rows[0]);
    } else {
      res.status(404).json({ message: 'Lista de compras não encontrada' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Cria uma nova lista de compras
exports.createShoppingList = async (req, res) => {
  const { name, description, userId } = req.body;

  try {
    const newShoppingList = await pool.query(
      'INSERT INTO shopping_lists (name, description, user_id) VALUES ($1, $2, $3) RETURNING *',
      [name, description, userId]
    );

    res.status(201).json(newShoppingList.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Atualiza uma lista de compras
exports.updateShoppingList = async (req, res) => {
  const id = req.params.id;
  const { name, description } = req.body;

  try {
    const updatedShoppingList = await pool.query(
      'UPDATE shopping_lists SET name = $1, description = $2 WHERE id = $3 RETURNING *',
      [name, description, id]
    );

    if (updatedShoppingList.rows.length > 0) {
      res.json(updatedShoppingList.rows[0]);
    } else {
      res.status(404).json({ message: 'Lista de compras não encontrada' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Deleta uma lista de compras
exports.deleteShoppingList = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedShoppingList = await pool.query('DELETE FROM shopping_lists WHERE id = $1 RETURNING *', [id]);

    if (deletedShoppingList.rows.length > 0) {
      res.json({ message: 'Lista de compras excluída com sucesso' });
    } else {
      res.status(404).json({ message: 'Lista de compras não encontrada' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
