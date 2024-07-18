// models/itemModel.js

class Item {
    constructor(id, name, quantity, listId) {
      this.id = id;
      this.name = name;
      this.quantity = quantity;
      this.listId = listId;
    }
  }
  
  module.exports = Item;
  