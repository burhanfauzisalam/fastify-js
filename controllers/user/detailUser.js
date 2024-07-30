export default async function detailUser(request, reply) {
  try {
    const user = request.user.user;
    reply.code(200).send(user);
  } catch (error) {
    reply.code(500).send(error);
  }
}
