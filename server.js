// server.js

import Fastify from "fastify";
import cors from "@fastify/cors";
import connectDB from "./config/db.js"; // Import koneksi Mongoose
import itemRoutes from "./routes/itemRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const fastify = Fastify({ logger: true });

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

// Menjalankan server
const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: "0.0.0.0" });
    fastify.log.info(`Server berjalan di http://localhost:3000`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
