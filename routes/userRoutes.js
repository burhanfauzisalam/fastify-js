import addUser from "../controllers/user/addUser.js";
import allUsers from "../controllers/user/allUsers.js";
import changePasswordUser from "../controllers/user/changePasswordUser.js";
import detailUser from "../controllers/user/detailUser.js";
import loginUser from "../controllers/user/loginUser.js";

async function userRoutes(fastify, options) {
  fastify.post("/user", addUser);
  fastify.post("/user-login", loginUser);
  fastify.post("/user-change-password", changePasswordUser);
  fastify.get("/users", allUsers);
  fastify.get("/user", detailUser);
}

export default userRoutes;
