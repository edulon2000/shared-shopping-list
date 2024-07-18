// routes/itemRoutes.js

const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

// Rotas CRUD para itens da lista
router.get('/lists/:listId/items', itemController.getItems);
router.get('/lists/:listId/items/:id', itemController.getItemById);
router.post('/lists/:listId/items', itemController.createItem);
router.put('/lists/:listId/items/:id', itemController.updateItem);
router.delete('/lists/:listId/items/:id', itemController.deleteItem);

module.exports = router;
