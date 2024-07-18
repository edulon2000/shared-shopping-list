// controllers/userController.js

const pool = require('../config/db'); // Assumindo que você já configurou a conexão com o banco de dados PostgreSQL

// Lista todos os usuários
exports.getUsers = async (req, res) => {
  try {
    const users = await pool.query('SELECT * FROM users');
    res.json(users.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Busca um usuário por ID
exports.getUserById = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await pool.query('SELECT * FROM users WHERE id = $1', [id]);

    if (user.rows.length > 0) {
      res.json(user.rows[0]);
    } else {
      res.status(404).json({ message: 'Usuário não encontrado' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Cria um novo usuário
exports.createUser = async (req, res) => {
  const { username, email, password } = req.body;

  // Validação básica: verificar se todos os campos necessários estão presentes
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Todos os campos (username, email, password) são obrigatórios.' });
  }

  try {
    const newUser = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
      [username, email, password]
    );

    res.status(201).json(newUser.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Atualiza um usuário existente
exports.updateUser = async (req, res) => {
  const id = req.params.id;
  const { username, email, password } = req.body;

  // Validação básica: verificar se todos os campos necessários estão presentes
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Todos os campos (username, email, password) são obrigatórios.' });
  }

  try {
    const updatedUser = await pool.query(
      'UPDATE users SET username = $1, email = $2, password = $3 WHERE id = $4 RETURNING *',
      [username, email, password, id]
    );

    if (updatedUser.rows.length > 0) {
      res.json(updatedUser.rows[0]);
    } else {
      res.status(404).json({ message: 'Usuário não encontrado' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Deleta um usuário
exports.deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedUser = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);

    if (deletedUser.rows.length > 0) {
      res.json({ message: 'Usuário excluído com sucesso' });
    } else {
      res.status(404).json({ message: 'Usuário não encontrado' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
