// controllers/itemController.js

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import Item from "../models/itemModel.js";

export const getAllItems = async (request, reply) => {
  const items = await Item.find();
  return items;
};

export const getItemById = async (request, reply) => {
  const item = await Item.findById(request.params.id);
  if (item) {
    return item;
  } else {
    reply.code(404).send({ message: "Item not found" });
  }
};

export const createItem = async (request, reply) => {
  try {
    const { username, password } = request.query;
    // if (!username && !password) {
    //   reply.code(400).send({ message: "please input required fields" });
    // }

    const cek = await Item.findOne({ username });
    if (cek) {
      return reply.code(400).send({ message: "already exist" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password || "12345", salt);

    const newItem = new Item({ username, password: hashedPassword });
    await newItem.save();
    reply.code(201).send(newItem);
  } catch (error) {
    reply.code(500).send(error);
  }
};

export const updateItem = async (request, reply) => {
  const item = await Item.findByIdAndUpdate(request.params.id, request.body, {
    new: true,
  });
  if (item) {
    return item;
  } else {
    reply.code(404).send({ message: "Item not found" });
  }
};

export const deleteItem = async (request, reply) => {
  const result = await Item.findByIdAndDelete(request.params.id);
  if (result) {
    return { message: "Item deleted" };
  } else {
    reply.code(404).send({ message: "Item not found" });
  }
};

export const loginItem = async (req, res) => {
  try {
    const { username, password } = req.query;
    const item = await Item.findOne({ username });
    const isMatch = await bcrypt.compare(password, item.password);
    if (!isMatch) {
      return res.code(400).send({ message: "Invalid password" });
    }
    const token = jwt.sign({ ...item }, "KEY", {
      expiresIn: "1h",
    });
    res.code(200).send({ message: "welcome...", token });
  } catch (error) {
    res.code(500).send(error);
  }
};
