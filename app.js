const express = require("express");
const app = express();
const path = require("node:path");

const gameRouter = require("./routes/gameRouter");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use("/", gameRouter);
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));
