const express = require("express");
const app = express();

const cors = require("cors");
const { log } = require("console");
app.use(cors({ optionsSuccessStatus: 200 }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.use(express.static("public"));

app.get("/api/hello", (req, res) => {
  res.json({ greetings: "hello API" });
});

app.get("/api/:date?", (req, res) => {
  if (req.params.date) {
    const numberRegex = new RegExp("^[0-9]+$");

    if (numberRegex.test(req.params.date)) {
      const unixDate = req.params.date;
      const sliceDate = unixDate.slice(0, -3);
      const date = new Date(sliceDate * 1000);

      res.json({ unix: parseInt(unixDate), utc: date.toUTCString() });
    } else {
      const date = new Date(req.params.date);
      const utcDate = date.toUTCString();
      if (utcDate == "Invalid Date") {
        res.json({ error: "Invalid Date" });
      }
      res.json({ unix: date.getTime(), utc: utcDate });
    }
  } else {
    const date = new Date();
    res.json({ unix: date.getTime(), utc: date.toUTCString() });
  }
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port" + listener.address().port);
});
