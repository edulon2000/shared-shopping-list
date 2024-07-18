// controllers/itemController.js

const pool = require('../config/db'); // Assumindo que você já configurou a conexão com o banco de dados PostgreSQL

// Lista todos os itens da lista
exports.getItems = async (req, res) => {
  const listId = req.params.listId;

  try {
    const items = await pool.query('SELECT * FROM items WHERE list_id = $1', [listId]);
    res.json(items.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Busca um item da lista por ID
exports.getItemById = async (req, res) => {
  const id = req.params.id;

  try {
    const item = await pool.query('SELECT * FROM items WHERE id = $1', [id]);

    if (item.rows.length > 0) {
      res.json(item.rows[0]);
    } else {
      res.status(404).json({ message: 'Item da lista não encontrado' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Cria um novo item da lista
exports.createItem = async (req, res) => {
  const { name, quantity, listId } = req.body;

  try {
    const newItem = await pool.query(
      'INSERT INTO items (name, quantity, list_id) VALUES ($1, $2, $3) RETURNING *',
      [name, quantity, listId]
    );

    res.status(201).json(newItem.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Atualiza um item da lista
exports.updateItem = async (req, res) => {
  const id = req.params.id;
  const { name, quantity } = req.body;

  try {
    const updatedItem = await pool.query(
      'UPDATE items SET name = $1, quantity = $2 WHERE id = $3 RETURNING *',
      [name, quantity, id]
    );

    if (updatedItem.rows.length > 0) {
      res.json(updatedItem.rows[0]);
    } else {
      res.status(404).json({ message: 'Item da lista não encontrado' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Deleta um item da lista
exports.deleteItem = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedItem = await pool.query('DELETE FROM items WHERE id = $1 RETURNING *', [id]);

    if (deletedItem.rows.length > 0) {
      res.json({ message: 'Item da lista excluído com sucesso' });
    } else {
      res.status(404).json({ message: 'Item da lista não encontrado' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
