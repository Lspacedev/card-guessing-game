const express = require("express");
const app = express();
const path = require("node:path");
app.use(express.json());
const gameRouter = require("./routes/gameRouter");
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use("/", gameRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));
