import express from "express";
const app = express();

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import blogRoutes from "./routes/blogPosts.js";
import commentRoutes from "./routes/comments.js";
import likeRoutes from "./routes/likes.js";
import relationshipRoutes from "./routes/relationships.js";

import cors from "cors";
import cookieParser from "cookie-parser";

//middlewares
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    next();
});
app.use(express.json());
app.use(
    cors({
        //origin: "http://localhost:3000", //เปลี่ยนไปตาม Port ที่สตาร์ทได้
        origin: "http://tongsiripath.mypressonline.com",
    })
);
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/relationships", relationshipRoutes);

app.listen(8900, () => {
    console.log("API working 8900!");
});