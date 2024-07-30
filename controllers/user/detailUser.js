import userModel from "../../models/userModel.js";

export default async function detailUser(request, reply) {
  try {
    const { username } = request.query;
    const user = await userModel.findOne({ username });
    if (!user) {
      return reply.code(400).send({ message: "user not found" });
    }
    reply.code(200).send(user);
  } catch (error) {
    reply.code(500).send(error);
  }
}
