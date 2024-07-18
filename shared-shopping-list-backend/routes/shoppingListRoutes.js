// routes/shoppingListRoutes.js

const express = require('express');
const router = express.Router();
const shoppingListController = require('../controllers/shoppingListController');

// Rotas CRUD para listas de compras
router.get('/users/:userId/shopping-lists', shoppingListController.getShoppingLists);
router.get('/shopping-lists/:id', shoppingListController.getShoppingListById);
router.post('/shopping-lists', shoppingListController.createShoppingList);
router.put('/shopping-lists/:id', shoppingListController.updateShoppingList);
router.delete('/shopping-lists/:id', shoppingListController.deleteShoppingList);

module.exports = router;
