import bcrypt from "bcrypt";
import userModel from "../../models/userModel.js";

export default async function addUser(request, reply) {
  try {
    const { username, password } = request.query;

    const cek = await userModel.findOne({ username });
    if (cek) {
      return reply.code(400).send({ message: "already exist" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password || "12345", salt);

    const date = new Date();
    const offsetInMinutes = +420;
    const local = new Date(date.getTime() + offsetInMinutes * 60000);

    const newItem = new userModel({
      username,
      password: hashedPassword,
      createdAt: local,
    });
    await newItem.save();
    reply.code(201).send(newItem);
  } catch (error) {
    reply.code(500).send(error);
  }
}
