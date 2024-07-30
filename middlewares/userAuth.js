import jwt, { decode } from "jsonwebtoken";
import dotenv from "dotenv";
import userModel from "../models/userModel.js";
dotenv.config();

export default async function userAuth(request, reply) {
  try {
    const token = request.headers["token"];
    if (!token) {
      return reply.code(401).send({ message: "No token provided" });
    }
    const decoded = jwt.verify(token, process.env.USER_KEY);
    const user = await userModel.findOne({
      username: decoded.user.username,
    });

    if (decoded.user.password !== user.password) {
      return reply.code(401).send({ message: "Unauthorized old token" });
    }
    request.user = decoded;
  } catch (error) {
    return reply.code(401).send({ message: "Unauthorized" });
  }
}
