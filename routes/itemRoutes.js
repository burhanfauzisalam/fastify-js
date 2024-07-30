// routes/itemRoutes.js

import { getAllItems } from "../controllers/itemController.js";
import { createItem } from "../controllers/itemController.js";
import { updateItem } from "../controllers/itemController.js";
import { getItemById } from "../controllers/itemController.js";
import { deleteItem } from "../controllers/itemController.js";
import { loginItem } from "../controllers/itemController.js";

async function itemRoutes(fastify, options) {
  fastify.get("/items", getAllItems);
  fastify.get("/items/:id", getItemById);
  fastify.post("/items", createItem);
  fastify.put("/items/:id", updateItem);
  fastify.delete("/items/:id", deleteItem);
  fastify.post("/item-login", loginItem);
}

export default itemRoutes;
