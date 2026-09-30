const express = require("express");
const cors = require("cors");
require("dotenv").config();

const session = require("express-session");
const passport = require("./config/passport");
const MongoStore = require("connect-mongo").default;

const { initDb } = require("./db/database");

const booksRoutes = require("./routes/booksRoutes");
const authorsRoutes = require("./routes/authorsRoutes");
const authRoutes = require("./routes/authRoutes");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger/swagger.json");

const app = express();

app.set("trust proxy", 1);

app.use(cors());
app.use(express.json());

console.log("Mongo session store created");

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,

        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_URI,
            collectionName: "sessions"
        }),

        cookie: {
            secure: false,
            httpOnly: true,
            sameSite: "lax"
        }
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
    res.send("CSE 341 Project 2 API is running.");
});

app.use("/auth", authRoutes);
app.use("/books", booksRoutes);
app.use("/authors", authorsRoutes);

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);

const PORT = process.env.PORT || 8080;

initDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});