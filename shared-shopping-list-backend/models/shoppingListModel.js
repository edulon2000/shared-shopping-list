// models/shoppingListModel.js

class ShoppingList {
    constructor(id, name, description, userId) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.userId = userId;
    }
  }
  
  module.exports = ShoppingList;
  