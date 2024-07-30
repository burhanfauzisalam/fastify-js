// models/itemModel.js

import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Item = mongoose.model("Item", itemSchema);

export default Item;
