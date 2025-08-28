import express from "express"
import userRoutes from "./routes/userRoutes.js"

const app = express()

app.use("/api/users", userRoutes);

app.listen(3000, () => {
    console.log("Server started on PORT: 3000");
});