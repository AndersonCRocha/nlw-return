import cors from "cors";
import express from "express";
import { router } from "./routes";

export const server = express();

server.use(express.json());
server.use(cors());
server.use(router);
