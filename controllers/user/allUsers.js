import userModel from "../../models/userModel.js";

export default async function allUsers(request, reply) {
  try {
    const data = await userModel.find();
    reply.code(200).send({ data });
  } catch (error) {
    reply.code(500).send(error);
  }
}
