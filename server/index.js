const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const cors = require("cors");
const movieRouter = require("./routes/movie-router");
const PORT = process.env.PORT || 5000;

const db = require("./db/db");

db.on("error", console.error.bind(console, "Mongodb Connection Error"));

// bodyParser.urlencoded() 를 써줘야 자동으로 req에 body가 등록된다.
// extended 는 중첩된 객체표현을 허용할지 말지를 정하는 것이다. -> true 시 qs 모듈 사용, false 시 query-string 모듈 사용.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("hello, world!");
});

app.use("/api", movieRouter);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
