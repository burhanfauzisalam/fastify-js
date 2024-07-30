import bcrypt from "bcrypt";
import jwt, { decode } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import userModel from "../../models/userModel.js";

export default async function changePasswordUser(request, reply) {
  try {
    const { oldPassword, newPassword } = request.query;
    const { username } = request.user.user;

    const user = await userModel.findOne({ username });

    // // Verifikasi pengguna melalui token JWT
    // const token = request.headers["token"];

    // const decoded = jwt.verify(token, process.env.USER_KEY);

    // if (request.user.user.password !== user.password) {
    //   return reply.code(401).send({ message: "Unauthorized old token" });
    // }

    // Temukan pengguna di database
    if (!user) {
      return reply.code(400).send({ message: "User not found" });
    }

    // Verifikasi password lama
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return reply.code(400).send({ message: "Invalid old password" });
    }

    // Hash password baru
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Simpan password baru di database
    user.password = hashedPassword;
    await user.save();

    reply.code(200).send({ message: "Password changed successfully" });
  } catch (error) {
    reply.code(500).send(error);
  }
}
