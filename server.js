// server.js

import Fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js"; // Import koneksi Mongoose
import itemRoutes from "./routes/itemRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const fastify = Fastify({ logger: true });
dotenv.config();
const PORT = process.env.PORT || 8080;
// Daftarkan plugin CORS
fastify.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
});

// Koneksi ke MongoDB
connectDB();

// Daftarkan routes
fastify.register(itemRoutes);
fastify.register(userRoutes);

fastify.get("/", async (request, reply) => {
  reply.code(200).send({ message: "Server running..." });
});
// Menjalankan server
const start = async () => {
  try {
    await fastify.listen({ port: PORT, host: "0.0.0.0" });
    fastify.log.info(`Server berjalan di port ${PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
