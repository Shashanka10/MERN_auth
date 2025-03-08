import express from "express";
import { connectDB } from "./database/db.js";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js"
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); //allows us to parse incoming requests: req.body
app.use(cookieParser()); // allows us to parse incoming cookies
app.use(cors({origin: "http://localhost:5173", credentials: true}));

app.use("/api/auth", authRoutes);

app.listen(PORT, ()=>{
    connectDB();
    console.log("Server is running on port: ", PORT)
})
