import express from "express"
import userRoutes from "./routes/userRoutes.js"
import rateLimiter from "./middleware/ratelimiter.js";

const app = express()

app.use(express.json()); // to parse the request body

app.use(rateLimiter)
// Middleware to log the request method and url
// app.use((req, res, next) => {
//     console.log(`Request method is ${req.method} and the url is ${req.url}`);
//     next();
// });

app.use("/api/users", userRoutes);

app.listen(3000, () => {
    console.log("Server started on PORT: 3000");
});