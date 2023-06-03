import express from "express";
import mongoose from "mongoose";
import blogRouter from "./routes/blog-routes.js";
import router from "./routes/user-routes.js";
import cors from "cors";

const app = express();
app.use(cors());

// middlewares

// "/api" will work on the urls of the api
// "/" will work on the default urls like //localhost, etc

// app will know the default data typs is JSON
app.use(express.json());
app.use("/api/user", router);
app.use("/api/blog", blogRouter);

mongoose.connect(
    'mongodb+srv://admin:uWzTYR6goA1mMz4D@cluster0.qdolqsq.mongodb.net/Blog?retryWrites=true&w=majority'
    )
    .then(() => app.listen(5000))
    .then(() => console.log("Connected to DB and Listening to Host"))
    .catch((err) => console.log("Error"));

// app.listen(5000)

// uWzTYR6goA1mMz4D = mongoDB Password