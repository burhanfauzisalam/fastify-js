import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../../models/userModel.js";

export default async function loginUser(request, reply) {
  try {
    const { username, password } = request.query;
    const user = await userModel.findOne({ username });
    if (!user) {
      return reply.code(400).send({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return reply.code(400).send({ message: "Invalid password" });
    }

    const payload = {
      id: user._id,
      username,
      password,
    };
    const token = jwt.sign({ user }, "KEY", {
      expiresIn: "1h",
    });
    reply.code(200).send({ message: "Login successful", token });
  } catch (error) {
    reply.code(500).send(error);
  }
}
